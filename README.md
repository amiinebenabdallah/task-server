# Task App Server

A NestJS-based backend server for the Task App application.

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Make (optional, for using Makefile commands)

## Project Structure

```
.
├── src/                # Source code
├── test/              # Test files
├── Dockerfile         # Docker configuration for the API
├── docker-compose.yml # Docker Compose configuration
├── Makefile          # Make commands for common operations
└── README.md         # Project documentation
```

## Getting Started

### Using Docker (Recommended)

1. Build the Docker images:
   ```bash
   make build
   # or
   docker-compose build
   ```

2. Start the services:
   ```bash
   make up
   # or
   docker-compose up -d
   ```

3. Access the services:
   - API: http://localhost:3000
   - pgAdmin: http://localhost:5050
   - PostgreSQL: localhost:5432

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run start:dev
   ```

## Available Services

### API Service
- Port: 3000
- Environment variables:
  - NODE_ENV=production
  - DATABASE_HOST=postgres
  - DATABASE_PORT=5432
  - DATABASE_USER=postgres
  - DATABASE_PASSWORD=postgres
  - DATABASE_NAME=taskapp

### PostgreSQL Database
- Port: 5432
- Credentials:
  - Username: postgres
  - Password: postgres
  - Database: taskapp

### pgAdmin
- Port: 5050
- Login credentials:
  - Email: admin@admin.com
  - Password: admin

## Make Commands

The project includes a Makefile with common commands:

```bash
make build      # Build Docker images
make up         # Start all services
make down       # Stop all services
make logs       # View all logs
make clean      # Clean up Docker resources
make restart    # Restart all services
make ps         # List running containers
make dev        # Start development environment
make logs-api   # View API logs
make logs-db    # View database logs
make logs-pgadmin # View pgAdmin logs
make shell-api  # Enter API container shell
make shell-db   # Enter database container shell
make help       # Show all available commands
```

## Database Connection

To connect to the database using pgAdmin:

1. Access pgAdmin at http://localhost:5050
2. Login with:
   - Email: admin@admin.com
   - Password: admin
3. Add a new server:
   - Host: postgres
   - Port: 5432
   - Database: taskapp
   - Username: postgres
   - Password: postgres

## Development

### Running Tests

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Code Style

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Troubleshooting

### Common Issues

1. **Docker daemon not running**
   ```bash
   sudo systemctl start docker
   ```

2. **Port conflicts**
   - Ensure ports 3000, 5432, and 5050 are not in use
   - Check with: `sudo lsof -i :<port>`

3. **Database connection issues**
   - Verify PostgreSQL container is running: `make ps`
   - Check database logs: `make logs-db`

## License

This project is licensed under the MIT License.
