package handlers

import (
	"context"
	"net/http"

	commonResponses "github.com/game-platform-ai/golang-echo-boilerplate/internal/dtos/common"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/dtos/user-auth/requests"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

//go:generate go tool mockgen -source=$GOFILE -destination=profile_handler_mock_test.go -package=${GOPACKAGE}_test -typed=true

type userProfileUpdater interface {
	UpdateProfile(ctx context.Context, userID uuid.UUID, request *requests.UpdateProfileRequest) error
}

type ProfileHandler struct {
	userService userProfileUpdater
}

func NewProfileHandler(userService userProfileUpdater) *ProfileHandler {
	return &ProfileHandler{userService: userService}
}

// UpdateProfile godoc
//
//	@Summary		Update user profile
//	@Description	Update authenticated user's profile information
//	@ID				user-update-profile
//	@Tags			User Actions
//	@Accept			json
//	@Produce		json
//	@Security		Bearer
//	@Param			params	body		requests.UpdateProfileRequest	true	"Profile fields to update"
//	@Success		200		{object}	responses.Data
//	@Failure		400		{object}	responses.Error
//	@Failure		401		{object}	responses.Error
//	@Failure		500		{object}	responses.Error
//	@Router			/profile [put]
func (h *ProfileHandler) UpdateProfile(c echo.Context) error {
	var updateRequest requests.UpdateProfileRequest
	if err := c.Bind(&updateRequest); err != nil {
		return commonResponses.ErrorResponse(c, http.StatusBadRequest, "Failed to bind request")
	}

	if err := updateRequest.Validate(); err != nil {
		return commonResponses.ErrorResponse(c, http.StatusBadRequest, "Invalid profile data: "+err.Error())
	}

	// Get user ID from JWT token context
	userID, ok := c.Get("user_id").(string)
	if !ok {
		return commonResponses.ErrorResponse(c, http.StatusUnauthorized, "User not authenticated")
	}

	parsedUserID, err := uuid.Parse(userID)
	if err != nil {
		return commonResponses.ErrorResponse(c, http.StatusBadRequest, "Invalid user ID")
	}

	if err := h.userService.UpdateProfile(c.Request().Context(), parsedUserID, &updateRequest); err != nil {
		return commonResponses.ErrorResponse(c, http.StatusInternalServerError, "Failed to update profile: "+err.Error())
	}

	return commonResponses.MessageResponse(c, http.StatusOK, "Profile successfully updated")
}
