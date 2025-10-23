package db

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// Connect initializes the database connection.
func Connect() (*gorm.DB, error) {
	// Replace with your actual DSN from config
	dsn := "user:password@tcp(127.0.0.1:3306)/project_db?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}
	return db, nil
}
