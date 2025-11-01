package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Providers string

const GOOGLE Providers = "google"

type OAuthProviders struct {
	gorm.Model
	ID       uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID   uuid.UUID `json:"user_id"`
	Token    string    `json:"token"`
	Provider Providers `json:"provider"`
}
