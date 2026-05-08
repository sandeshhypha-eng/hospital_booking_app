package main

import (
	"context"
	"log"
	"os"
	"sync"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"
)

var (
	clients   = make(map[*websocket.Conn]bool)
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
		// When a client connects
		clientsMu.Lock()
		clients[c] = true
		clientsMu.Unlock()

		defer func() {
			clientsMu.Lock()
			delete(clients, c)
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

	log.Fatal(app.Listen(":4010"))
}

func listenRedis() {
	pubsub := rdb.Subscribe(ctx, "queue_updates")
	defer pubsub.Close()

	ch := pubsub.Channel()

	for msg := range ch {
		broadcastMessage(msg.Payload)
	}
}

func broadcastMessage(message string) {
	clientsMu.Lock()
	defer clientsMu.Unlock()

	for client := range clients {
		err := client.WriteMessage(websocket.TextMessage, []byte(message))
		if err != nil {
			log.Printf("broadcast error: %v", err)
			client.Close()
			delete(clients, client)
		}
	}
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
