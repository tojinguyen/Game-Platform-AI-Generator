package main

import (
	"context"
	"fmt"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/game-platform-ai/golang-echo-boilerplate/cmd/service/modulebuilder"
	_ "github.com/game-platform-ai/golang-echo-boilerplate/docs"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/config"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/infra/db"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/pkg/token"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/server"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/server/routes"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/slogx"

	"github.com/caarlos0/env/v11"
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
	// Load env file
	if err := godotenv.Load(); err != nil {
		return fmt.Errorf("load env file: %w", err)
	}

	// Parse config from env
	var cfg config.Config
	if err := env.Parse(&cfg); err != nil {
		return fmt.Errorf("parse env: %w", err)
	}

	// Init logger
	if err := slogx.Init(cfg.Logger); err != nil {
		return fmt.Errorf("init logger: %w", err)
	}

	// Init DB connection
	traceStarter := slogx.NewTraceStarter(uuid.NewV7)

	// Init DB connection
	gormDB, err := db.NewGormDB(cfg.DB)
	if err != nil {
		return fmt.Errorf("new db connection: %w", err)
	}
	defer func() {
		dbConnection, _ := gormDB.DB()
		dbConnection.Close()
	}()

	userAuthHandlers, err := modulebuilder.BuildUserAuthModule(cfg, gormDB)
	if err != nil {
		return fmt.Errorf("build user-auth module: %w", err)
	}

	// Configure middleware with the custom claims type
	echoJWTConfig := echojwt.Config{
		NewClaimsFunc: func(echo.Context) jwt.Claims {
			return new(token.JwtCustomClaims)
		},
		SigningKey: []byte(cfg.Auth.AccessSecret),
	}

	allHandlers := routes.Handlers{
		AuthHandler:       userAuthHandlers.AuthHandler,
		OAuthHandler:      userAuthHandlers.OAuthHandler,
		RegisterHandler:   userAuthHandlers.RegisterHandler,
		EchoJWTMiddleware: echojwt.WithConfig(echoJWTConfig),
	}

	engine := echo.New()
	if err := routes.ConfigureRoutes(traceStarter, engine, allHandlers); err != nil {
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

	return nil
}
