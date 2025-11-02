// Package migrations embeds SQL migration files for database schema management.
package migrations

import "embed"

//go:embed *.sql
var EmbedMigrations embed.FS
