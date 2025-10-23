package models

import "time"

// Project represents the project model.
type Project struct {
	ID          uint      `gorm:"primaryKey"`
	Name        string    `gorm:"size:255;not null"`
	Description string
	UserID      uint      // Foreign key to the user who owns the project
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
