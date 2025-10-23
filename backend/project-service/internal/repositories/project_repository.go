package repositories

import (
	"gorm.io/gorm"
)

// ProjectRepository defines the interface for project data operations.
type ProjectRepository interface {
	// Define methods like Create, GetByID, etc.
}

type projectRepository struct {
	db *gorm.DB
}

// NewProjectRepository creates a new project repository.
func NewProjectRepository(db *gorm.DB) ProjectRepository {
	return &projectRepository{db: db}
}
