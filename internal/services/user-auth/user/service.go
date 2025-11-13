package user

import (
	"context"
	"fmt"

	"github.com/game-platform-ai/golang-echo-boilerplate/internal/dtos/user-auth/requests"
	models "github.com/game-platform-ai/golang-echo-boilerplate/internal/models/user-auth"
	"github.com/google/uuid"

	"golang.org/x/crypto/bcrypt"
)

//go:generate go tool mockgen -source=$GOFILE -destination=service_mock_test.go -package=${GOPACKAGE}_test -typed=true

type userRepository interface {
	Create(ctx context.Context, user *models.User) error
	GetByID(ctx context.Context, id uuid.UUID) (models.User, error)
	GetUserByEmail(ctx context.Context, email string) (models.User, error)
	CreateUserAndOAuthProvider(ctx context.Context, user *models.User, oauthProvider *models.OAuthProviders) error
	Update(ctx context.Context, user *models.User) error
}

type Service struct {
	userRepository userRepository
}

func NewService(userRepository userRepository) *Service {
	return &Service{userRepository: userRepository}
}

func (s *Service) Register(ctx context.Context, request *requests.RegisterRequest) error {
	encryptedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(request.Password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		return fmt.Errorf("encrypt password: %w", err)
	}

	user := &models.User{
		Email:         request.Email,
		Username:      request.Username,
		FullName:      request.FullName,
		Phone:         request.Phone,
		DateOfBirth:   request.DateOfBirth,
		Gender:        models.Gender(request.Gender),
		Address:       request.Address,
		PasswordHash:  string(encryptedPassword),
		LoginProvider: models.Local,
	}

	if err := s.userRepository.Create(ctx, user); err != nil {
		return fmt.Errorf("create user in repository: %w", err)
	}

	return nil
}

func (s *Service) GetByID(ctx context.Context, id uuid.UUID) (models.User, error) {
	user, err := s.userRepository.GetByID(ctx, id)
	if err != nil {
		return models.User{}, fmt.Errorf("get user by id from repository: %w", err)
	}

	return user, nil
}

func (s *Service) GetUserByEmail(ctx context.Context, email string) (models.User, error) {
	user, err := s.userRepository.GetUserByEmail(ctx, email)
	if err != nil {
		return models.User{}, fmt.Errorf("get user by email from repository: %w", err)
	}

	return user, nil
}

func (s *Service) CreateUserAndOAuthProvider(ctx context.Context, user *models.User, oauthProvider *models.OAuthProviders) error {
	err := s.userRepository.CreateUserAndOAuthProvider(ctx, user, oauthProvider)
	if err != nil {
		return fmt.Errorf("create user and oauth provider from repository: %w", err)
	}

	return nil
}

func (s *Service) UpdateProfile(ctx context.Context, userID uuid.UUID, request *requests.UpdateProfileRequest) error {
	user, err := s.userRepository.GetByID(ctx, userID)
	if err != nil {
		return fmt.Errorf("get user by id from repository: %w", err)
	}

	// Update only provided fields
	if request.Username != nil {
		user.Username = *request.Username
	}
	if request.FullName != nil {
		user.FullName = *request.FullName
	}
	if request.Phone != nil {
		user.Phone = *request.Phone
	}
	if request.DateOfBirth != nil {
		user.DateOfBirth = request.DateOfBirth
	}
	if request.Gender != nil {
		user.Gender = models.Gender(*request.Gender)
	}
	if request.Address != nil {
		user.Address = *request.Address
	}
	if request.AvatarURL != nil {
		user.AvatarURL = *request.AvatarURL
	}

	if err := s.userRepository.Update(ctx, &user); err != nil {
		return fmt.Errorf("update user in repository: %w", err)
	}

	return nil
}
