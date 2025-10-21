package routes

import (
	"github.com/nix-united/golang-echo-boilerplate/internal/server/handlers"
	"github.com/nix-united/golang-echo-boilerplate/internal/server/middleware"
	"github.com/nix-united/golang-echo-boilerplate/internal/slogx"

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

	engine.GET("/swagger/*", echoSwagger.WrapHandler)

	engine.POST("/login", handlers.AuthHandler.Login)
	engine.POST("/register", handlers.RegisterHandler.Register)
	engine.POST("/google-oauth", handlers.OAuthHandler.GoogleOAuth)
	engine.POST("/refresh", handlers.AuthHandler.RefreshToken)

	r := engine.Group("", middleware.NewRequestDebugger())

	r.Use(handlers.EchoJWTMiddleware)

	return nil
}
