package main

import (
	"game-platform/project-service/internal/server"
	"log"
)

func main() {
	app := server.New()
	if err := app.Start(); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
