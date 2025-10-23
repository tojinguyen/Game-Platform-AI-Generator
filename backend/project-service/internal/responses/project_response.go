package responses

// ProjectResponse defines the structure for a project response.
type ProjectResponse struct {
	ID          uint   `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}
