package token_test

import (
	"testing"
	"time"

	"github.com/game-platform-ai/golang-echo-boilerplate/internal/models"
	"github.com/game-platform-ai/golang-echo-boilerplate/internal/services/token"
	"github.com/google/uuid"

	"github.com/golang-jwt/jwt/v5"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestService(t *testing.T) {
	currentTime := time.Now()

	expiredTime, err := time.Parse(time.DateOnly, "2000-01-02")
	require.NoError(t, err)

	getCurrentTime := func() time.Time { return currentTime }
	getExpiredTime := func() time.Time { return expiredTime }
	accessTokenDuration := time.Minute
	refreshTokenDuration := 2 * time.Minute
	accessTokenSecret := []byte("access-secret")
	refreshTokenSecret := []byte("refresh-secret")

	userID := uuid.New()
	user := &models.User{
		ID:           userID,
		Email:        "example@email.com",
		FullName:     "name",
		PasswordHash: "password",
	}

	wantAccessClaims := &token.JwtCustomClaims{
		FullName: "name",
		ID:       userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(currentTime.Add(accessTokenDuration)),
		},
	}

	wantRefreshClaims := &token.JwtCustomRefreshClaims{
		ID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(currentTime.Add(refreshTokenDuration)),
		},
	}

	t.Run("It should return an error when access token is expired", func(t *testing.T) {
		service := token.NewService(
			getExpiredTime,
			accessTokenDuration,
			refreshTokenDuration,
			accessTokenSecret,
			refreshTokenSecret,
		)

		accessToken, _, err := service.CreateAccessToken(t.Context(), user)
		require.NoError(t, err)

		_, err = service.ParseAccessToken(t.Context(), accessToken)
		assert.ErrorIs(t, err, jwt.ErrTokenExpired)
	})

	t.Run("It should generate access token and parse it", func(t *testing.T) {
		service := token.NewService(
			getCurrentTime,
			accessTokenDuration,
			refreshTokenDuration,
			accessTokenSecret,
			refreshTokenSecret,
		)

		accessToken, _, err := service.CreateAccessToken(t.Context(), user)
		require.NoError(t, err)

		claims, err := service.ParseAccessToken(t.Context(), accessToken)
		require.NoError(t, err)

		assert.Equal(t, wantAccessClaims, claims)
	})

	t.Run("It should return an error when refresh token is expired", func(t *testing.T) {
		service := token.NewService(
			getExpiredTime,
			accessTokenDuration,
			refreshTokenDuration,
			accessTokenSecret,
			refreshTokenSecret,
		)

		refreshToken, err := service.CreateRefreshToken(t.Context(), user)
		require.NoError(t, err)

		_, err = service.ParseRefreshToken(t.Context(), refreshToken)
		assert.ErrorIs(t, err, jwt.ErrTokenExpired)
	})

	t.Run("It should generate refresh token and parse it", func(t *testing.T) {
		service := token.NewService(
			getCurrentTime,
			accessTokenDuration,
			refreshTokenDuration,
			accessTokenSecret,
			refreshTokenSecret,
		)

		refreshToken, err := service.CreateRefreshToken(t.Context(), user)
		require.NoError(t, err)

		claims, err := service.ParseRefreshToken(t.Context(), refreshToken)
		require.NoError(t, err)

		assert.Equal(t, wantRefreshClaims, claims)
	})

}
