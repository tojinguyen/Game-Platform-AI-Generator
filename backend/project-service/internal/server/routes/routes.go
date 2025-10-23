package routes

import (
	"game-platform/project-service/internal/server/handlers"
	"github.com/labstack/echo/v4"
)

// SetupRoutes configures all the routes for the application.
func SetupRoutes(e *echo.Echo, projectHandler *handlers.ProjectHandler) {
	projectHandler.RegisterRoutes(e)
}
