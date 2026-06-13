package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
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

	log.Fatal(app.Listen(":4003"))
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

	// Increment Redis counter for the branch/service
	key := fmt.Sprintf("counter:%s:%s", req.BranchID, req.ServiceID)
	num, _ := rdb.Incr(ctx, key).Result()

	tokenID := fmt.Sprintf("%s-%s-%04d", req.BranchID, req.ServiceID, num)
	token := Token{
		ID:        tokenID,
		BranchID:  req.BranchID,
		ServiceID: req.ServiceID,
		Status:    "WAITING",
	}

	// Persist to DB
	db.Create(&token)

	// Add to Redis Queue
	queueKey := fmt.Sprintf("queue:%s", req.BranchID)
	rdb.RPush(ctx, queueKey, tokenID)

	// Publish to Redis for WebSocket Hub
	broadcastUpdate(req.BranchID, "TokenGenerated", token)

	return c.Status(201).JSON(token)
}

func getCurrentToken(c *fiber.Ctx) error {
	branchID := c.Params("branch_id")
	var token Token
	db.Where("branch_id = ? AND status = ?", branchID, "CALLED").Order("updated_at desc").First(&token)
	return c.JSON(token)
}

func callNextToken(c *fiber.Ctx) error {
	type Request struct {
		BranchID string `json:"branch_id"`
	}
	var req Request
	c.BodyParser(&req)

	queueKey := fmt.Sprintf("queue:%s", req.BranchID)
	tokenID, err := rdb.LPop(ctx, queueKey).Result()
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Queue empty"})
	}

	var token Token
	db.First(&token, "id = ?", tokenID)
	token.Status = "CALLED"
	db.Save(&token)

	broadcastUpdate(req.BranchID, "TokenCalled", token)
	publishRabbitMQ("token_called", token)

	return c.JSON(token)
}

func completeToken(c *fiber.Ctx) error {
	type Request struct {
		TokenID string `json:"token_id"`
	}
	var req Request
	c.BodyParser(&req)

	var token Token
	db.First(&token, "id = ?", req.TokenID)
	token.Status = "COMPLETED"
	db.Save(&token)

	broadcastUpdate(token.BranchID, "TokenCompleted", token)
	return c.JSON(token)
}

func getTokenStatus(c *fiber.Ctx) error {
	tokenID := c.Params("token_id")
	var token Token
	db.First(&token, "id = ?", tokenID)
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
