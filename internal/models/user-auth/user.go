package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Gender string

const (
	Male   Gender = "male"
	Female Gender = "female"
	Other  Gender = "other"
)

type Role string

type LoginProvider string

const (
	Local          LoginProvider = "local"
	GoogleProvider LoginProvider = "google"
)

type User struct {
	gorm.Model
	ID uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`

	// Identity
	Email        string `gorm:"uniqueIndex;not null"`
	Username     string `gorm:"uniqueIndex;not null"`
	PasswordHash string `gorm:"not null"`
	Phone        string `gorm:"type:varchar(20)"`

	// Profile
	FullName    string `gorm:"type:varchar(255)"`
	AvatarURL   string `gorm:"type:text"`
	DateOfBirth *time.Time
	Gender      Gender `gorm:"type:varchar(20)"`
	Address     string `gorm:"type:text"`

	LoginProvider LoginProvider `gorm:"type:varchar(50);default:'local'"`
	LastLoginAt   *time.Time
}
