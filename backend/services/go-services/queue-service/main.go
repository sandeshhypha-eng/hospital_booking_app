package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"
	"github.com/streadway/amqp"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	db    *gorm.DB
	rdb   *redis.Client
	rmqCh *amqp.Channel
	ctx   = context.Background()
)

type Token struct {
	ID        string    `gorm:"primaryKey" json:"id"`
	BranchID  string    `json:"branch_id"`
	ServiceID string    `json:"service_id"`
	Status    string    `json:"status"` // WAITING, CALLED, COMPLETED
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func main() {
	// Initialize DB
	dsn := getEnv("DATABASE_URL", "host=localhost user=admin password=password dbname=booking_platform port=5432 sslmode=disable")
	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	db.AutoMigrate(&Token{})

	// Initialize Redis
	rdb = redis.NewClient(&redis.Options{
		Addr: getEnv("REDIS_URL", "localhost:6379"),
	})

	// Initialize RabbitMQ
	rmqConn, err := amqp.Dial(getEnv("RABBITMQ_URL", "amqp://guest:guest@localhost:5672/"))
	if err == nil {
		rmqCh, _ = rmqConn.Channel()
	}

	app := fiber.New()

	// API Routes
	app.Post("/queue/generate-token", generateToken)
	app.Get("/queue/current/:branch_id", getCurrentToken)
	app.Post("/queue/next", callNextToken)
	app.Post("/queue/complete-token", completeToken)
	app.Get("/queue/status/:token_id", getTokenStatus)

	log.Fatal(app.Listen(":" + getEnv("PORT", "4003")))
}

func generateToken(c *fiber.Ctx) error {
	type Request struct {
		BranchID  string `json:"branch_id"`
		ServiceID string `json:"service_id"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	if strings.TrimSpace(req.BranchID) == "" || strings.TrimSpace(req.ServiceID) == "" {
		return c.Status(400).JSON(fiber.Map{"error": "branch_id and service_id are required"})
	}

	// Increment Redis counter for the branch/service
	key := fmt.Sprintf("counter:%s:%s", req.BranchID, req.ServiceID)
	num, err := rdb.Incr(ctx, key).Result()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to increment queue counter"})
	}

	tokenID := fmt.Sprintf("%s-%s-%04d", req.BranchID, req.ServiceID, num)
	token := Token{
		ID:        tokenID,
		BranchID:  req.BranchID,
		ServiceID: req.ServiceID,
		Status:    "WAITING",
	}

	// Persist to DB
	if err := db.Create(&token).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to create token"})
	}

	// Add to Redis Queue
	queueKey := fmt.Sprintf("queue:%s", req.BranchID)
	if err := rdb.RPush(ctx, queueKey, tokenID).Err(); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to enqueue token"})
	}

	// Publish to Redis for WebSocket Hub
	broadcastUpdate(req.BranchID, "TokenGenerated", token)

	return c.Status(201).JSON(token)
}

func getCurrentToken(c *fiber.Ctx) error {
	branchID := c.Params("branch_id")
	if strings.TrimSpace(branchID) == "" {
		return c.Status(400).JSON(fiber.Map{"error": "branch_id is required"})
	}
	var token Token
	if err := db.Where("branch_id = ? AND status = ?", branchID, "CALLED").Order("updated_at desc").First(&token).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "current token not found"})
	}
	return c.JSON(token)
}

func callNextToken(c *fiber.Ctx) error {
	type Request struct {
		BranchID string `json:"branch_id"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	if strings.TrimSpace(req.BranchID) == "" {
		return c.Status(400).JSON(fiber.Map{"error": "branch_id is required"})
	}

	queueKey := fmt.Sprintf("queue:%s", req.BranchID)
	tokenID, err := rdb.LPop(ctx, queueKey).Result()
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Queue empty"})
	}

	var token Token
	if err := db.First(&token, "id = ?", tokenID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "token not found"})
	}
	token.Status = "CALLED"
	if err := db.Save(&token).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to update token"})
	}

	broadcastUpdate(req.BranchID, "TokenCalled", token)
	publishRabbitMQ("token_called", token)

	return c.JSON(token)
}

func completeToken(c *fiber.Ctx) error {
	type Request struct {
		TokenID string `json:"token_id"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	if strings.TrimSpace(req.TokenID) == "" {
		return c.Status(400).JSON(fiber.Map{"error": "token_id is required"})
	}

	var token Token
	if err := db.First(&token, "id = ?", req.TokenID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "token not found"})
	}
	token.Status = "COMPLETED"
	if err := db.Save(&token).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to update token"})
	}

	broadcastUpdate(token.BranchID, "TokenCompleted", token)
	return c.JSON(token)
}

func getTokenStatus(c *fiber.Ctx) error {
	tokenID := c.Params("token_id")
	if strings.TrimSpace(tokenID) == "" {
		return c.Status(400).JSON(fiber.Map{"error": "token_id is required"})
	}
	var token Token
	if err := db.First(&token, "id = ?", tokenID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "token not found"})
	}
	return c.JSON(token)
}

func broadcastUpdate(branchID, event string, data interface{}) {
	payload, _ := json.Marshal(map[string]interface{}{
		"branch_id": branchID,
		"event":     event,
		"data":      data,
	})
	rdb.Publish(ctx, "queue_updates", payload)
}

func publishRabbitMQ(event string, data interface{}) {
	if rmqCh == nil {
		return
	}
	body, _ := json.Marshal(data)
	rmqCh.Publish(
		"",                // exchange
		"queue_events",    // routing key
		false,             // mandatory
		false,             // immediate
		amqp.Publishing{
			ContentType: "application/json",
			Body:        body,
		})
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
