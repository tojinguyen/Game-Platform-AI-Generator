-- +goose Up
-- +goose StatementBegin

-- Create extension to generate UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create a function to automatically update the `updated_at` field
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Table users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Identity
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'ACTIVE',

    -- Profile
    full_name VARCHAR(255),
    avatar_url TEXT,
    bio TEXT,
    date_of_birth TIMESTAMPTZ, -- Use TIMESTAMPTZ to store timezone information
    gender VARCHAR(20),
    address TEXT,

    -- Auth & Role
    role VARCHAR(50) DEFAULT 'USER',
    login_provider VARCHAR(50) DEFAULT 'local',
    last_login_at TIMESTAMPTZ,
    refresh_token_version INTEGER DEFAULT 1,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ NULL
);

CREATE INDEX idx_users_deleted_at ON users (deleted_at);

-- Create trigger to automatically update `updated_at` when changes occur
CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


-- Bảng o_auth_providers
CREATE TABLE o_auth_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    provider VARCHAR(255) NOT NULL,
    token TEXT NOT NULL,
    deleted_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE INDEX idx_oauth_providers_deleted_at ON o_auth_providers (deleted_at);

-- Tạo trigger cho bảng o_auth_providers
CREATE TRIGGER set_timestamp_oauth_providers
BEFORE UPDATE ON o_auth_providers
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE o_auth_providers;
DROP TABLE users;
DROP FUNCTION trigger_set_timestamp();
-- +goose StatementEnd