// Package handlers provides HTTP handlers for authentication-related operations.
package handlers

import (
	"context"
	"errors"
	"net/http"

	commonResponses "github.com/game-platform-ai/golang-echo-boilerplate/internal/dtos/common"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/dtos/user-auth/requests"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/dtos/user-auth/responses"
	models "github.com/game-platform-ai/golang-echo-boilerplate/internal/models/user-auth"

	"github.com/labstack/echo/v4"
)

//go:generate go tool mockgen -source=$GOFILE -destination=auth_handler_mock_test.go -package=${GOPACKAGE}_test -typed=true

type authService interface {
	GenerateToken(ctx context.Context, request *requests.LoginRequest) (*responses.LoginResponse, error)
	RefreshToken(ctx context.Context, request *requests.RefreshRequest) (*responses.LoginResponse, error)
}

type AuthHandler struct {
	authService authService
}

func NewAuthHandler(authService authService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

// Login godoc
//
//	@Summary		Authenticate a user
//	@Description	Perform user login
//	@ID				user-login
//	@Tags			User Actions
//	@Accept			json
//	@Produce		json
//	@Param			params	body		requests.LoginRequest	true	"User's credentials"
//	@Success		200		{object}	responses.LoginResponse
//	@Failure		401		{object}	responses.Error
//	@Router			/login [post]
func (h *AuthHandler) Login(c echo.Context) error {
	var request requests.LoginRequest
	if err := c.Bind(&request); err != nil {
		return commonResponses.ErrorResponse(c, http.StatusBadRequest, "Failed to bind request")
	}

	if err := request.Validate(); err != nil {
		return commonResponses.ErrorResponse(c, http.StatusBadRequest, "Required fields are empty or not valid")
	}

	response, err := h.authService.GenerateToken(c.Request().Context(), &request)
	switch {
	case errors.Is(err, models.ErrUserNotFound), errors.Is(err, models.ErrInvalidPassword):
		return commonResponses.ErrorResponse(c, http.StatusUnauthorized, "Invalid credentials")
	case err != nil:
		return commonResponses.ErrorResponse(c, http.StatusInternalServerError, "Internal Server Error")
	}

	return commonResponses.Response(c, http.StatusOK, response)
}

// RefreshToken godoc
//
//	@Summary		Refresh access token
//	@Description	Perform refresh access token
//	@ID				user-refresh
//	@Tags			User Actions
//	@Accept			json
//	@Produce		json
//	@Param			params	body		requests.RefreshRequest	true	"Refresh token"
//	@Success		200		{object}	responses.LoginResponse
//	@Failure		401		{object}	responses.Error
//	@Router			/refresh [post]
func (h *AuthHandler) RefreshToken(c echo.Context) error {
	var request requests.RefreshRequest
	if err := c.Bind(&request); err != nil {
		return commonResponses.ErrorResponse(c, http.StatusBadRequest, "Failed to bind request")
	}

	response, err := h.authService.RefreshToken(c.Request().Context(), &request)
	switch {
	case errors.Is(err, models.ErrUserNotFound), errors.Is(err, models.ErrInvalidAuthToken):
		return commonResponses.ErrorResponse(c, http.StatusUnauthorized, "Unauthorized")
	case err != nil:
		return commonResponses.ErrorResponse(c, http.StatusInternalServerError, "Internal Server Error")
	}

	return commonResponses.Response(c, http.StatusOK, response)
}
