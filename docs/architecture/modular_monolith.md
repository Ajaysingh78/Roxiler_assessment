# Modular Monolithic Architecture

## Executive Summary
This project is engineered as a **Modular Monolith**. Rather than fragmenting the domain across distributed microservices (which introduces network latency, distributed transaction failure modes, and deployment complexity), the application runs as a unified Express.js application with strictly enforced internal layer boundaries and high cohesion.

```
React 19 Frontend (SPA)
         │ HTTP / JSON
         ▼
 Express REST Layer (app.js)
         │
    Middleware (Rate Limiting, Auth, Error Handling)
         │
       Routes (auth, stores, admin, owner)
         │
     Controllers (HTTP Request/Response translation)
         │
      Services (Business Rules, Rating Aggregation, Ownership)
         │
    Repositories (Database Access Abstraction)
         │
    Prisma ORM (Parameterized Prepared Statements)
         │
     MySQL 8.0 (InnoDB Engine with ACID guarantees)
```

## Layer Responsibilities

### 1. Routes Layer (`server/src/routes/`)
- Declares HTTP verbs (`GET`, `POST`, `PUT`) and paths.
- Chains authentication (`authenticate`) and authorization (`authorize`) guards.
- Binds route to corresponding controller method.
- **Rule:** Contains **zero** database queries or business computations.

### 2. Controller Layer (`server/src/controllers/`)
- Translates HTTP requests (`req.params`, `req.query`, `req.body`, `req.user`).
- Delegates business execution to domain services.
- Sends standardized response envelopes via `successResponse()`.
- Captures unhandled errors and passes them down the chain via `next(error)`.
- **Rule:** Controllers never communicate with Prisma directly.

### 3. Service Layer (`server/src/services/`)
- Encapsulates business logic, domain rules, and transactional workflows.
- Coordinates multiple repositories.
- Computes aggregate metrics (such as overall store ratings, rating distributions, and admin statistics).
- Enforces cross-entity rules (e.g., verifying that store owners cannot submit customer ratings for stores).
- **Rule:** Completely agnostic of HTTP constructs (no `req` or `res` objects).

### 4. Repository Layer (`server/src/repositories/`)
- Single point of interaction with the MySQL database via Prisma Client.
- Encapsulates queries, projections, sorting criteria, and transactions.
- **Rule:** Returns plain domain objects/arrays and does not perform business calculations.

### 5. Database Layer (`server/src/database/`)
- Manages connection lifecycle (`$connect`, `$disconnect`).
- Exposes health checks (`checkDatabaseConnection`) for readiness probes.

---

## Why Modular Monolith Over Microservices?

| Dimension | Microservices | Modular Monolith (Chosen) |
| :--- | :--- | :--- |
| **Operational Overhead** | High (service discovery, k8s, tracing, api gateways) | Minimal (single runtime process, simple CI/CD) |
| **Data Integrity** | Eventual consistency (Sagas, 2PC) | Immediate consistency (ACID MySQL transactions) |
| **Network Latency** | Inter-service network hops (REST/gRPC) | In-memory function invocations (~0ms) |
| **Code Navigability** | Fragmented across multiple repositories | Clean, single codebase with clear boundaries |
| **Suitability for Scope** | Over-engineered for Store Rating portal | Perfect match for high performance and maintainability |
