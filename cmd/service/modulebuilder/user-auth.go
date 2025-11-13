package modulebuilder

import (
	"context"
	"time"

	"github.com/coreos/go-oidc/v3/oidc"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/config"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/pkg/token"
	repositories "github.com/game-platform-ai/golang-echo-boilerplate/internal/repositories/user-auth"
	handlers "github.com/game-platform-ai/golang-echo-boilerplate/internal/server/handlers/user-auth"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/services/user-auth/auth"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/services/user-auth/oauth"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/services/user-auth/user"
	"gorm.io/gorm"
)

// userAuthHandlers chứa các handler được tạo ra bởi module này.
type userAuthHandlers struct {
	AuthHandler     *handlers.AuthHandler
	OAuthHandler    *handlers.OAuthHandler
	RegisterHandler *handlers.RegisterHandler
	ProfileHandler  *handlers.ProfileHandler
}

// BuildUserAuthModule xây dựng module user-auth bao gồm repository, service và handler.
func BuildUserAuthModule(cfg config.Config, db *gorm.DB) (userAuthHandlers, error) {
	// 1. Init Repo
	userRepository := repositories.NewUserRepository(db)

	// 2. Init Services
	userService := user.NewService(userRepository)
	tokenService := token.NewService(
		time.Now,
		cfg.Auth.AccessTokenDuration,
		cfg.Auth.RefreshTokenDuration,
		[]byte(cfg.Auth.AccessSecret),
		[]byte(cfg.Auth.RefreshSecret),
	)

	authService := auth.NewService(userService, tokenService)

	// OIDC Provider for OAuth Service
	provider, err := oidc.NewProvider(context.Background(), "https://accounts.google.com")
	if err != nil {
		return userAuthHandlers{}, err
	}
	verifier := provider.Verifier(&oidc.Config{ClientID: cfg.OAuth.ClientID})
	oAuthService := oauth.NewService(verifier, tokenService, userService)

	// 4. Init Handlers
	authHandler := handlers.NewAuthHandler(authService)
	oAuthHandler := handlers.NewOAuthHandler(oAuthService)
	registerHandler := handlers.NewRegisterHandler(userService)
	profileHandler := handlers.NewProfileHandler(userService)

	return userAuthHandlers{
		AuthHandler:     authHandler,
		OAuthHandler:    oAuthHandler,
		RegisterHandler: registerHandler,
		ProfileHandler:  profileHandler,
	}, nil
}
