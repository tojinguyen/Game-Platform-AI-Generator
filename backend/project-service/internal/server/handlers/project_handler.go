package handlers

import (
	"game-platform/project-service/internal/services/project"
	"github.com/labstack/echo/v4"
)

// ProjectHandler holds the dependencies for the project handlers.
type ProjectHandler struct {
	projectSvc project.Service
}

// NewProjectHandler creates a new ProjectHandler.
func NewProjectHandler(projectSvc project.Service) *ProjectHandler {
	return &ProjectHandler{projectSvc: projectSvc}
}

// RegisterRoutes registers the project routes with the Echo server.
func (h *ProjectHandler) RegisterRoutes(e *echo.Echo) {
	e.POST("/projects", h.CreateProject)
}

// CreateProject is the handler for creating a new project.
func (h *ProjectHandler) CreateProject(c echo.Context) error {
	// Implementation for creating a project
	return c.JSON(200, "ok")
}
