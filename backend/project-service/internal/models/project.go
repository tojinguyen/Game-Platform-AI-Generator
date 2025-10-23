package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/datatypes"
)

type Project struct {
	ID             uuid.UUID      `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID         uuid.UUID      `gorm:"type:uuid;not null"`
	Name           string         `gorm:"type:varchar(255);not null"`
	Slug           string         `gorm:"type:varchar(255);uniqueIndex"`
	Description    string         `gorm:"type:text"`
	Genre          pq.StringArray `gorm:"type:text[]"`
	Platforms      pq.StringArray `gorm:"type:text[]"`
	Status         string         `gorm:"type:varchar(20);default:'draft'"`
	ThumbnailURL   *string
	Tags           pq.StringArray `gorm:"type:text[]"`
	GDDID          *uuid.UUID
	Version        int `gorm:"default:1"`
	LastAIUpdateAt *time.Time
	Metadata       datatypes.JSON `gorm:"type:jsonb"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
}