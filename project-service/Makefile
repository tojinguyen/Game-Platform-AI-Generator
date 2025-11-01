# Makefile for project-service

.PHONY: run build test lint docker-build docker-up

run:
	go run ./cmd/service/main.go

build:
	go build -o build/project-service ./cmd/service/main.go

test:
	go test -v ./...

lint:
	golangci-lint run

docker-build:
	docker build -t project-service:latest .

docker-up:
	docker-compose up -d
