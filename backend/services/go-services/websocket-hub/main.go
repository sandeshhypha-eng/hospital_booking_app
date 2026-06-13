package main

import (
	"context"
	"encoding/json"
	"log"
	"os"
	"sync"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"
)

var (
	clients   = make(map[string]map[*websocket.Conn]bool)
	clientsMu sync.Mutex
	rdb       *redis.Client
	ctx       = context.Background()
)

func main() {
	app := fiber.New()

	// Initialize Redis
	rdb = redis.NewClient(&redis.Options{
		Addr: getEnv("REDIS_URL", "localhost:6379"),
	})

	// WebSocket endpoint
	app.Get("/ws/:branch_id", websocket.New(func(c *websocket.Conn) {
		branchID := c.Params("branch_id")
		if branchID == "" {
			c.Close()
			return
		}

		// When a client connects
		clientsMu.Lock()
		if clients[branchID] == nil {
			clients[branchID] = make(map[*websocket.Conn]bool)
		}
		clients[branchID][c] = true
		clientsMu.Unlock()

		defer func() {
			clientsMu.Lock()
			delete(clients[branchID], c)
			if len(clients[branchID]) == 0 {
				delete(clients, branchID)
			}
			clientsMu.Unlock()
			c.Close()
		}()

		// Keep connection alive/read messages if needed
		for {
			mt, msg, err := c.ReadMessage()
			if err != nil {
				break
			}
			log.Printf("recv: %s", msg)
			if err = c.WriteMessage(mt, msg); err != nil {
				break
			}
		}
	}))

	// Listen to Redis Pub/Sub in background
	go listenRedis()

	log.Fatal(app.Listen(":" + getEnv("PORT", "4010")))
}

func listenRedis() {
	pubsub := rdb.Subscribe(ctx, "queue_updates")
	defer pubsub.Close()

	ch := pubsub.Channel()

	for msg := range ch {
		branchID := branchIDFromPayload(msg.Payload)
		if branchID == "" {
			log.Printf("queue update missing branch_id: %s", msg.Payload)
			continue
		}
		broadcastMessage(branchID, msg.Payload)
	}
}

func branchIDFromPayload(message string) string {
	var payload struct {
		BranchID string `json:"branch_id"`
	}
	if err := json.Unmarshal([]byte(message), &payload); err != nil {
		return ""
	}
	return payload.BranchID
}

func broadcastMessage(branchID string, message string) {
	clientsMu.Lock()
	defer clientsMu.Unlock()

	for client := range clients[branchID] {
		err := client.WriteMessage(websocket.TextMessage, []byte(message))
		if err != nil {
			log.Printf("broadcast error: %v", err)
			client.Close()
			delete(clients[branchID], client)
		}
	}
	if len(clients[branchID]) == 0 {
		delete(clients, branchID)
	}
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
