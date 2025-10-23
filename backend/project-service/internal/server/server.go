package server

import (
	"log"

	"game-platform/project-service/internal/db"
	"game-platform/project-service/internal/repositories"
	"game-platform/project-service/internal/server/handlers"
	"game-platform/project-service/internal/server/routes"
	"game-platform/project-service/internal/services/project"
	"github.com/labstack/echo/v4"
)

// Server holds the Echo instance.
type Server struct {
	echo *echo.Echo
}

// New creates and configures a new server instance.
func New() *Server {
	e := echo.New()

	// Initialize dependencies
	dbConn, err := db.Connect()
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	// Auto-migrate models
	// if err := dbConn.AutoMigrate(&models.Project{}); err != nil {
	// 	log.Fatalf("failed to migrate database: %v", err)
	// }

	projectRepo := repositories.NewProjectRepository(dbConn)
	projectSvc := project.NewService(projectRepo)
	projectHandler := handlers.NewProjectHandler(projectSvc)

	// Setup routes
	routes.SetupRoutes(e, projectHandler)

	return &Server{echo: e}
}

// Start runs the HTTP server.
func (s *Server) Start() error {
	log.Println("Server starting on port 8081")
	return s.echo.Start(":8081")
}
