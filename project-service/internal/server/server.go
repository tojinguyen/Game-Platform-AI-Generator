package server

import (
	"github.com/labstack/echo/v4"
)

// Server holds the Echo instance.
type Server struct {
	echo *echo.Echo
}

// New creates and configures a new server instance.
func New() *Server {
	e := echo.New()
	return &Server{echo: e}
}

// Start runs the HTTP server.
func (s *Server) Start() error {
	return s.echo.Start(":8081")
}
