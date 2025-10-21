package routes

import (
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/server/handlers"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/server/middleware"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/slogx"

	"github.com/labstack/echo/v4"
	echoSwagger "github.com/swaggo/echo-swagger"
)

type Handlers struct {
	AuthHandler     *handlers.AuthHandler
	OAuthHandler    *handlers.OAuthHandler
	RegisterHandler *handlers.RegisterHandler

	EchoJWTMiddleware echo.MiddlewareFunc
}

func ConfigureRoutes(tracer *slogx.TraceStarter, engine *echo.Echo, handlers Handlers) error {
	engine.Use(middleware.NewRequestLogger(tracer))

	// Swagger documentation (không cần prefix)
	engine.GET("/swagger/*", echoSwagger.WrapHandler)

	// API group với prefix api/external/v1
	apiGroup := engine.Group("/api/external/v1")

	// Public endpoints - không cần authentication
	apiGroup.POST("/login", handlers.AuthHandler.Login)
	apiGroup.POST("/register", handlers.RegisterHandler.Register)
	apiGroup.POST("/google-oauth", handlers.OAuthHandler.GoogleOAuth)
	apiGroup.POST("/refresh", handlers.AuthHandler.RefreshToken)

	// Protected endpoints group - cần authentication
	protectedGroup := apiGroup.Group("")
	protectedGroup.Use(middleware.NewRequestDebugger())
	protectedGroup.Use(handlers.EchoJWTMiddleware)
	// Có thể thêm các protected endpoints ở đây sau này

	return nil
}
