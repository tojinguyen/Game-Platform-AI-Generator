// Package routes configures the HTTP routes for the Echo web server.
package routes

import (
	handlers "github.com/game-platform-ai/golang-echo-boilerplate/internal/server/handlers/user-auth"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/server/middleware"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/slogx"

	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
)

type Handlers struct {
	AuthHandler     *handlers.AuthHandler
	OAuthHandler    *handlers.OAuthHandler
	RegisterHandler *handlers.RegisterHandler
	ProfileHandler  *handlers.ProfileHandler

	EchoJWTMiddleware echo.MiddlewareFunc
}

func ConfigureRoutes(tracer *slogx.TraceStarter, engine *echo.Echo, handlers Handlers) error {
	// CORS middleware
	engine.Use(echomiddleware.CORSWithConfig(echomiddleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
	}))

	engine.Use(middleware.NewRequestLogger(tracer))

	// Swagger documentation
	engine.GET("/swagger/*", echoSwagger.WrapHandler)

	// API group with prefix api/external/v1
	apiGroup := engine.Group("/api/external/v1")

	// Public endpoints - no authentication required
	apiGroup.POST("/login", handlers.AuthHandler.Login)
	apiGroup.POST("/register", handlers.RegisterHandler.Register)
	apiGroup.POST("/google-oauth", handlers.OAuthHandler.GoogleOAuth)
	apiGroup.POST("/refresh", handlers.AuthHandler.RefreshToken)

	protectedGroup := apiGroup.Group("")
	protectedGroup.Use(middleware.NewRequestDebugger())
	protectedGroup.Use(handlers.EchoJWTMiddleware)

	// Protected endpoints - authentication required
	protectedGroup.PUT("/profile", handlers.ProfileHandler.UpdateProfile)

	return nil
}
