package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`

	// Identity
	Email        string `gorm:"uniqueIndex;not null"`
	Username     string `gorm:"uniqueIndex;not null"`
	PasswordHash string `gorm:"not null"`
	Phone        string `gorm:"type:varchar(20)"`
	IsVerified   bool   `gorm:"default:false"`
	Status       string `gorm:"type:varchar(20);default:'ACTIVE'"` // ACTIVE, BANNED, PENDING, DELETED

	// Profile
	FullName    string `gorm:"type:varchar(255)"`
	AvatarURL   string `gorm:"type:text"`
	Bio         string `gorm:"type:text"`
	DateOfBirth *time.Time
	Gender      string `gorm:"type:varchar(20)"`
	Address     string `gorm:"type:text"`

	// Auth & Role
	Role                string `gorm:"type:varchar(50);default:'USER'"`  // ADMIN, USER, MODERATOR, etc.
	LoginProvider       string `gorm:"type:varchar(50);default:'local'"` // local, google, github, etc.
	LastLoginAt         *time.Time
	RefreshTokenVersion int `gorm:"default:1"`
}
