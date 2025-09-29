.PHONY: help install dev prod db-migrate db-studio format lint test build start

# Default target when running just 'make'
help:
	@echo "Available commands:"
	@echo "  make install     - Install dependencies"
	@echo "  make dev         - Start development server"
	@echo "  make prod        - Start production server"
	@echo "  make db-migrate  - Run database migrations"
	@echo "  make db-studio   - Open Prisma Studio"
	@echo "  make format      - Format code with prettier"
	@echo "  make lint        - Lint code"
	@echo "  make test        - Run tests"
	@echo "  make build       - Build for production"
	@echo "  make start       - Start production server (after build)"

# Load environment variables from .env file
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

# Install dependencies
install:
	npm install
	npx prisma generate

# Development environment
dev: NODE_ENV=development
dev:
	@echo "Starting development server..."
	DATABASE_URL=$(shell grep -v '^#' .env | grep DATABASE_URL | cut -d '=' -f2-) npx ts-node-dev --respawn --transpile-only src/index.ts

# Production environment
prod: NODE_ENV=production
prod: build
	@echo "Starting production server..."
	node dist/index.js

# Database commands
db-migrate:
	npx prisma migrate dev --name $(shell date +%Y%m%d_%H%M%S)

db-studio:
	npx prisma studio

# Code quality
format:
	npx prettier --write "src/**/*.ts"

lint:
	npx eslint "src/**/*.ts"

# Testing
test:
	npm test

# Build for production
build:
	npm run build

# Start production server (after build)
start:
	node dist/index.js


createDB:
	createdb portfolio_ashish
