package token

import (
	"errors"
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func getAuthClaims(c echo.Context) (*JwtCustomClaims, error) {
	user, ok := c.Get("user").(*jwt.Token)
	if !ok {
		return nil, errors.New("missing user data in context")
	}

	claims, ok := user.Claims.(*JwtCustomClaims)
	if !ok {
		return nil, fmt.Errorf("invalid claims %T, expected *token.JwtCustomClaims", user.Claims)
	}

	return claims, nil
}
