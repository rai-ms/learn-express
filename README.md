# Portfolio Management API

A robust Express.js API for managing portfolio projects, built with TypeScript, Prisma, and PostgreSQL. This project includes environment-specific configurations, structured error handling, and comprehensive logging.

## Features

- 🚀 TypeScript with Express.js
- 🔒 Environment-based configuration
- 🗃️ PostgreSQL with Prisma ORM
- 📊 Request logging with Winston
- 🔄 Hot-reloading in development
- 🛡️ Environment variable validation
- 🧪 Built-in health check endpoint

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v14 or higher)
- npm (v8 or higher) or yarn

## Quick Start

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio-api.git
   cd portfolio-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp config/development.env .env
   ```
   Update the `.env` file with your database credentials.

4. Set up the database:
   ```bash
   createdb portfolio_ashish  # or your preferred database name
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

6. Start the development server:
   ```bash
   make dev
   ```

## Available Commands

- `make dev` - Start development server with hot-reloading
- `make prod` - Build and start production server
- `make db-migrate` - Run database migrations
- `make db-studio` - Open Prisma Studio for database management
- `make test` - Run tests
- `make lint` - Lint the codebase
- `make format` - Format the code

## Environment Variables

Configuration is managed through environment variables. The following files are used:

- `.env` - Local development overrides
- `config/development.env` - Development environment settings
- `config/production.env` - Production environment settings

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Port to run the server on (default: 3000)
- `NODE_ENV` - Environment (development/production)

## API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create a new project
  ```json
  {
    "title": "Project Title",
    "description": "Project Description",
    "imageUrl": "https://example.com/image.jpg",
    "githubUrl": "https://github.com/username/project",
    "demoUrl": "https://project-demo.com",
    "tags": ["react", "typescript"]
  }
  ```

## Database Management

### Prisma Studio
Access the database GUI with:
```bash
make db-studio
```
Then visit `http://localhost:5555` in your browser.

### Running Migrations
To create and apply a new migration:
```bash
npx prisma migrate dev --name your_migration_name
```

## Deployment

### Prerequisites
- Fly.io CLI installed and configured
- Docker (for building the production image)

### Steps
1. Build the production image:
   ```bash
   make build
   ```

2. Deploy to Fly.io:
   ```bash
   fly deploy
   ```

## Development

### Code Structure
```
src/
├── config/       # Configuration management
├── controllers/  # Request handlers
├── middleware/   # Express middleware
├── models/       # Data models
├── routes/       # API routes
├── services/     # Business logic
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
├── app.ts        # Express application setup
└── index.ts      # Application entry point
```

## License

MIT
