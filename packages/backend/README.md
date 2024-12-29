# Logikids Backend

This is the backend service for the Logikids application, a platform designed to help kids learn programming logic through interactive tasks and AI-powered hints.

## Technical Stack

- **Runtime**: [Bun](https://bun.sh/) - A fast all-in-one JavaScript runtime
- **Framework**: Express.js
- **Language**: TypeScript
- **Data Validation**: Zod
- **AI Integration**: OpenAI and Ollama
- **Prompt Templates**: String templating with variable replacement

## Project Structure

The project follows a domain-driven design pattern:

```
src/
├── common/         # Shared utilities and base classes
│   └── ai/        # AI service implementations (OpenAI, Ollama)
├── config/        # Configuration management
├── hints/         # Hint generation domain
├── tasks/         # Task management domain
└── index.ts       # Application entry point
```

## Key Features

- Task Management API
- AI-Powered Hint Generation
- Configurable AI Providers (OpenAI/Ollama)
- Domain-Driven Architecture
- Docker Support for Development and Production

## Development Setup

1. Copy `config.template.yaml` to `config.yaml` and fill in your configuration values:
   ```bash
   cp config.template.yaml config.yaml
   ```

2. The application can be run in different environments using Docker:

   Development:
   ```bash
   docker compose up backend-dev
   ```

   Production:
   ```bash
   docker compose up backend
   ```

   Tests:
   ```bash
   docker compose up backend-test
   ```

## API Endpoints

### Tasks
- `GET /api/task` - Generate a task based on age, difficulty, and subject

### Hints
- `POST /api/hint` - Generate hint for a task

For detailed API documentation and types, please refer to the types.ts files in each domain folder.

## Configuration

The application uses a YAML-based configuration system. Key configuration options include:

- Server settings (port, host)
- AI provider settings (OpenAI API key, Ollama endpoint)
- Task and hint generation parameters

## Testing

The project uses Jest for testing. Tests can be run using:

```bash
docker compose up backend-test
```

## Development Guidelines

1. Follow the domain-driven structure when adding new features
2. Each domain should have its own:
   - Router (`router.ts`)
   - Controller (`*.controller.ts`)
   - Service (`*.service.ts`)
   - Types (`types.ts`)
3. Use Zod for input validation
4. Write tests for new functionality
5. Follow TypeScript best practices

## Docker Support

The project includes three Dockerfile variants:
- `Dockerfile.dev` - For development with hot-reload
- `Dockerfile.prod` - For production deployment
- `Dockerfile.test` - For running tests
