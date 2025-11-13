package responses

import "time"

type UserProfileResponse struct {
	ID          string     `json:"id"`
	Email       string     `json:"email"`
	Username    string     `json:"username"`
	FullName    string     `json:"fullName"`
	Phone       string     `json:"phone,omitempty"`
	DateOfBirth *time.Time `json:"dateOfBirth,omitempty"`
	Gender      string     `json:"gender,omitempty"`
	Address     string     `json:"address,omitempty"`
	AvatarURL   string     `json:"avatarUrl,omitempty"`
}
