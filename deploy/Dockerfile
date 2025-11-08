# base image
FROM golang:1.25.1-alpine3.21 AS build

RUN apk add --no-cache --update git build-base

WORKDIR /go/src/api

COPY . .

RUN go install github.com/swaggo/swag/cmd/swag@v1.8.10 &&\
  $GOPATH/bin/swag init -g cmd/service/main.go &&\
  go mod download &&\
  go build -o game-app ./cmd/service

FROM alpine

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

WORKDIR /app
COPY --from=build /go/src/api/game-app /app/game-app

RUN ["chmod", "+x", "./game-app"]

CMD ["sh", "-c", "\
  /wait && \
  ./game-app \
  "]
