.PHONY: build up down logs clean restart ps init

# Build the Docker images
build:
	docker-compose build

# Start all services in detached mode
up:
	docker-compose up -d

# First-time setup (run only once)
init:
	docker-compose up -d
	@echo "Waiting for database to be ready..."
	@sleep 5
	npx prisma migrate dev --name init

# Stop all services
down:
	docker-compose down

# View logs of all services
logs:
	docker-compose logs -f

# Clean up containers, images, and volumes
clean:
	docker-compose down -v
	docker system prune -f

# Restart all services
restart:
	docker-compose restart

# List running containers
ps:
	docker-compose ps

# Start development environment
dev:
	docker-compose up

# View logs for specific service
logs-api:
	docker-compose logs -f api

logs-db:
	docker-compose logs -f postgres

logs-pgadmin:
	docker-compose logs -f pgadmin

# Enter container shell
shell-api:
	docker-compose exec api sh

shell-db:
	docker-compose exec postgres psql -U postgres -d taskapp

# Help command
help:
	@echo "Available commands:"
	@echo "  make build      - Build Docker images"
	@echo "  make up         - Start all services"
	@echo "  make init       - First-time setup (run only once)"
	@echo "  make down       - Stop all services"
	@echo "  make logs       - View all logs"
	@echo "  make clean      - Clean up Docker resources"
	@echo "  make restart    - Restart all services"
	@echo "  make ps         - List running containers"
	@echo "  make dev        - Start development environment"
	@echo "  make logs-api   - View API logs"
	@echo "  make logs-db    - View database logs"
	@echo "  make logs-pgadmin - View pgAdmin logs"
	@echo "  make shell-api  - Enter API container shell"
	@echo "  make shell-db   - Enter database container shell" 