package requests

import (
	"time"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
)

const (
	minPathLength = 8
)

type BasicAuth struct {
	Email    string `json:"email" validate:"required" example:"john.doe@example.com"`
	Password string `json:"password" validate:"required" example:"11111111"`
}

func (ba BasicAuth) Validate() error {
	return validation.ValidateStruct(&ba,
		validation.Field(&ba.Email, is.Email),
		validation.Field(&ba.Password, validation.Length(minPathLength, 0)),
	)
}

type LoginRequest struct {
	BasicAuth
}

type RegisterRequest struct {
	BasicAuth
	Username    string     `json:"username" validate:"required" example:"johndoe"`
	FullName    string     `json:"fullName" validate:"required" example:"John Doe"`
	Phone       string     `json:"phone" example:"+1234567890"`
	DateOfBirth *time.Time `json:"dateOfBirth" example:"1990-01-01T00:00:00Z"`
	Gender      string     `json:"gender" example:"male"`
	Address     string     `json:"address" example:"123 Main St, City, Country"`
}

func (rr RegisterRequest) Validate() error {
	err := rr.BasicAuth.Validate()
	if err != nil {
		return err
	}

	return validation.ValidateStruct(&rr,
		validation.Field(&rr.Username, validation.Required, validation.Length(3, 50)),
		validation.Field(&rr.FullName, validation.Required),
		validation.Field(&rr.Phone, validation.When(rr.Phone != "", validation.Length(8, 20))),
		validation.Field(&rr.Gender, validation.In("male", "female", "other", "")),
	)
}

type OAuthRequest struct {
	Token string `json:"token" validate:"required"`
}

func (oar OAuthRequest) Validate() error {
	return validation.ValidateStruct(&oar,
		validation.Field(&oar.Token, validation.Required),
	)
}

type RefreshRequest struct {
	Token string `json:"token" validate:"required" example:"refresh_token"`
}

type UpdateProfileRequest struct {
	Username    *string    `json:"username" example:"johndoe"`
	FullName    *string    `json:"fullName" example:"John Doe"`
	Phone       *string    `json:"phone" example:"+1234567890"`
	DateOfBirth *time.Time `json:"dateOfBirth" example:"1990-01-01T00:00:00Z"`
	Gender      *string    `json:"gender" example:"male"`
	Address     *string    `json:"address" example:"123 Main St, City, Country"`
	AvatarURL   *string    `json:"avatarUrl" example:"https://example.com/avatar.jpg"`
}

func (upr UpdateProfileRequest) Validate() error {
	return validation.ValidateStruct(&upr,
		validation.Field(&upr.Username, validation.When(upr.Username != nil, validation.Length(3, 50))),
		validation.Field(&upr.Phone, validation.When(upr.Phone != nil, validation.Length(8, 20))),
		validation.Field(&upr.Gender, validation.When(upr.Gender != nil, validation.In("male", "female", "other"))),
	)
}
