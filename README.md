# Task Management Application

A full-stack task management application built with NestJS, PostgreSQL, and Docker. This application provides a robust API for managing tasks with user authentication and authorization.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control
  - Secure password hashing
  - Refresh token support

- **Task Management**
  - Create, read, update, and delete tasks
  - Task categorization and prioritization
  - Due date tracking
  - Task status management

- **Database & ORM**
  - PostgreSQL database
  - Prisma ORM for type-safe database operations
  - Database migrations
  - Connection pooling

- **Development & Deployment**
  - Docker containerization
  - Docker Compose for local development
  - Environment-based configuration
  - Automated database setup

## Project Structure

```
src/
├── auth/           # Authentication module
│   ├── dto/       # Data transfer objects
│   ├── strategies/ # Authentication strategies
│   └── guards/    # Authentication guards
├── prisma/        # Database configuration
│   ├── migrations # Database migrations
│   └── schema.prisma # Database schema
├── task/          # Task module
│   ├── dto/       # Task DTOs
│   └── entities/  # Task entities
├── user/          # User module
│   ├── dto/       # User DTOs
│   └── entities/  # User entities
├── middleware/    # Custom middleware
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## Prerequisites

- Docker and Docker Compose
- Node.js (v16 or higher)
- npm (v7 or higher)


## Getting Started

1. Clone the repository:
```bash
git clone <https://github.com/amiinebenabdallah/task-server.git>
cd task-app/server
```

2. First-time setup:
```bash
make init
```
This will:
- Build and start the Docker containers
- Run the initial database migration
- Set up the database schema
- Create necessary database tables

3. Start the application:
```bash
make up
```

4. Stop the application:
```bash
make down
```

## Available Commands

- `make build` - Build Docker images
- `make up` - Start all services
- `make down` - Stop all services
- `make init` - First-time setup (run only once)
- `make logs` - View all logs
- `make clean` - Clean up Docker resources
- `make restart` - Restart all services
- `make ps` - List running containers
- `make logs-api` - View API logs
- `make logs-db` - View database logs
- `make logs-pgadmin` - View pgAdmin logs
- `make shell-api` - Enter API container shell
- `make shell-db` - Enter database container shell


## Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens are used for authentication
- API endpoints are protected by authentication middleware
- Database credentials are managed through environment variables
- CORS is configured for the frontend URL
