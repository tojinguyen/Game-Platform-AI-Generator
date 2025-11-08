# syntax=docker/dockerfile:1
FROM golang:1.25.1-alpine3.21 AS builder

ARG DB_CONNECTION

# Install git for fetching dependencies
RUN apk update && apk add --no-cache git

# Set the current working directory inside the container
WORKDIR /app

# Copy go mod files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Install required tools
RUN go install github.com/swaggo/swag/cmd/swag@v1.8.10
RUN go install github.com/pressly/goose/v3/cmd/goose@latest

# Copy source code
COPY . .

# Generate swagger documentation and build the application
RUN swag init -g cmd/service/main.go && \
  go build -ldflags="-s -w" -o game-app ./cmd/service

# Final stage - minimal runtime image
FROM alpine:3.21

# Add ca-certificates for HTTPS requests and wait utility
RUN apk --no-cache add ca-certificates

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

WORKDIR /app

# Copy the binary and migrations from builder stage
COPY --from=builder /app/game-app ./game-app
COPY --from=builder /app/migrations ./migrations

RUN chmod +x ./game-app

# Run migrations and start the application
CMD ["sh", "-c", "\
  /wait && \
  ./game-app \
  "]
