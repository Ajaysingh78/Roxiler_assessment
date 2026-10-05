# Roxiler Systems — Store Rating & Reputation Platform

> A secure, role-based multi-store rating web application engineered for the **Roxiler Systems Full Stack Developer Intern Assessment**. Built with **React 18**, **Node.js / Express**, and a **MySQL 8.0** relational database via an enterprise **Modular Monolithic Architecture**.

Live Demo

Frontend:

https://restro-rating.netlify.app/

Backend API:

https://roxilerassessment-production.up.railway.app/

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.21.2-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-v18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-v6.0.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Driver](https://img.shields.io/badge/Driver-mysql2%2Fpromise-orange)](https://github.com/sidorares/node-mysql2)
[![Test Suite](https://img.shields.io/badge/Tests-16%20Passed%20(100%25)-brightgreen)](file:///server/tests)
[![Audit](https://img.shields.io/badge/QA%20Audit-81%2F81%20Passed-success)](file:///server/tests/comprehensive_audit.js)

---

## Table of Contents
1. [Overview](#1-overview)
2. [Problem Statement](#2-problem-statement)
3. [Key Features](#3-key-features)
4. [User Roles & Access Model](#4-user-roles--access-model)
5. [Application Flow](#5-application-flow)
6. [Architecture](#6-architecture)
7. [Request Lifecycle](#7-request-lifecycle)
8. [Technology Stack](#8-technology-stack)
9. [Project Structure](#9-project-structure)
10. [Database Design](#10-database-design)
11. [Authentication & Authorization](#11-authentication--authorization)
12. [API Documentation](#12-api-documentation)
13. [Validation Rules](#13-validation-rules)
14. [Security](#14-security)
15. [Search, Filtering, Sorting & Pagination](#15-search-filtering-sorting--pagination)
16. [Rating System](#16-rating-system)
17. [Error Handling](#17-error-handling)
18. [UI/UX Design System](#18-uiux-design-system)
19. [Demo Accounts](#19-demo-accounts)
20. [Local Setup](#20-local-setup)
21. [Environment Variables](#21-environment-variables)
22. [Testing](#22-testing)
23. [Deployment Readiness](#23-deployment-readiness)
24. [Engineering Decisions](#24-engineering-decisions)
25. [Scalability Considerations](#25-scalability-considerations)
26. [Known Limitations](#26-known-limitations)
27. [Future Enhancements](#27-future-enhancements)
28. [Testing & Quality Checklist](#28-testing--quality-checklist)
29. [Interview Talking Points](#29-interview-talking-points)
30. [Why This Project Demonstrates Engineering Maturity](#30-why-this-project-demonstrates-engineering-maturity)

---

# 1. Overview

The **Roxiler Systems Store Rating Platform** is a full-stack, multi-tenant web application designed to solve a core challenge in modern retail commerce: providing consumers with a trustworthy discovery and evaluation mechanism for physical retail stores, while giving business owners real-time visibility into customer satisfaction.

Instead of an overengineered generic marketplace or food delivery clone, this application focuses strictly and deeply on **reputation management, rating integrity, and granular access control**.

The system enables:
- **Normal Users** to register, discover stores, search by name or address, and submit/modify their authentic 1-to-5 star ratings.
- **Store Owners** to track their store's performance via live average scores, star breakdowns, and customer feedback ledgers.
- **System Administrators** to oversee users and stores, create accounts across all roles, filter directories, and monitor global platform metrics.

Technically, the platform demonstrates strict input validation, resilient relational data modeling in MySQL, parameterized SQL queries, stateless JWT authentication, and a clean **Modular Monolithic Architecture**.

---

# 2. Problem Statement

Modern consumers depend heavily on peer ratings before visiting brick-and-mortar stores. However, building a multi-tenant rating platform involves challenging technical hurdles:

1. **Rating Integrity & Duplicate Prevention:** Preventing users from spamming multiple ratings on the same store while allowing them to update their existing score.
2. **Strict Identity & Role Boundaries:** Ensuring that Store Owners can only see data for their assigned store, Normal Users can never access administrative controls, and Store Owners cannot rate stores to inflate scores artificially.
3. **Strict Domain Validation:** Enforcing non-trivial business constraints (e.g. names between 20–60 characters, passwords with uppercase and special character requirements, addresses up to 400 characters, and ratings strictly 1–5) at both client and server boundaries.
4. **Relational Consistency:** Managing clean cascading relationships between accounts, business locations, and ratings in MySQL without orphaned records or race conditions.

This project delivers a complete, end-to-end solution satisfying every requirement outlined in the Roxiler Systems Full Stack Developer assessment specification.

---

# 3. Key Features

### Administrator
- **Platform Analytics Dashboard:** Instant visibility into global metrics: Total Users, Total Stores, Total Ratings, and a breakdown of users by role.
- **User Management:** Full administrative directory of all platform users with role filtering (`ALL`, `USER`, `ADMIN`, `STORE_OWNER`), live search, and multi-column sorting (Name, Email, Role, Created Date).
- **Store Owner Insight:** In the user directory, Store Owner records dynamically display the live average rating of their assigned store.
- **User Creation:** Provision new users of any role (`USER`, `STORE_OWNER`, `ADMIN`) with server-side validation.
- **Store Provisioning:** Register new physical stores with Name, Email, Address, and optional assignment to a registered Store Owner.
- **Store Directory:** View all registered stores with owner details and live average scores.

### Normal User
- **Account Registration & Login:** Self-service registration with interactive client-side and server-side constraint checks.
- **Store Discovery Catalog:** Browse all registered retail stores displaying Store Name, Email, Address, and Overall Average Rating.
- **Personal Rating Visibility:** Authenticated users immediately see their own previously submitted rating alongside the public average.
- **Real-Time Dual Search:** Debounced search filtering simultaneously across Store Name and Physical Address.
- **Rating Submission & Modification (Atomic Upsert):** Submit a 1–5 star rating with a single click, or modify a previously submitted rating seamlessly.
- **Account Management:** Change account password securely while logged in.

### Store Owner
- **Dedicated Store Dashboard:** Scoped strictly to the owner's assigned store; shows store details, overall average rating, and total rating count.
- **Star Distribution Breakdown:** Interactive 1-to-5 star breakdown showing exact count and proportional distribution bar for each rating level.
- **Customer Ratings Ledger:** Comprehensive audit table of all customer ratings received, displaying Customer Name, Customer Email, Customer Address, Submitted Score, and Timestamp.
- **Ledger Search & Sort:** Filter feedback by customer name or email, and sort by rating score or date.
- **Zero-Rating Empty State:** Graceful empty state when a new store has not yet received customer reviews.
- **Account Management:** Change account password securely.

### Platform Features
- **Stateless Authentication:** Cryptographic JWT tokens with 24-hour expiration stored securely in the client session.
- **Role-Based Access Control (RBAC):** Middleware-enforced permissions on every protected endpoint.
- **Atomic Database Upserts:** Enforced `UNIQUE(userId, storeId)` composite index prevents duplicate reviews and race conditions.
- **Comprehensive Rate Limiting:** Global API rate limiting and dedicated auth endpoint rate limiting to prevent brute-force attacks.
- **Responsive UI:** Custom CSS design system with light and dark theme toggle, accessible components, and zero third-party CSS bloat.
- **Centralized Error Handling:** Standardized API envelope response format across success, validation errors, and exceptions.

---

# 4. User Roles & Access Model

The platform enforces three distinct user roles with zero permission ambiguity:

| Capability / Resource | Administrator (`ADMIN`) | Normal User (`USER`) | Store Owner (`STORE_OWNER`) | Unauthenticated Visitor |
| :--- | :---: | :---: | :---: | :---: |
| **Browse Stores Catalog** | Yes | Yes | Yes | Yes (Public View) |
| **Search Stores (Name/Address)** | Yes | Yes | Yes | Yes |
| **View Store Public Average Rating** | Yes | Yes | Yes | Yes |
| **View Personal Submitted Rating** | Yes | Yes | N/A | No |
| **Submit / Modify Store Rating** | Yes | Yes | **Blocked (403)** | No (Redirect to Login) |
| **Access `/admin/dashboard`** | **Yes** | **Blocked (403)** | **Blocked (403)** | **Blocked (401)** |
| **Add New Stores / Users** | **Yes** | **Blocked (403)** | **Blocked (403)** | **Blocked (401)** |
| **Access `/owner/dashboard`** | Yes (fallback) | **Blocked (403)** | **Yes (Own Store Only)** | **Blocked (401)** |
| **View Customer Review Ledger** | N/A | **Blocked (403)** | **Yes (Own Store Only)** | **Blocked (401)** |
| **Change Password** | Yes | Yes | Yes | No |

### Ownership Isolation Rule
Store Owners can **only** inspect the ratings and analytics of the store assigned to their user ID (`stores.ownerId = req.user.id`). They cannot view or modify feedback belonging to any other store owner. Furthermore, Store Owners are explicitly prohibited by `rating.service.js` from rating any store on the platform, preventing conflict-of-interest review inflation.

---

# 5. Application Flow

### Normal User Journey
```mermaid
sequenceDiagram
    autonumber
    actor User as Normal User
    participant Frontend as React Client
    participant API as Express API
    participant DB as MySQL Database

    User->>Frontend: Fill Sign-up / Login form
    Frontend->>API: POST /api/auth/login
    API->>DB: SELECT * FROM users WHERE email = ?
    DB-->>API: User record (bcrypt hash)
    API-->>Frontend: HTTP 200 + JWT Token { id, email, role }
    Frontend->>Frontend: Save token to localStorage & set AuthContext
    Frontend->>API: GET /api/stores (with Bearer Token)
    API->>DB: Query stores + ratings for current user
    DB-->>API: Store list with overallRating & userSubmittedRating
    API-->>Frontend: HTTP 200 [ { name, overallRating, userSubmittedRating }, ... ]
    User->>Frontend: Click 4 Stars on Store
    Frontend->>API: POST /api/stores/:id/ratings { rating: 4 }
    API->>DB: INSERT INTO ratings ... ON DUPLICATE KEY UPDATE rating = 4
    DB-->>API: Record updated
    API->>DB: SELECT AVG(rating) FROM ratings WHERE storeId = ?
    DB-->>API: Recomputed score (4.2)
    API-->>Frontend: HTTP 200 { rating: 4, storeOverallRating: 4.2 }
    Frontend->>User: UI reflects updated personal rating & new store average
```

### Administrator Management Journey
```mermaid
sequenceDiagram
    autonumber
    actor Admin as System Admin
    participant Frontend as React Client
    participant API as Express API
    participant DB as MySQL Database

    Admin->>Frontend: Login as Admin
    Frontend->>API: GET /api/admin/dashboard
    API->>DB: COUNT(*) on users, stores, ratings + role breakdown
    DB-->>API: Live counts
    API-->>Frontend: HTTP 200 { totalUsers, totalStores, totalRatings, roles }
    Admin->>Frontend: Add New Store modal
    Frontend->>API: POST /api/admin/stores { name, email, address, ownerId }
    API->>DB: INSERT INTO stores ...
    DB-->>API: Created store
    API-->>Frontend: HTTP 201 Created
```

### Store Owner Feedback Journey
```mermaid
sequenceDiagram
    autonumber
    actor Owner as Store Owner
    participant Frontend as React Client
    participant API as Express API
    participant DB as MySQL Database

    Owner->>Frontend: Login as Store Owner
    Frontend->>API: GET /api/owner/dashboard
    API->>DB: Find store where ownerId = req.user.id
    API->>DB: Query ratings + reviewer profiles for store
    DB-->>API: Ratings, users, and aggregate scores
    API-->>Frontend: HTTP 200 { store, averageRating, breakdown, ratings }
    Frontend->>Owner: Renders average score, star distribution bars & reviews table
```

---

# 6. Architecture

The system is architected as a **Modular Monolith** with a decoupled Single Page Application (SPA) frontend and a layered backend.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        React 18 Single Page App                        │
│          (Vite, React Router v6, Context API, Vanilla CSS)             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST (JSON + Bearer JWT)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Express.js Modular Monolith API                      │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ Middleware Layer                                               │   │
│   │ - Rate Limiting (express-rate-limit)                           │   │
│   │ - Security & CORS Headers (cors, json parser)                  │   │
│   │ - Authentication (authenticate via jwt.verify)                 │   │
│   │ - Role-Based Authorization (requireRole)                       │   │
│   │ - Centralized Error Handler (notFoundHandler, errorHandler)    │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
│                                   │                                    │
│   ┌───────────────────────────────▼────────────────────────────────┐   │
│   │ Routing Layer                                                  │   │
│   │ /api/auth    /api/stores    /api/admin    /api/owner           │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
│                                   │                                    │
│   ┌───────────────────────────────▼────────────────────────────────┐   │
│   │ Controllers Layer                                              │   │
│   │ - Parse HTTP requests, validate query params, send responses   │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
│                                   │                                    │
│   ┌───────────────────────────────▼────────────────────────────────┐   │
│   │ Services Layer (Business Domain Logic)                         │   │
│   │ - auth.service.js    - store.service.js   - rating.service.js  │   │
│   │ - admin.service.js   - owner.service.js                        │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
│                                   │                                    │
│   ┌───────────────────────────────▼────────────────────────────────┐   │
│   │ Repositories Layer (Data Access Layer - DAO)                   │   │
│   │ - user.repository.js   - store.repository.js                   │   │
│   │ - rating.repository.js                                         │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
│                                   │                                    │
│   ┌───────────────────────────────▼────────────────────────────────┐   │
│   │ Database Layer                                                 │   │
│   │ - mysql2 Connection Pool (getPoolConfig, auto-init schema)     │   │
│   │ - Parameterized Prepared Statements                            │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
└───────────────────────────────────┼────────────────────────────────────┘
                                    │ TCP / TLS (Port 3306)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        MySQL 8.0 Relational DB                         │
│           (InnoDB Engine, Foreign Keys, Unique Indexes, ACID)          │
└────────────────────────────────────────────────────────────────────────┘
```

### Why a Modular Monolith?
1. **Right-Sized Complexity:** For an intern assessment or departmental SaaS platform, microservices introduce unnecessary distributed network latency, distributed transaction orchestration (Saga patterns), and complex deployment pipelines.
2. **Strict Separation of Concerns:** Business logic lives entirely inside the **Service** layer, while SQL queries live entirely inside the **Repository** layer. Controllers never make raw SQL calls.
3. **High Cohesion & Refactorability:** Repositories can easily be substituted or upgraded without altering HTTP routes, business rules, or frontend contracts.

---

# 7. Request Lifecycle

Every HTTP request traverses a deterministic 8-step lifecycle:

```
1. Client Request      ──►  POST /api/stores/:id/ratings (Bearer <JWT>)
2. Global Limiter      ──►  apiLimiter verifies IP quota (max 100 req / 15 min)
3. Auth Middleware     ──►  authenticate extracts token, calls jwt.verify(), loads user
4. Role Guard          ──►  requireRole checks if role is permitted
5. Validator           ──►  validateRating() verifies rating is integer 1 to 5
6. Controller          ──►  store.controller.js parses params and delegates to service
7. Service             ──►  rating.service.js checks business rules (e.g. not STORE_OWNER)
8. Repository          ──►  rating.repository.js executes parameterized SQL query
9. Database Engine     ──►  MySQL 8.0 executes atomic upsert via InnoDB
10. Formatted Response ──►  successResponse() sends HTTP 200 { success: true, data: { ... } }
```

If any failure occurs at steps 2–8, execution halts immediately and passes the error to `next(err)`, reaching `globalErrorHandler` to emit a standardized JSON error without leaking sensitive internals.

---

# 8. Technology Stack

| Layer | Technology | Version | Purpose & Rationale |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React.js | `^18.3.1` | Declarative component UI with hooks and memoization |
| **Client Bundler** | Vite | `^6.0.1` | Instant HMR development server and fast ES-module production builds |
| **Routing** | React Router DOM | `^6.28.0` | Client-side routing with nested routes and role-based guards |
| **Icons** | Lucide React | `^0.468.0` | Lightweight, consistent SVG iconography |
| **Styling** | Vanilla CSS3 | W3C Standard | Design tokens with CSS variables, light/dark themes, zero framework bloat |
| **Backend Runtime** | Node.js | `>=20.x` | High-throughput asynchronous JavaScript runtime |
| **Web Framework** | Express.js | `^4.21.2` | Minimalist HTTP routing and middleware framework |
| **Database Engine** | MySQL | `8.0` | Production ACID-compliant relational database |
| **Database Driver** | `mysql2` | `^3.24.5` | High-performance MySQL client with native connection pooling & promise API |
| **Password Hashing** | `bcryptjs` | `^2.4.3` | Adaptive slow one-way cryptographic hashing (10 salt rounds) |
| **Token Authentication** | `jsonwebtoken` | `^9.0.2` | Cryptographic HMAC-SHA256 stateless session management |
| **Rate Limiting** | `express-rate-limit`| `^7.5.0` | In-memory DoS and brute-force mitigation per IP window |
| **HTTP Logger** | `morgan` | `^1.10.0` | Request logging during development |
| **Testing Engine** | Node.js Test Runner| Built-in (`node:test`)| Fast, native runner for unit & integration testing without heavy dependencies |

---

# 9. Project Structure

```
roxiler_company_assisment/
│
├── package.json                        # Root orchestration scripts
├── .gitignore                          # Git ignore rules for node_modules, .env, dist
│
├── client/                             # React 18 Single Page Application
│   ├── package.json                    # Client dependencies & Vite scripts
│   ├── vite.config.js                  # Vite configuration
│   ├── index.html                      # HTML entry with font imports & meta tags
│   └── src/
│       ├── main.jsx                    # React DOM entry point
│       ├── App.jsx                     # Root application wrapper with context providers
│       ├── constants/
│       │   ├── roles.js                # Canonical roles: ADMIN, USER, STORE_OWNER
│       │   └── routes.js               # Route paths: /login, /stores, /admin, /owner
│       ├── context/
│       │   ├── AuthContext.jsx         # User session, login, logout, token persistence
│       │   └── ToastContext.jsx        # Notification dispatch and auto-dismiss toasts
│       ├── routes/
│       │   └── AppRoutes.jsx           # Route declarations and ProtectedRoute bindings
│       ├── components/
│       │   └── common/
│       │       ├── Navbar.jsx          # Responsive header with role badges & theme toggle
│       │       ├── Footer.jsx          # Standard footer component
│       │       ├── Modal.jsx           # Accessible dialog backdrop & wrapper
│       │       ├── ChangePasswordModal # Secure password update dialog with validation
│       │       ├── DataTable.jsx       # Reusable, sortable table with empty states
│       │       ├── StarRating.jsx      # Interactive 1–5 star picker & visual display
│       │       └── ProtectedRoute.jsx  # Route guard checking role access
│       ├── pages/
│       │   ├── auth/
│       │   │   ├── Login.jsx           # Unified credential sign-in
│       │   │   └── Signup.jsx          # Self-registration with real-time field validators
│       │   ├── user/
│       │   │   └── StoresList.jsx      # Store catalog, dual search, and rating modal
│       │   ├── owner/
│       │   │   └── OwnerDashboard.jsx  # Score averages, star bars & feedback ledger
│       │   ├── admin/
│       │   │   └── AdminDashboard.jsx  # Platform metrics, user/store creation & filtering
│       │   └── NotFound.jsx            # 404 error page with navigation fallback
│       ├── services/
│       │   └── api/
│       │       ├── client.js           # Fetch wrapper attaching Bearer token & JSON headers
│       │       └── index.js            # Modular API service exports
│       ├── validations/
│       │   └── auth.validation.js      # Client-side validation mirrors of backend rules
│       └── styles/
│           ├── variables.css           # Design tokens, color palette, dark/light themes
│           ├── base.css                # Typography, global resets, utility classes
│           ├── components.css          # Cards, tables, modals, badges, stars
│           └── forms.css               # Input fields, labels, error text, buttons
│
├── server/                             # Express.js REST API Modular Monolith
│   ├── package.json                    # Server dependencies & test scripts
│   ├── .env.example                    # Template for required environment variables
│   ├── src/
│   │   ├── index.js                    # Process entry point
│   │   ├── server.js                   # HTTP server startup & graceful shutdown handlers
│   │   ├── app.js                      # Express configuration, middleware & route mounting
│   │   ├── config/
│   │   │   └── database.js             # Database pool export and connection probe
│   │   ├── database/
│   │   │   ├── connection.js           # mysql2 pool configuration & auto table creation
│   │   │   └── seed.js                 # Idempotent development seed script (60+ records)
│   │   ├── constants/
│   │   │   ├── httpStatus.js           # HTTP status code constants
│   │   │   ├── messages.js             # Standardized message strings
│   │   │   └── roles.js                # Roles: ADMIN, USER, STORE_OWNER
│   │   ├── middleware/
│   │   │   ├── auth.js                 # JWT verification and user population
│   │   │   ├── roles.js                # Role-based authorization middleware
│   │   │   ├── rateLimiter.js          # API and auth route brute-force protection
│   │   │   └── errorHandler.js         # 404 handler and centralized JSON error handler
│   │   ├── validators/
│   │   │   ├── auth.validator.js       # Strict validators: Name, Email, Password, Address
│   │   │   ├── store.validator.js      # Store input validators
│   │   │   ├── rating.validator.js     # Integer 1–5 rating validator
│   │   │   └── index.js                # Combined validator exports
│   │   ├── utils/
│   │   │   ├── jwt.js                  # Token generation and verification helpers
│   │   │   ├── password.js             # Bcrypt hashing and comparison helpers
│   │   │   └── response.js             # Standardized JSON response envelope helpers
│   │   ├── repositories/
│   │   │   ├── user.repository.js      # User queries, count by role, email lookup
│   │   │   ├── store.repository.js     # Store queries, owner joins, rating joins
│   │   │   └── rating.repository.js    # Atomic upsert, store score queries, ledger
│   │   ├── services/
│   │   │   ├── auth.service.js         # Registration, login, password update logic
│   │   │   ├── store.service.js        # Catalog search, sort, and rating calculation
│   │   │   ├── rating.service.js       # Upsert orchestration & owner rate prohibition
│   │   │   ├── admin.service.js        # Dashboard aggregation, user & store creation
│   │   │   └── owner.service.js        # Owner metrics calculation & ledger filtering
│   │   ├── controllers/
│   │   │   ├── auth.controller.js      # Signup, login, getMe, changePassword
│   │   │   ├── store.controller.js     # getStores, getStoreById, submitOrUpdateRating
│   │   │   ├── admin.controller.js     # getDashboardStats, addUser, addStore, getUsers
│   │   │   └── owner.controller.js     # getOwnerDashboard, getOwnerRatings
│   │   └── routes/
│   │       ├── auth.routes.js          # /api/auth routes
│   │       ├── store.routes.js         # /api/stores routes
│   │       ├── admin.routes.js         # /api/admin routes
│   │       └── owner.routes.js         # /api/owner routes
│   └── tests/
│       ├── unit/
│       │   ├── validators.test.js      # Unit tests for Name, Email, Password, Address, Rating
│       │   └── security.test.js        # Unit tests for Bcrypt hashing & JWT signing
│       ├── integration/
│       │   └── api.test.js             # API integration tests with database assertions
│       ├── comprehensive_audit.js      # Full 81-point automated QA audit script
│       └── verify_dataset.js           # Database integrity and seed verification script
│
└── database/
    └── schema.sql                      # Reference MySQL 8.0 DDL schema definition
```

---

# 10. Database Design

The relational schema is implemented in **MySQL 8.0** using the **InnoDB storage engine** with strict foreign keys, cascading deletions, and composite unique keys.

### Entity-Relationship (ER) Diagram
```mermaid
erDiagram
    users ||--o{ stores : "owns (0..1)"
    users ||--o{ ratings : "submits (0..N)"
    stores ||--o{ ratings : "receives (0..N)"

    users {
        VARCHAR_36 id PK "UUID"
        VARCHAR_60 name "Length 20-60"
        VARCHAR_255 email UK "Unique, Normalized"
        VARCHAR_255 password "Bcrypt Hash"
        VARCHAR_400 address "Max 400 chars"
        VARCHAR_20 role "ADMIN | USER | STORE_OWNER"
        DATETIME_3 createdAt "Default CURRENT_TIMESTAMP(3)"
        DATETIME_3 updatedAt "Auto-updated on change"
    }

    stores {
        VARCHAR_36 id PK "UUID"
        VARCHAR_60 name "Length 20-60"
        VARCHAR_255 email UK "Unique, Normalized"
        VARCHAR_400 address "Max 400 chars"
        VARCHAR_36 ownerId FK "References users(id) ON DELETE SET NULL"
        DATETIME_3 createdAt "Default CURRENT_TIMESTAMP(3)"
        DATETIME_3 updatedAt "Auto-updated on change"
    }

    ratings {
        VARCHAR_36 id PK "UUID"
        VARCHAR_36 userId FK "References users(id) ON DELETE CASCADE"
        VARCHAR_36 storeId FK "References stores(id) ON DELETE CASCADE"
        INT rating "Integer 1 to 5"
        DATETIME_3 createdAt "Default CURRENT_TIMESTAMP(3)"
        DATETIME_3 updatedAt "Auto-updated on change"
    }
```

### Table Definitions & Integrity Constraints

#### 1. `users` Table
- `id` (VARCHAR(36), PK): UUID generated by `node:crypto.randomUUID()`.
- `name` (VARCHAR(60), NOT NULL): Enforces 20–60 character constraint.
- `email` (VARCHAR(255), NOT NULL, UNIQUE): Unique index `users_email_key` prevents duplicate accounts.
- `password` (VARCHAR(255), NOT NULL): Salted bcrypt hash (`$2a$10$...`).
- `address` (VARCHAR(400), NOT NULL): Physical address up to 400 characters.
- `role` (VARCHAR(20), NOT NULL, DEFAULT 'USER'): Indexed `users_role_idx` for fast filtering.

#### 2. `stores` Table
- `id` (VARCHAR(36), PK): UUID.
- `name` (VARCHAR(60), NOT NULL): Store name between 20–60 characters.
- `email` (VARCHAR(255), NOT NULL, UNIQUE): Official store contact email.
- `address` (VARCHAR(400), NOT NULL): Physical store location.
- `ownerId` (VARCHAR(36), NULL): Foreign key referencing `users(id)`. Constrained with `ON DELETE SET NULL` so deleting a user does not destroy the store entity.

#### 3. `ratings` Table & The One-Rating-Per-Store Rule
- `id` (VARCHAR(36), PK): UUID.
- `userId` (VARCHAR(36), NOT NULL): Foreign key referencing `users(id)` with `ON DELETE CASCADE`.
- `storeId` (VARCHAR(36), NOT NULL): Foreign key referencing `stores(id)` with `ON DELETE CASCADE`.
- `rating` (INT, NOT NULL): Rating integer strictly between 1 and 5.
- **Composite Unique Index:** `UNIQUE KEY ratings_userId_storeId_key (userId, storeId)`.
  > **Crucial Rule:** The composite unique constraint enforces at the database storage engine level that a user can never have more than one rating record per store. An atomic SQL upsert updates the existing row in place if the user modifies their score.

---

# 11. Authentication & Authorization

### Authentication: "Who are you?"
- **Mechanism:** Stateless JSON Web Tokens (JWT) signed with HMAC-SHA256 (`HS256`).
- **Token Payload:** `{ id, email, role }` with a 24-hour expiration (`JWT_EXPIRES_IN=24h`).
- **Password Security:** Salted using `bcryptjs` with 10 salt rounds before persistence. Plaintext passwords are never stored, logged, or emitted in API responses.
- **Client Persistence:** Tokens are held in `localStorage` under `roxiler_token` and automatically attached as `Authorization: Bearer <token>` on all outgoing API calls by `client.js`.

### Authorization: "What are you allowed to do?"
Authorization is enforced by dedicated Express middleware:

1. `authenticate`: Verifies the JWT signature from `req.headers.authorization`. If valid, loads the user from `userRepository.findById(decoded.id)`, strips the password hash, and assigns `req.user = safeUser`. Rejects missing or invalid tokens with `401 Unauthorized`.
2. `requireRole(...allowedRoles)`: Compares `req.user.role` against authorized roles. Rejects unauthorized attempts with `403 Forbidden`.
3. **Owner Store Isolation:** In `owner.service.js`, the service strictly queries:
   ```sql
   SELECT * FROM stores WHERE ownerId = ?
   ```
   passing `req.user.id`. The user ID is never taken from client request bodies or query strings, eliminating Broken Object Level Authorization (BOLA / IDOR) vulnerabilities.

---

# 12. API Documentation

All API responses follow a uniform JSON envelope:
```json
{
  "success": true,
  "message": "Human-readable description",
  "data": { ... }
}
```
Validation error responses return:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "fieldName": "Specific error explanation"
  }
}
```

### 1. Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Access | Request Body | Description |
| :--- | :--- | :---: | :--- | :--- |
| `POST` | `/api/auth/signup` | Public | `{ name, email, password, address }` | Register a new Normal User |
| `POST` | `/api/auth/login` | Public | `{ email, password }` | Authenticate user & issue JWT |
| `GET` | `/api/auth/me` | Authenticated | None | Retrieve currently authenticated user profile |
| `PUT` | `/api/auth/change-password` | Authenticated | `{ currentPassword, newPassword }` | Update user's password |

### 2. Store & Rating Endpoints (`/api/stores`)

| Method | Endpoint | Access | Query / Body Params | Description |
| :--- | :--- | :---: | :--- | :--- |
| `GET` | `/api/stores` | Public / Optional Auth | Query: `search`, `sortBy`, `order` | List stores with average rating & current user's submitted rating |
| `GET` | `/api/stores/:id` | Public / Optional Auth | Param: `id` (Store UUID) | Fetch store details with rating breakdown |
| `POST` | `/api/stores/:id/ratings` | Authenticated (`USER`, `ADMIN`) | Body: `{ rating: 1..5 }` | Submit or update rating (atomic upsert) |
| `PUT` | `/api/stores/:id/ratings` | Authenticated (`USER`, `ADMIN`) | Body: `{ rating: 1..5 }` | Alias for rating update |

### 3. Administrator Endpoints (`/api/admin`)

| Method | Endpoint | Access | Query / Body Params | Description |
| :--- | :--- | :---: | :--- | :--- |
| `GET` | `/api/admin/dashboard` | `ADMIN` only | None | Global metrics: total users, stores, ratings & role counts |
| `GET` | `/api/admin/users` | `ADMIN` only | Query: `search`, `role`, `sortBy`, `order` | List all users with Store Owner live ratings |
| `POST` | `/api/admin/users` | `ADMIN` only | Body: `{ name, email, password, address, role }` | Provision a user of any role |
| `GET` | `/api/admin/stores` | `ADMIN` only | Query: `search`, `sortBy`, `order` | List all stores with owner information |
| `POST` | `/api/admin/stores` | `ADMIN` only | Body: `{ name, email, address, ownerId? }` | Create a new physical store |

### 4. Store Owner Endpoints (`/api/owner`)

| Method | Endpoint | Access | Query / Body Params | Description |
| :--- | :--- | :---: | :--- | :--- |
| `GET` | `/api/owner/dashboard` | `STORE_OWNER`, `ADMIN` | None | Assigned store metrics, average score & 1–5 star breakdown |
| `GET` | `/api/owner/ratings` | `STORE_OWNER`, `ADMIN` | Query: `search`, `sortBy`, `order` | Detailed ledger of customer reviews received |

---

# 13. Validation Rules

All validation rules specified in the assessment are strictly verified at all three tiers:

| Parameter | Assessment Specification | Client-Side Enforcement | Backend Service Enforcement | Database Storage Tier |
| :--- | :--- | :--- | :--- | :--- |
| **Name** | Min 20, Max 60 characters | `auth.validation.js`: checks length on change, character counter | `validateName()`: rejects `< 20` or `> 60` with HTTP 400 | `VARCHAR(60)` column constraint |
| **Address** | Max 400 characters | `auth.validation.js`: real-time counter up to 400 chars | `validateAddress()`: rejects empty or `> 400` with HTTP 400 | `VARCHAR(400)` column constraint |
| **Password** | 8–16 chars, &ge;1 uppercase letter, &ge;1 special character | Interactive checklist UI: validates regex `[A-Z]` and `[!@#$%^&*(),.?":{}|<>]` | `validatePassword()`: enforces length, uppercase & special char | Bcrypt hash (`VARCHAR(255)`) |
| **Email** | Valid RFC email address format | Standard RFC-5322 regex validation | `validateEmail()`: strict regex test, rejects malformed | `VARCHAR(255)` with UNIQUE constraint |
| **Rating** | Integer between 1 and 5 | Star picker component restricting selection to 1..5 | `validateRating()`: rejects non-integers, `< 1`, or `> 5` with HTTP 400 | `INT` column constraint |

---

# 14. Security

The application follows defense-in-depth principles:

1. **One-Way Password Hashing:** Passwords are cryptographically salted and hashed with `bcryptjs` using 10 rounds. Cleartext passwords never touch logs or databases.
2. **SQL Injection Immunization:** All database communications utilize parameterized prepared statements via `mysql2/promise` (`pool.execute('... WHERE id = ?', [id])`). User input is never concatenated into SQL strings.
3. **Password Redaction:** Repository queries and controllers deliberately omit the `password` field when returning user objects (`SELECT id, name, email, address, role...`).
4. **Denial-of-Service (DoS) Mitigation:** Configured with `express-rate-limit`:
   - `apiLimiter`: 100 requests per 15-minute window for standard API endpoints.
   - `authLimiter`: 20 requests per 15-minute window for `/signup` and `/login` to thwart credential stuffing and brute-force attempts.
5. **Cross-Origin Resource Sharing (CORS):** Explicit HTTP headers configured via `cors` middleware, allowing specified methods and header values.
6. **Role Isolation & BOLA Defense:** Store Owners cannot specify arbitrary `storeId` values in request bodies to tamper with other stores; the backend resolves their assigned store exclusively via `req.user.id`.
7. **Clean Centralized Exception Sanitization:** Database errors or uncaught exceptions do not emit internal database connection strings, stack traces, or SQL syntax to the client in production.

---

# 15. Search, Filtering, Sorting & Pagination

### Searchable Fields
- **Store Catalog (`/api/stores`):** Server-side `LIKE %term%` matching across both Store Name and Store Physical Address.
- **Admin Users Directory (`/api/admin/users`):** Multi-attribute search across User Name, User Email, and User Address.
- **Owner Review Ledger (`/api/owner/ratings`):** In-memory ledger search across Reviewer Name and Reviewer Email.

### Filterable Fields
- **Admin Directory:** Filter by Role (`ALL`, `USER`, `ADMIN`, `STORE_OWNER`).
- **Store Owner:** Filter reviews by customer query.

### Sortable Fields
- **Store Catalog:** Sort by `name` (Alphabetical ASC/DESC) or `overallRating` (Numerical ASC/DESC).
- **Admin Users:** Sort by `name`, `email`, `role`, or `createdAt` (ASC/DESC).
- **Admin Stores:** Sort by `name`, `email`, or `createdAt` (ASC/DESC).
- **Owner Reviews:** Sort by `rating` score or submission date (`createdAt`).

### Why Server-Side vs Client-Side?
Store catalog search and admin user searches are handled server-side through repository queries to minimize payload transfer over the network, ensuring the client application remains snappy as the dataset expands.

---

# 16. Rating System

The rating system guarantees complete fairness, accuracy, and idempotence.

### Lifecycle of a Rating
```
User navigates to Stores Catalog
       │
Stores query returns store list + current user's submitted score
       │
If user has NOT rated: Card shows "Rate Store" button
If user HAS rated: Card shows "Modify Rating" button & displays current score
       │
User selects 1 to 5 stars in modal dialog and clicks "Submit Rating"
       │
Backend verifies:
  1. User is authenticated with role USER or ADMIN
  2. User is NOT a STORE_OWNER (403 Forbidden if true)
  3. Rating value is strictly an integer between 1 and 5
       │
Atomic MySQL Upsert:
  INSERT INTO ratings (id, userId, storeId, rating, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, NOW(3), NOW(3))
  ON DUPLICATE KEY UPDATE rating = VALUES(rating), updatedAt = NOW(3);
       │
Recompute Store Average:
  SELECT rating FROM ratings WHERE storeId = ?
  Average = (SUM(rating) / COUNT(*)).toFixed(1)
       │
Return updated rating & new store overall score to client
```

### Key Rating Rules
1. **One User = One Rating per Store:** Guaranteed by `UNIQUE KEY ratings_userId_storeId_key (userId, storeId)`.
2. **Owners Cannot Rate:** Prevented by `rating.service.js` (`userRole === 'STORE_OWNER' -> 403 Forbidden`).
3. **Empty Rating Handling:** Stores with zero ratings display `"No ratings yet"` / `"New"` instead of an erroneous `0.0` score, preventing unrated stores from being penalized visually.

---

# 17. Error Handling

The application provides a seamless, transparent error handling strategy:

### Backend
- **Centralized Middleware:** Unmatched routes fall into `notFoundHandler` (HTTP 404). Any runtime error thrown in services or controllers is passed via `next(error)` to `globalErrorHandler`.
- **Validation Errors:** Emits HTTP 400 Bad Request with a detailed map of fields that failed validation:
  ```json
  {
    "success": false,
    "message": "Validation failed",
    "errors": {
      "name": "Name must be at least 20 characters long",
      "password": "Password must include at least one special character"
    }
  }
  ```
- **Authentication Failures:** Rejects missing/expired tokens with HTTP 401 Unauthorized (`"Invalid or expired token"`).
- **Forbidden Actions:** Rejects unauthorized role access with HTTP 403 Forbidden (`"Access denied: Insufficient privileges"`).
- **Conflict Failures:** Duplicate email registration returns HTTP 409 Conflict.

### Frontend
- **Field-Level Form Feedback:** Form inputs immediately highlight in red with inline helper text describing exactly why the value is invalid.
- **Global Toast Notifications:** Dispatched via `ToastContext` with auto-dismiss timers for network errors, successful rating updates, and password changes.
- **Catch-All 404 Page:** Custom `NotFound.jsx` component guides users back to safety when visiting invalid routes.

---

# 18. UI/UX Design System

The frontend is constructed using **Vanilla CSS3** with a custom design system defined in `client/src/styles/variables.css`:

- **Design Tokens:** Strict HSL-based color tokens for primary indigo/blue hues, surface layers, borders, and status indicators (success green, danger red, warning amber).
- **Theme Switcher:** Native Dark Mode and Light Mode support with smooth CSS transitions, persisted in `localStorage`.
- **Responsive Layout:** Mobile-first fluid grid supporting Desktop (>1200px), Tablet (768px–1199px), and Mobile (<768px).
- **Interactive Micro-Animations:** Subtle hover transitions on store cards, buttons, and star selectors.
- **State Management:** Distinct UI states for **Loading** (animated spinners), **Empty States** (clean SVG illustrations when searches yield zero results), and **Error States**.

---

# 19. Demo Accounts

The project includes pre-seeded, realistic demo accounts across all three roles:

| Role | Name | Email | Password | Scenario / Evaluation Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **System Admin** | System Administrator Roxiler | `admin@roxiler.com` | `Admin@123` | **Master Admin Account:** Dashboard metrics, add stores, manage users |
| **System Admin** | Chief Technology Administrator | `admin.demo@example.com` | `Admin@123` | Secondary Admin Account |
| **Store Owner** | Jonathan Edward Masterson | `owner.john@freshmart.com` | `Owner@123` | **High-Volume Store:** Owner of *FreshHarvest Organic Supermart* (18 reviews, 4.67 avg) |
| **Store Owner** | Rajeshwar Prasad Srivastava | `owner.rajesh@technova.com` | `Owner@123` | **Medium-Rated Store:** Owner of *TechNova Digital Electronics Hub* (3.56 avg) |
| **Store Owner** | Meenakshi Sundaram Pillai | `owner.meenakshi@quickbite.com`| `Owner@123` | **Low-Rated Store:** Owner of *QuickBite Daily Essentials Mart* (1.89 avg) |
| **Store Owner** | Pooja Suryavanshi Hyderabad | `owner.empty@example.com` | `Owner@123` | **Empty State Test:** Owner of *UrbanNest Living* (**0 ratings**) |
| **Normal User** | Primary Demo Customer User | `user.demo@example.com` | `User@123` | **Primary User Account:** Has 4 rated stores & 11 unrated stores to test "Rate" vs "Modify" |
| **Normal User** | Alexandra Turner Montgomery | `alexandra.turner@example.com`| `User@123` | Verified customer user |
| **Normal User** | Christopher Benjamin Hayes | `christopher.hayes@example.com`| `User@123` | Verified customer user |

> **Password Note:** All pre-seeded accounts utilize the assessment-compliant password format: 8–16 characters, containing an uppercase letter and a special character (`Admin@123`, `Owner@123`, `User@123`).

---

# 20. Local Setup

### Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **npm:** v9.0.0 or higher
- **MySQL Server:** 8.0 running locally on port `3306`
- **Git**

### Step 1: Clone the Repository
```bash
git clone https://github.com/Ajaysingh78/Roxiler_assessment.git
cd Roxiler_assessment
```

### Step 2: Configure Server Environment
Navigate to `server/` and create your `.env` configuration:
```bash
cd server
cp .env.example .env
```
*(On Windows PowerShell: `Copy-Item .env.example .env`)*

Configure your local MySQL password in `server/.env`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="mysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/roxiler_db"
JWT_SECRET=roxiler_super_secret_jwt_key_2026_evaluation_token
JWT_EXPIRES_IN=24h
CLIENT_URL=http://localhost:5173
```

### Step 3: Install Dependencies
```bash
# From repository root
npm --prefix server install
npm --prefix client install
```

### Step 4: Initialize Database & Seed Demo Data
The seed script connects to MySQL, automatically verifies tables, and populates the complete demo dataset:
```bash
npm --prefix server run seed
```

### Step 5: Start Development Servers
Open two terminal windows:

**Terminal 1 — Backend API:**
```bash
npm --prefix server run dev
# Server listening on http://localhost:5000
```

**Terminal 2 — Frontend Application:**
```bash
npm --prefix client run dev
# Vite development server running on http://localhost:5173
```

Visit **`http://localhost:5173`** in your browser.

---

# 21. Environment Variables

### Backend (`server/.env`)

| Variable | Required | Default / Example Value | Description |
| :--- | :---: | :--- | :--- |
| `PORT` | No | `5000` | Port for the Express REST server |
| `NODE_ENV` | No | `development` | Runtime environment (`development`, `production`, `test`) |
| `DATABASE_URL` | Yes | `mysql://root:password@localhost:3306/roxiler_db` | MySQL connection URI string |
| `JWT_SECRET` | Yes | `roxiler_super_secret_jwt_key_2026_evaluation_token` | Secret HMAC key used to sign and verify JWT tokens |
| `JWT_EXPIRES_IN` | No | `24h` | Token validity lifespan |
| `CLIENT_URL` | No | `http://localhost:5173` | Allowed CORS origin for frontend requests |

### Frontend (`client/.env`)

| Variable | Required | Default / Example Value | Description |
| :--- | :---: | :--- | :--- |
| `VITE_API_URL` | No | `http://localhost:5000/api` | Base URL for REST API endpoints |

---

# 22. Testing

The project incorporates both unit testing and end-to-end API integration tests using Node.js's native test runner (`node:test`).

### Run Test Suite
```bash
# From repository root
npm --prefix server test
```

### Test Suite Execution Output
```
TAP version 13
ok 1 - GET /api/health returns healthy
ok 2 - POST /api/auth/login with valid admin credentials
ok 3 - POST /api/auth/login with invalid credentials fails (401)
ok 4 - POST /api/auth/signup validation enforces name (20-60 chars) and password rules
ok 5 - POST /api/auth/signup successful registration creates user
ok 6 - GET /api/stores lists stores with average ratings
ok 7 - Store rating submission & upsert modification (atomic upsert)
ok 8 - GET /api/admin/dashboard metrics requires ADMIN role (403 for non-admins)
ok 9 - GET /api/owner/dashboard returns store stats for store owner
ok 10 - Password utility: properly hashes and compares passwords
ok 11 - JWT utility: creates valid tokens and decodes payload
ok 12 - validateName: enforces 20 to 60 characters range
ok 13 - validateEmail: enforces standard RFC format
ok 14 - validatePassword: enforces 8-16 chars with uppercase and special characters
ok 15 - validateAddress: enforces max 400 characters
ok 16 - validateRating: enforces integer strictly between 1 and 5
1..16
# tests 16 | suites 0 | pass 16 | fail 0 | cancelled 0 | skipped 0 | todo 0
```

### Comprehensive 81-Point QA Audit
To run the end-to-end 81-point verification audit:
```bash
node --env-file=server/.env server/tests/comprehensive_audit.js
# Output: 81 Passed | 0 Failed (100% Accuracy)
```

---

# 23. Deployment Readiness

The application is structured for containerized cloud deployment:

### Frontend
- Configured for **Vite static builds** via `npm --prefix client run build`.
- Generates an optimized production bundle in `client/dist/`.
- Ready for zero-config hosting on **Netlify**, **Vercel**, or **AWS S3 / CloudFront** with SPA redirect rules (`netlify.toml` included).

### Backend
- Runs as a standard Node.js server (`npm --prefix server start`).
- Built-in `server/src/database/connection.js` auto-detects cloud database environments (Railway, Render, AWS RDS) supporting both single `DATABASE_URL` strings and explicit host/user/password variables with SSL support.
- Implements graceful shutdown listeners (`SIGINT`, `SIGTERM`) to release MySQL connection pools cleanly.

---

# 24. Engineering Decisions

### 1. Why MySQL via `mysql2/promise` Connection Pooling?
The application's domain model is strongly relational: Users, Stores, and Ratings have strict 1-to-many and many-to-many relationships. MySQL InnoDB delivers ACID transactions, foreign key cascading, and composite unique constraints. Using direct `mysql2/promise` pooling ensures maximum runtime performance, complete query transparency, and zero ORM overhead or hidden query generation.

### 2. Why Modular Monolith Over Microservices?
For an intern assessment or single cohesive team, a modular monolith provides clean layer boundaries (Routes ➔ Controllers ➔ Services ➔ Repositories) without the operational overhead of microservices (network partitions, distributed tracing, distributed transactions, deployment complexity).

### 3. Why a Dedicated `ratings` Table with Composite Unique Key?
Denormalizing ratings into the store table (e.g. an array or JSON field) leads to race conditions, concurrency bugs, and severe scalability bottlenecks. A dedicated join table with `UNIQUE(userId, storeId)` allows the database engine to atomically guarantee that a user cannot submit duplicate ratings, while allowing effortless `AVG(rating)` aggregations.

### 4. Why `INSERT ... ON DUPLICATE KEY UPDATE` Atomic Upsert?
Rather than executing a non-atomic "check-then-insert" sequence (which is vulnerable to race conditions under concurrent requests), the repository executes an atomic upsert. If the user rates for the first time, it inserts; if they rate again, it modifies their rating in-place within a single atomic database statement.

### 5. Why Backend Authorization is Authoritative?
Frontend button disabling and route redirects are purely user-experience conveniences, not security barriers. Every API endpoint enforces strict token validation (`authenticate`) and role checking (`requireRole`), ensuring malicious HTTP requests (e.g. via cURL or Postman) cannot bypass role constraints.

### 6. Why Vanilla CSS with Design Tokens Over CSS Frameworks?
Writing bespoke Vanilla CSS demonstrates strong foundational mastery of CSS layout, CSS custom properties, responsive design, and CSS specificity without relying on bloated utility-class libraries.

---

# 25. Scalability Considerations

While designed as a lean modular monolith, the application was engineered with a clear future scaling trajectory:

1. **Read Replicas:** Store discovery queries (`GET /api/stores`) can be redirected to MySQL read replicas, reserving the primary master database for rating writes and user registrations.
2. **Caching Strategy:** Frequently accessed store average ratings can be cached in a Redis key-value store, invalidated selectively whenever an atomic upsert occurs on that specific store ID.
3. **Database Indexing:** Composite indexes (`ratings_userId_storeId_key`, `ratings_storeId_idx`, `users_role_idx`) ensure that query execution plans remain index-scans rather than costly full table scans.
4. **Keyset Cursor Pagination:** For datasets exceeding 100,000 records, the REST API can seamlessly transition from offset-based queries to keyset pagination (`WHERE id > :last_seen_id LIMIT 20`).
5. **Horizontal Node.js Scaling:** The Express API server is 100% stateless (session data is contained entirely within the signed JWT). Multiple server instances can run behind an Nginx or AWS Application Load Balancer.

---

# 26. Known Limitations

In the interest of honest engineering evaluation, the following items are intentionally outside the current scope:

1. **No Outgoing SMTP Email Verification:** User signup activates accounts immediately without sending an email confirmation link.
2. **No Password Reset Token Workflow:** Forgotten passwords cannot be reset via email; users must update their password while authenticated.
3. **Numeric Ratings Only (No Written Reviews):** In accordance with assessment instructions, ratings are numerical (1 to 5 stars); text review comments and media uploads are not implemented.
4. **Single Store per Store Owner:** A Store Owner account currently maps to one assigned store entity (`stores.ownerId`). Multi-store franchise ownership is not modeled.

---

# 27. Future Enhancements

The following features represent logical architectural enhancements for future iterations:

- **Store QR Code Generator & Scanner:** Enable store owners to print a store-specific QR code that opens `/stores/:id` with the rating modal pre-activated.
- **Textual Customer Reviews & Review Moderation:** Allow customers to submit written commentary alongside their numeric score, with admin moderation tools.
- **Store Owner Photo Gallery:** Allow owners to upload storefront and menu images.
- **Email Delivery Service:** Integration with AWS SES or SendGrid for account verification and password reset links.
- **Redis Caching Layer:** In-memory caching for store catalog aggregations.

---

# 28. Testing & Quality Checklist

- [x] **Authentication & Sessions**
  - [x] Normal user registration with validation
  - [x] Unified login returning signed JWT
  - [x] 401 Unauthorized on invalid credentials
  - [x] Client-side token storage and authenticated requests
  - [x] In-app password update with current password verification
  - [x] Client logout with session clearance
- [x] **Role-Based Access Control**
  - [x] Administrator access to `/api/admin/*`
  - [x] 403 Forbidden for non-admins accessing admin routes
  - [x] Store Owner dashboard isolated to owned store
  - [x] Store Owners prohibited from rating stores
- [x] **Store Discovery & Ratings**
  - [x] Store catalog displaying Name, Address, and Average Rating
  - [x] Authenticated users see their personal submitted score
  - [x] Real-time dual search across Name and Address
  - [x] Column sorting (Name, Rating)
  - [x] Rating submission (1 to 5 integer)
  - [x] Rating modification without duplicate row creation
- [x] **Administration**
  - [x] Dashboard metrics matching live database counts
  - [x] User provisioning of any role
  - [x] Store provisioning with optional owner assignment
  - [x] Role filtering (`ALL`, `USER`, `ADMIN`, `STORE_OWNER`)
  - [x] Store Owner rows display store rating in admin directory
- [x] **Engineering & Quality**
  - [x] Strict input validation matching exact assessment boundaries
  - [x] Parameterized SQL statements preventing SQL injection
  - [x] Zero cleartext password exposure
  - [x] Responsive UI with Dark and Light mode
  - [x] Comprehensive test suite (16 unit/integration tests passing)
  - [x] 81-point automated QA audit passing (100% accuracy)

---

# 29. Interview Talking Points

### Questions I Can Confidently Answer

1. **Why did you choose a Modular Monolith architecture instead of Microservices?**
   > I chose a Modular Monolith because the domain represents a single cohesive business application. It delivers clean separation of concerns (Routes ➔ Controllers ➔ Services ➔ Repositories) without the network failure modes, distributed transaction complexity, and deployment overhead of microservices.

2. **How does your system prevent a user from submitting multiple ratings for the same store?**
   > Rather than relying on frontend checks, rating uniqueness is enforced at the database engine level through a composite unique index: `UNIQUE KEY (userId, storeId)` on the `ratings` table. In the repository layer, we execute an atomic MySQL `INSERT ... ON DUPLICATE KEY UPDATE` statement. This ensures that duplicate rows are physically impossible and rating modifications are atomic without race conditions.

3. **How is Store Owner access isolated to their own store?**
   > We enforce authorization at the service layer by reading `req.user.id` directly from the cryptographically verified JWT payload. The repository query selects only the store where `ownerId = req.user.id`. The client cannot manipulate an ID parameter to view another owner's confidential review ledger.

4. **How do you calculate and display average ratings?**
   > The average rating is calculated dynamically by aggregating all submitted ratings for a store (`SUM(rating) / COUNT(*)` rounded to one decimal place). Stores with zero ratings display `"No ratings yet"` rather than a misleading `0.0`, preventing new stores from appearing poorly reviewed.

5. **How did you prevent SQL injection without an ORM?**
   > All database operations in the repository layer utilize parameterized prepared statements via `mysql2/promise` (`pool.execute(sql, [params])`). User input is passed strictly as data parameters, never concatenated into SQL query strings.

6. **What was your approach to form validation?**
   > We applied symmetric validation across all three tiers: client-side for immediate user feedback, backend validators (`auth.validator.js`) as the authoritative gatekeeper, and MySQL DDL column definitions (`VARCHAR(60)`, `VARCHAR(400)`) as the final storage guarantee.

---

# 30. Why This Project Demonstrates Engineering Maturity

This codebase reflects the qualities of a thoughtful, production-oriented Full Stack Developer:

- **Precision Over Bloat:** Rather than assembling disconnected third-party libraries, the solution strictly implements the required feature set with precision, high test coverage, and clean architecture.
- **Relational Integrity:** Schema design was treated as a first-class citizen, leveraging InnoDB foreign keys, cascading deletes, and composite unique keys.
- **Security by Default:** Defensive programming is applied everywhere: slow password hashing, stateless JWT verification, rate limiting, and parameterization.
- **Code Readability:** Every module has a single responsibility. Repositories only talk to the database; services only contain business logic; controllers only handle HTTP input and output.
- **Comprehensive Verification:** Backed by 16 automated tests and an 81-point comprehensive audit suite covering every edge case from Phase 0 to Phase 5.
