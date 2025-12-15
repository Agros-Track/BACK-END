<<<<<<< HEAD
# BACK-END
=======
# AgroTrack Backend API

## 📝 Description

AgroTrack is a comprehensive livestock management system designed to help farmers and agricultural businesses track and manage their livestock operations efficiently. This backend API provides a robust foundation for managing animals, health records, feeding schedules, production tracking, and more in a multi-tenant environment with role-based access control.

## 🚀 Features

- **Multi-tenant Architecture**: Support for multiple farms/tenants with isolated data
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Animal Management**: Track individual animals, their details, and lineage
- **Health Monitoring**: Record and monitor animal health, treatments, and vaccinations
- **Production Tracking**: Monitor milk, egg, and other production metrics
- **Feeding Management**: Schedule and track animal feeding
- **Task Management**: Assign and track farm tasks
- **Weight Tracking**: Monitor animal growth and weight changes
- **Location Management**: Track animal movements between locations
- **RESTful API**: Well-documented endpoints following REST principles
- **Swagger Documentation**: Interactive API documentation

## 🛠 Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT, Passport.js
- **API Documentation**: Swagger/OpenAPI
- **Containerization**: Docker
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)
- PostgreSQL (v12 or later)
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BACK-END
   ```

2. **Install dependencies**
   ```bash
   cd app
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `app` directory with the following variables:
   ```env
   APP_CONTAINER_NAME=nest-app
   APP_PORT=3000
   NODE_ENV=development
   APP_CPU_LIMIT=0.50
   APP_MEM_LIMIT=512M

   POSTGRES_USER=
   POSTGRES_PASSWORD=
   POSTGRES_DB=
   POSTGRES_PORT=5432
   POSTGRES_LOCAL=5432
   DATABASE_URL=

   DB_CPU_LIMIT=0.5
   DB_MEM_LIMIT=512M

   JWT_SECRET=
   JWT_EXPIRES_IN=

   API_PORT=3000
   ```

4. **Database Setup**
   - Create a PostgreSQL database
   - Import the database schema from `agrotrack.sql`
   - Or use the provided TypeORM migrations

### Running the Application

```bash
# Development mode with hot-reload
$ npm run start:dev

# Production build
$ npm run build
$ npm run start:prod
```

### Running with Docker

1. Update the database configuration in `docker-compose.yml` if needed
2. Run the following command from the project root:
   ```bash
   docker-compose up -d
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
All endpoints (except `/auth/login`) require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer your-jwt-token
```

### API Endpoints

#### Authentication
| Method | Endpoint | Description | Required Headers | Required Role |
|--------|----------|-------------|------------------|---------------|
| POST   | /auth/login | User login | `Content-Type: application/json` | None |
| GET    | /auth/me | Get current user info | `Authorization: Bearer <token>` | Any authenticated user |

#### Animals
| Method | Endpoint | Description | Required Headers | Required Role |
|--------|----------|-------------|------------------|---------------|
| POST   | /animals | Create a new animal | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | ADMIN_TENANT |
| GET    | /animals | Get all animals | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | Any role |
| GET    | /animals/:id | Get animal by ID | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | Any role |
| PATCH  | /animals/:id | Update animal | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | ADMIN_TENANT |
| DELETE | /animals/:id | Delete animal | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | ADMIN_TENANT |

#### Health Records
| Method | Endpoint | Description | Required Headers | Required Role |
|--------|----------|-------------|------------------|---------------|
| POST   | /health  | Create health record | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | ADMIN_TENANT, VET |
| GET    | /health/animal/:animalId | Get health records for animal | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | Any role |

#### Feeding
| Method | Endpoint | Description | Required Headers | Required Role |
|--------|----------|-------------|------------------|---------------|
| POST   | /feeding | Schedule feeding | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | ADMIN_TENANT, WORKER |
| GET    | /feeding/schedule | Get feeding schedule | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | Any role |

#### Production
| Method | Endpoint | Description | Required Headers | Required Role |
|--------|----------|-------------|------------------|---------------|
| POST   | /productions | Record production | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | WORKER, ADMIN_TENANT |
| GET    | /productions | Get production records | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | Any role |

#### Tasks
| Method | Endpoint | Description | Required Headers | Required Role |
|--------|----------|-------------|------------------|---------------|
| POST   | /tasks   | Create task | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | ADMIN_TENANT, MANAGER |
| GET    | /tasks   | Get tasks | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | Any role |
| PATCH  | /tasks/:id/complete | Complete task | `Authorization: Bearer <token>`, `x-tenant-id: <tenant_id>` | WORKER, ADMIN_TENANT |

## 🧪 Testing

```bash
# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## 📂 Project Structure

```
src/
├── common/            # Shared modules, decorators, filters, etc.
├── config/            # Configuration files
├── database/          # Database configuration and migrations
├── modules/           # Feature modules
│   ├── animals/       # Animal management
│   ├── auth/          # Authentication and authorization
│   ├── feeding/       # Feeding schedules and tracking
│   ├── health/        # Health records and treatments
│   ├── locations/     # Location and movement tracking
│   ├── movements/     # Animal movement history
│   ├── productions/   # Production tracking
│   ├── roles/         # Role-based access control
│   ├── tasks/         # Task management
│   ├── tenant/        # Multi-tenant configuration
│   ├── users/         # User management
│   └── weight/        # Weight tracking
├── app.module.ts      # Root application module
└── main.ts            # Application entry point
```

## 🔒 Security

- JWT-based authentication
- Role-based access control (RBAC)
- Input validation using class-validator
- Environment-based configuration
- Secure password hashing with bcrypt

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Database powered by [PostgreSQL](https://www.postgresql.org/)
- ORM by [TypeORM](https://typeorm.io/)
- API documentation with [Swagger](https://swagger.io/)

---

**Note**: This project is under active development. Please report any issues or suggestions to the repository's issue tracker.               

>>>>>>> develop
