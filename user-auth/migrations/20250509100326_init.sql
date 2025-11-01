-- +goose Up
-- +goose StatementBegin
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    
    -- Identity
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    is_verified TINYINT(1) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    
    -- Profile
    full_name VARCHAR(255),
    avatar_url TEXT,
    bio TEXT,
    date_of_birth TIMESTAMP,
    gender VARCHAR(20),
    address TEXT,
    
    -- Auth & Role
    role VARCHAR(50) DEFAULT 'USER',
    login_provider VARCHAR(50) DEFAULT 'local',
    last_login_at TIMESTAMP,
    refresh_token_version INTEGER DEFAULT 1,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    INDEX idx_users_deleted_at (deleted_at)
);
-- +goose StatementEnd

-- +goose StatementBegin
CREATE TABLE o_auth_providers (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    token TEXT NOT NULL,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    INDEX idx_oauth_providers_deleted_at (deleted_at)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE o_auth_providers;
-- +goose StatementEnd

-- +goose StatementBegin
DROP TABLE users;
-- +goose StatementEnd
