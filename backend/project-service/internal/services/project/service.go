package project

import (
	"game-platform/project-service/internal/repositories"
)

// Service defines the interface for project business logic.
type Service interface {
	// Define methods for business logic
}

type service struct {
	projectRepo repositories.ProjectRepository
}

// NewService creates a new project service.
func NewService(projectRepo repositories.ProjectRepository) Service {
	return &service{projectRepo: projectRepo}
}
