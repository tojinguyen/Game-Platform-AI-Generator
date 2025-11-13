// Package oauth provides user authentication services using OAuth 2.0.
package oauth

import (
	"context"
	"errors"
	"fmt"

	"github.com/coreos/go-oidc/v3/oidc"
	models "github.com/game-platform-ai/golang-echo-boilerplate/internal/models/user-auth"
)

type Service struct {
	idTokenVerifier *oidc.IDTokenVerifier
	tokenService    tokenService
	userService     userService
}

type userService interface {
	CreateUserAndOAuthProvider(ctx context.Context, user *models.User, oAuthProvider *models.OAuthProviders) error
	GetUserByEmail(ctx context.Context, email string) (models.User, error)
}

type tokenService interface {
	CreateAccessToken(ctx context.Context, user *models.User) (string, int64, error)
	CreateRefreshToken(ctx context.Context, user *models.User) (string, error)
}

func NewService(idTokenVerifier *oidc.IDTokenVerifier, tokenService tokenService, userService userService) *Service {
	return &Service{idTokenVerifier: idTokenVerifier, tokenService: tokenService, userService: userService}
}

func (s Service) GoogleOAuth(ctx context.Context, token string) (accessToken, refreshToken string, exp int64, err error) {
	payload, err := s.idTokenVerifier.Verify(ctx, token)
	if err != nil {
		return "", "", 0, fmt.Errorf("verify google token: %w", err)
	}

	var claims struct {
		Email string `json:"email"`
		Name  string `json:"name"`
	}

	err = payload.Claims(&claims)
	if err != nil {
		return "", "", 0, fmt.Errorf("extract claims: %w", err)
	}

	if claims.Email == "" {
		return "", "", 0, fmt.Errorf("email is empty")
	}

	user, err := s.userService.GetUserByEmail(ctx, claims.Email)
	if err != nil {
		if !errors.Is(err, models.ErrUserNotFound) {
			return "", "", 0, fmt.Errorf("get user: %w", err)
		}

		// Generate username from email (part before @)
		username := claims.Email
		if atIndex := len(claims.Email); atIndex > 0 {
			for i, c := range claims.Email {
				if c == '@' {
					username = claims.Email[:i]
					break
				}
			}
		}

		user = models.User{
			Email:         claims.Email,
			Username:      username,
			FullName:      claims.Name,
			LoginProvider: models.GoogleProvider,
		}

		oAuthProvider := models.OAuthProviders{
			UserID:   user.ID,
			Provider: models.GOOGLE,
			Token:    token,
		}

		err = s.userService.CreateUserAndOAuthProvider(ctx, &user, &oAuthProvider)
		if err != nil {
			return "", "", 0, fmt.Errorf("create user and oauth provider: %w", err)
		}
	}

	accessToken, exp, err = s.tokenService.CreateAccessToken(ctx, &user)
	if err != nil {
		return "", "", 0, fmt.Errorf("create access token: %w", err)
	}

	refreshToken, err = s.tokenService.CreateRefreshToken(ctx, &user)
	if err != nil {
		return "", "", 0, fmt.Errorf("create refresh token: %w", err)
	}

	return accessToken, refreshToken, exp, nil
}
