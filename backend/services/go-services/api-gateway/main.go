package main

import (
	"log"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/proxy"
	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte(getEnv("JWT_SECRET", "secret"))

func main() {
	app := fiber.New(fiber.Config{
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	})

	// Middleware
	app.Use(logger.New())
	app.Use(cors.New())
	app.Use(limiter.New(limiter.Config{
		Max:        100,
		Expiration: 1 * time.Minute,
	}))

	// Health Check
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	// Service Proxy Mapping
	services := map[string]string{
		"/auth":          "http://localhost:4001",
		"/bookings":      "http://localhost:4002",
		"/queue":         "http://localhost:4003",
		"/files":         "http://localhost:4004",
		"/notifications": "http://localhost:4005",
		"/payments":      "http://localhost:4006",
		"/users":         "http://localhost:4007",
		"/business":      "http://localhost:4008",
		"/ws":            "http://localhost:4010",
	}

	// Proxy Routes
	for path, target := range services {
		pathCopy := path
		targetCopy := target
		app.All(path+"/*", func(c *fiber.Ctx) error {
			if isProtectedRoute(pathCopy, c.Path()) {
				if err := validateJWT(c); err != nil {
					return err
				}
			}
			return proxy.Do(c, targetCopy+c.Path())
		})
	}

	// Handle WebSocket Upgrades specifically if needed,
	// though Fiber proxy handles basic proxying, dedicated WS Hub is better.

	// Graceful Shutdown
	go func() {
		if err := app.Listen(":" + getEnv("PORT", "3000")); err != nil {
			log.Panic(err)
		}
	}()

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	<-c

	log.Println("Gracefully shutting down...")
	_ = app.Shutdown()
}

func authMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		if err := validateJWT(c); err != nil {
			return err
		}

		return c.Next()
	}
}

func validateJWT(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")
	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing token"})
	}

	tokenString := strings.Replace(authHeader, "Bearer ", "", 1)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
	}

	return nil
}

func isProtectedRoute(prefix string, path string) bool {
	if prefix == "/auth" {
		return !(path == "/auth/login" || path == "/auth/signup" || path == "/auth/refresh")
	}
	return prefix != "/ws"
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
