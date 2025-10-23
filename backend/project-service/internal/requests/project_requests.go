package requests

// CreateProjectRequest defines the structure for a project creation request.
type CreateProjectRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description"`
}
