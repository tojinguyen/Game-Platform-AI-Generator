package main

import (
	"context"
	"fmt"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
	"time"

	_ "github.com/game-platform-ai/golang-echo-boilerplate/docs"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/config"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/db"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/pkg/token"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/repositories"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/server"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/server/handlers"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/server/routes"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/services/user-auth/auth"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/services/user-auth/oauth"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/services/user-auth/user"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/slogx"

	"github.com/caarlos0/env/v11"
	"github.com/coreos/go-oidc/v3/oidc"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

const shutdownTimeout = 20 * time.Second

//	@title			User Auth API
//	@version		1.0
//	@description	API for user authentication and management.

//	@contact.name	Game Platform AI
//	@contact.url	https://github.com/tojinguyen/Game-Platform-AI-Generator
//	@contact.email	support@gameplatform.ai

//	@securityDefinitions.apikey	ApiKeyAuth
//	@in							header
//	@name						Authorization

// @BasePath	/api/external/v1
func main() {
	if err := run(); err != nil {
		slog.Error("Service run error", "err", err.Error())
		os.Exit(1)
	}
}

func run() error {
	if err := godotenv.Load(); err != nil {
		return fmt.Errorf("load env file: %w", err)
	}

	var cfg config.Config
	if err := env.Parse(&cfg); err != nil {
		return fmt.Errorf("parse env: %w", err)
	}

	if err := slogx.Init(cfg.Logger); err != nil {
		return fmt.Errorf("init logger: %w", err)
	}

	traceStarter := slogx.NewTraceStarter(uuid.NewV7)

	gormDB, err := db.NewGormDB(cfg.DB)
	if err != nil {
		return fmt.Errorf("new db connection: %w", err)
	}

	userRepository := repositories.NewUserRepository(gormDB)
	userService := user.NewService(userRepository)

	provider, err := oidc.NewProvider(context.Background(), "https://accounts.google.com")
	if err != nil {
		return fmt.Errorf("oidc.NewProvider: %w", err)
	}

	verifier := provider.Verifier(&oidc.Config{ClientID: cfg.OAuth.ClientID})

	tokenService := token.NewService(
		time.Now,
		cfg.Auth.AccessTokenDuration,
		cfg.Auth.RefreshTokenDuration,
		[]byte(cfg.Auth.AccessSecret),
		[]byte(cfg.Auth.RefreshSecret),
	)

	authService := auth.NewService(userService, tokenService)
	oAuthService := oauth.NewService(verifier, tokenService, userService)

	authHandler := handlers.NewAuthHandler(authService)
	oAuthHandler := handlers.NewOAuthHandler(oAuthService)
	registerHandler := handlers.NewRegisterHandler(userService)

	// Configure middleware with the custom claims type
	echoJWTConfig := echojwt.Config{
		NewClaimsFunc: func(echo.Context) jwt.Claims {
			return new(token.JwtCustomClaims)
		},
		SigningKey: []byte(cfg.Auth.AccessSecret),
	}

	echoJWTMiddleware := echojwt.WithConfig(echoJWTConfig)

	engine := echo.New()
	err = routes.ConfigureRoutes(traceStarter, engine, routes.Handlers{
		AuthHandler:       authHandler,
		OAuthHandler:      oAuthHandler,
		RegisterHandler:   registerHandler,
		EchoJWTMiddleware: echoJWTMiddleware,
	})
	if err != nil {
		return fmt.Errorf("configure routes: %w", err)
	}

	app := server.NewServer(engine)
	go func() {
		if err = app.Start(cfg.HTTP.Port); err != nil {
			slog.Error("Server error", "err", err.Error())
		}
	}()

	shutdownChannel := make(chan os.Signal, 1)
	signal.Notify(shutdownChannel, os.Interrupt, syscall.SIGHUP, syscall.SIGTERM)
	<-shutdownChannel

	shutdownCtx, cancel := context.WithTimeout(context.Background(), shutdownTimeout)
	defer cancel()

	if err := app.Shutdown(shutdownCtx); err != nil {
		return fmt.Errorf("http server shutdown: %w", err)
	}

	dbConnection, err := gormDB.DB()
	if err != nil {
		return fmt.Errorf("get db connection: %w", err)
	}

	if err := dbConnection.Close(); err != nil {
		return fmt.Errorf("close db connection: %w", err)
	}

	return nil
}
