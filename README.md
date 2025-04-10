# Task Management Application

A NestJS-based task management application with user authentication and task CRUD operations.

## Features

- User authentication (JWT)
- Task management (CRUD operations)
- PostgreSQL database
- Docker containerization
- Prisma ORM
- RESTful API

## Project Structure

```
src/
├── auth/           # Authentication module
├── database/       # Database configuration
├── decorators/     # Custom decorators
├── middleware/     # Custom middleware
├── prisma/         # Prisma client and service
├── task/           # Task module
├── user/           # User module
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## Prerequisites

- Docker and Docker Compose
- Node.js 
- npm

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/taskapp?schema=public"
JWT_SECRET="your-secret-key"
```

## Getting Started

1. Clone the repository:
```bash
git clone <https://github.com/amiinebenabdallah/task-server/>
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

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Users
- `GET /users/profile` - Get users 

## Database

The application uses PostgreSQL with the following schema:

### Users Table
- id (primary key)
- email (unique)
- password
- tasks (relation)

### Tasks Table
- id (primary key)
- title
- description
- status
- due_date
- priority
- user_id (foreign key)
- created_at
- updated_at

## Development

 Access services:
- API: http://localhost:3000
- PgAdmin: http://localhost:5050
  - Email: admin@admin.com
  - Password: admin
  - Database connection:
    - Host: postgres
    - Port: 5432
    - Database: taskapp
    - Username: postgres
    - Password: postgres

