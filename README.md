# Roxiler Systems — Store Rating Platform

[![Node.js Version](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MySQL%208.0-blue.svg)](https://www.mysql.com/)
[![Driver](https://img.shields.io/badge/Driver-mysql2%20Promise%20Pool-orange.svg)](https://github.com/sidorares/node-mysql2)
[![Frontend](https://img.shields.io/badge/Frontend-React%2019%20+%20Vite-61dafb.svg)](https://react.dev/)
[![Test Suite](https://img.shields.io/badge/Tests-16%20Passing%20(Unit%20%2B%20Integration)-brightgreen.svg)](file:///server/tests)

A production-grade, secure, multi-tenant Store Rating Web Application developed for the **Roxiler Systems Full Stack Developer Coding Assessment**. Engineered following a **Modular Monolithic Architecture** strictly adhering to the technical specification: **React.js frontend**, **Node.js / Express.js backend**, and **direct MySQL access via mysql2 connection pool**.

---

## Table of Contents
1. [Overview & Problem Statement](#overview--problem-statement)
2. [User Roles & Functional Capabilities](#user-roles--functional-capabilities)
3. [Modular Monolithic Architecture](#modular-monolithic-architecture)
4. [Target Project Structure](#target-project-structure)
5. [Request Flow Lifecycle](#request-flow-lifecycle)
6. [Database Design & Schema](#database-design--schema)
7. [Authentication & Authorization](#authentication--authorization)
8. [API Documentation](#api-documentation)
9. [Strict Validation Rules](#strict-validation-rules)
10. [Demo Accounts](#demo-accounts)
11. [Local Setup & Installation](#local-setup--installation)
12. [Automated Testing](#automated-testing)
13. [Key Engineering Decisions](#key-engineering-decisions)
14. [Security Architecture](#security-architecture)
15. [Interview Preparation Guide](#interview-preparation-guide)

---

## Overview & Problem Statement

Modern local commerce relies on transparent customer feedback. The objective of this application is to deliver a centralized, secure platform that enables customers to discover registered retail stores and submit authentic 1 to 5 star ratings. 

The system implements a **unified authentication portal** where three distinct user roles interact according to strict business rules:
- **Normal Users** discover stores and submit/modify their ratings.
- **Store Owners** monitor their store's reputation and review feedback submitted by users.
- **System Administrators** oversee platform operations, manage registries, and monitor global analytics.

The solution intentionally focuses on pure rating workflow excellence—avoiding bloated and out-of-scope e-commerce, shopping carts, or food delivery features.

---

## User Roles & Functional Capabilities

### 1. 🛡️ System Administrator
- **Analytics Dashboard:** Real-time visibility into total registered users, total stores, and total submitted ratings.
- **Store Management:** View, search, sort, and add new stores (with optional store owner assignment).
- **User Management:** View all users with roles (`USER`, `STORE_OWNER`, `ADMIN`), search across Name, Email, Address, and filter by Role.
- **User Details Modal:** Comprehensive profile viewer that automatically displays assigned store information and live average rating if the target user is a `STORE_OWNER`.
- **System Creation:** Create new normal users, store owners, and additional admin users with strict input validation.

### 2. 👤 Normal User
- **Self Registration:** Create an account via a dedicated sign-up page with real-time constraint validation.
- **Store Discovery:** Search stores by Name and Address with debounced real-time queries and column sorting.
- **Rating Submission:** Submit a 1 to 5 star rating for any store.
- **Rating Modification:** Seamlessly update previously submitted ratings (enforced as one rating per user per store).
- **Account Management:** Update account password after logging in.

### 3. 🏪 Store Owner
- **Store Dashboard:** High-level metrics showing the assigned store's average rating, total feedback count, and star distribution breakdown.
- **Customer Feedback Ledger:** Dedicated, sortable, and searchable table listing customers who rated the store (Customer Name, Email, Submitted Rating, Date).
- **Access Isolation:** Strict backend isolation preventing owners from viewing or modifying other stores.
- **Account Management:** Update account password after logging in.

---

## Modular Monolithic Architecture

The application is structured as a **Modular Monolith** with unidirectional flow and strict separation of concerns:

```
React 19 Frontend (SPA)
         │ HTTP / REST (Bearer JWT)
         ▼
Express REST Layer (server/src/app.js)
         │
    Middleware (Rate Limiting, Auth Guard, Role Guard, Error Handler)
         │
       Routes (auth, stores, admin, owner)
         │
     Controllers (HTTP Request Parsing & Response Formatting)
         │
      Services (Business Rules, Rating Aggregation, Ownership Logic)
         │
    Repositories (Database Access Abstraction & Data Access Objects)
         │
    mysql2 Driver (Connection Pool & Parameterized Prepared Statements)
         │ TCP Port 3306
     MySQL 8.0 (ACID InnoDB Relational Database)
```

### Why Modular Monolith Over Microservices?
1. **Zero Distributed Failure Modes:** Eliminates network partitions, distributed transactions, and eventual consistency issues.
2. **High Developer Productivity:** Rapid refactoring, single-repository navigability, and atomic migrations.
3. **Optimized Performance:** In-memory service calls run in ~0ms rather than serial HTTP/gRPC network hops.

---

## Target Project Structure

```
project-root/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   └── common/
│       ├── layouts/
│       │   └── MainLayout.jsx
│       ├── pages/
│       │   ├── auth/ (Login.jsx, Signup.jsx)
│       │   ├── admin/ (AdminDashboard.jsx)
│       │   ├── user/ (StoresList.jsx)
│       │   └── owner/ (OwnerDashboard.jsx)
│       ├── routes/
│       │   └── AppRoutes.jsx
│       ├── services/
│       │   └── api/ (client.js, index.js)
│       ├── hooks/
│       │   └── useDebounce.js
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── ToastContext.jsx
│       ├── constants/
│       │   ├── roles.js
│       │   └── routes.js
│       ├── validations/
│       │   └── auth.validation.js
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── src/
│   │   ├── config/ (prisma.js)
│   │   ├── database/ (connection.js)
│   │   ├── repositories/
│   │   │   ├── user.repository.js
│   │   │   ├── store.repository.js
│   │   │   └── rating.repository.js
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── store.service.js
│   │   │   ├── rating.service.js
│   │   │   ├── admin.service.js
│   │   │   └── owner.service.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── store.controller.js
│   │   │   ├── admin.controller.js
│   │   │   └── owner.controller.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── store.routes.js
│   │   │   ├── admin.routes.js
│   │   │   └── owner.routes.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   ├── validators/
│   │   │   ├── auth.validator.js
│   │   │   ├── store.validator.js
│   │   │   ├── rating.validator.js
│   │   │   └── index.js
│   │   ├── utils/
│   │   │   ├── response.js
│   │   │   ├── password.js
│   │   │   └── jwt.js
│   │   ├── constants/
│   │   │   ├── roles.js
│   │   │   ├── httpStatus.js
│   │   │   └── messages.js
│   │   ├── app.js
│   │   ├── server.js
│   │   └── index.js
│   │
│   ├── tests/
│   │   ├── unit/ (validators.test.js, security.test.js)
│   │   └── integration/ (api.test.js)
│   │
│   ├── package.json
│   └── .env
│
├── database/
│   ├── migrations/ (README.md)
│   ├── seeds/ (sample_data.sql)
│   └── schema.sql
│
├── docs/
│   ├── api/ (endpoints.md)
│   ├── architecture/ (modular_monolith.md)
│   └── database/ (schema_design.md)
│
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

---

## Request Flow Lifecycle

Example: **Rating Submission Workflow**
```
POST /api/stores/:id/ratings
        ↓
Express Router (store.routes.js)
        ↓
Auth Middleware (authenticate → verifies Bearer token)
        ↓
Role Middleware (authorize('USER', 'ADMIN'))
        ↓
Store Controller (submitOrUpdateRating)
        ↓
Rating Service (validates 1-5 range, ensures not STORE_OWNER, recalculates store overall score)
        ↓
Rating Repository (executes atomic upsert via UNIQUE(userId, storeId))
        ↓
MySQL 8.0 Engine (returns updated record)
        ↓
Controller returns HTTP 200 { success: true, data: { ... } }
```

---

## Database Design & Schema

Implemented in MySQL directly using mysql2 connection pool and native schema ([database/schema.sql](file:///c:/Users/Hamada%20Salim%20G-Trd/roxiler_company_assisment/database/schema.sql)).

```
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│              User               │       │              Store              │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│ id        : String (UUID, PK)   │       │ id        : String (UUID, PK)   │
│ name      : VarChar(60)         │1     0│ name      : VarChar(60)         │
│ email     : VarChar(255, UNIQUE)├───────┤ email     : VarChar(255, UNIQUE)│
│ password  : VarChar(255)        │ owns  │ address   : VarChar(400)        │
│ address   : VarChar(400)        │       │ ownerId   : String? (FK, Null)  │
│ role      : VarChar(20)         │       │ createdAt : DateTime            │
│ createdAt : DateTime            │       │ updatedAt : DateTime            │
└──────────────┬──────────────────┘       └──────────────┬──────────────────┘
               │ 1                                       │ 1
               │                                         │
               │ submits                                 │ receives
               │                                         │
               │        ┌─────────────────────────┐      │
               │        │         Rating          │      │
               │        ├─────────────────────────┤      │
               └───────►│ id        : String (PK) │◄─────┘
                      * │ userId    : String (FK) │ *
                        │ storeId   : String (FK) │
                        │ rating    : Int (1 - 5) │
                        │ createdAt : DateTime    │
                        │ updatedAt : DateTime    │
                        ├─────────────────────────┤
                        │ UNIQUE(userId, storeId) │
                        └─────────────────────────┘
```

### Relational Integrity Highlights
1. **Atomic Rating Upsert:** `@@unique([userId, storeId])` guarantees at the database engine level that no user can have duplicate ratings for the same store.
2. **Referential Deletions:**
   - Deleting a User cascades and removes their submitted ratings (`onDelete: Cascade`).
   - Deleting a Store cascades and removes all associated ratings (`onDelete: Cascade`).
   - If a Store Owner is deleted, the Store's `ownerId` is safely nulled (`onDelete: SetNull`) without deleting the business entity.

---

## Authentication & Authorization

- **Stateless Tokens:** JSON Web Tokens (JWT) signed with HMAC-SHA256 (`HS256`) containing `{ id, email, role }` and an expiration period (`24h`).
- **Authorization Guard Middleware:**
  ```javascript
  // server/src/middleware/auth.js
  export const authenticate = ...;      // Verifies Bearer token in Authorization header
  export const authorize = (...roles)   // Rejects requests if req.user.role is not permitted
  ```
- **Owner Access Control:** Endpoints in `/api/owner/*` dynamically resolve the store associated with `req.user.id`. Requests attempting to query or modify other stores receive an immediate `403 Forbidden`.

---

## API Documentation

All responses follow a consistent envelope structure:
```json
{
  "success": true,
  "message": "Operation description",
  "data": { ... }
}
```

### Authentication Endpoints (`/api/auth`)
| Method | Endpoint | Auth | Role | Request Body | Description |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `POST` | `/api/auth/signup` | Public | None | `{ name, email, password, address }` | Register a new Normal User |
| `POST` | `/api/auth/login` | Public | None | `{ email, password }` | Authenticate user & issue JWT |
| `GET` | `/api/auth/me` | Bearer | Any | None | Retrieve authenticated user profile |
| `PUT` | `/api/auth/change-password` | Bearer | Any | `{ currentPassword, newPassword }` | Update user password |

### Store & Rating Endpoints (`/api/stores`)
| Method | Endpoint | Auth | Role | Query / Body | Description |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `GET` | `/api/stores` | Optional | Any | `?search=&sortBy=name&order=asc` | List stores with average & user ratings |
| `GET` | `/api/stores/:id` | Optional | Any | None | Store details with rating breakdown |
| `POST`| `/api/stores/:id/ratings` | Bearer | `USER`,`ADMIN` | `{ rating: 1-5 }` | Submit or modify rating (upsert) |

### Admin Endpoints (`/api/admin`)
| Method | Endpoint | Auth | Role | Query / Body | Description |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `GET` | `/api/admin/dashboard` | Bearer | `ADMIN` | None | Overall metrics (users, stores, ratings) |
| `GET` | `/api/admin/users` | Bearer | `ADMIN` | `?search=&role=&sortBy=&order=` | List users with Store Owner ratings |
| `POST`| `/api/admin/users` | Bearer | `ADMIN` | `{ name, email, password, address, role }` | Create new user of any role |
| `GET` | `/api/admin/stores`| Bearer | `ADMIN` | `?search=&sortBy=&order=` | List stores with owner & rating details |
| `POST`| `/api/admin/stores`| Bearer | `ADMIN` | `{ name, email, address, ownerId? }` | Create new store |

### Store Owner Endpoints (`/api/owner`)
| Method | Endpoint | Auth | Role | Query / Body | Description |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `GET` | `/api/owner/dashboard` | Bearer | `STORE_OWNER` | None | Assigned store metrics & avg rating |
| `GET` | `/api/owner/ratings` | Bearer | `STORE_OWNER` | `?search=&sortBy=&order=` | Ledger of users who rated their store |

---

## Strict Validation Rules

Every rule is enforced on **both frontend and backend**:

| Field | Rule Specification | Client Enforcement | Server Enforcement |
| :--- | :--- | :--- | :--- |
| **Name** | Min 20, Max 60 characters | `maxLength={60}`, real-time counter | `validateName()` rejects `< 20` or `> 60` with HTTP 400 |
| **Address** | Max 400 characters | `maxLength={400}`, counter feedback | `validateAddress()` rejects `> 400` with HTTP 400 |
| **Password** | 8–16 chars, &ge;1 uppercase, &ge;1 special char | Interactive rule checklist UI | `validatePassword()` regex check with HTTP 400 |
| **Email** | Standard email validation | Regex RFC-5322 validation | `validateEmail()` regex check with HTTP 400 |
| **Rating** | Integer between 1 and 5 | Interactive 5-star picker | `validateRating()` rejects non-integers, `< 1`, or `> 5` |

---

## Demo Accounts

The database comes pre-seeded with a comprehensive, realistic demo dataset (60+ users, 15 stores, 110+ ratings) designed to test all platform edge cases:

| Role | Email | Password | Details & Test Scenario |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin.demo@example.com` | `Admin@123` | Primary demo admin for metrics, filtering, and user/store creation |
| **System Admin** | `admin@roxiler.com` | `Admin@123` | Master system administrator |
| **Normal User** | `user.demo@example.com` | `User@123` | **Primary Demo Customer** (has 4 rated stores & 11 unrated stores for testing "Rate" vs "Update Rating") |
| **Store Owner** | `owner.demo@example.com` | `Owner@123` | Owner of *RoyalElegance Ethnic Fashion Boutique* (High Rated: 4.71 ⭐) |
| **Store Owner** | `owner.empty@example.com` | `Owner@123` | Owner of *UrbanNest Living & Furniture Studio* (**Empty State: 0 ratings**) |
| **Store Owner** | `owner.john@freshmart.com` | `Owner@123` | Owner of *FreshHarvest Organic Supermart* (**High Volume: 18 ratings**, 4.67 ⭐) |
| **Store Owner** | `owner.rajesh@technova.com` | `Owner@123` | Owner of *TechNova Digital Electronics Hub* (Medium Rated: 3.56 ⭐) |
| **Store Owner** | `owner.meenakshi@quickbite.com` | `Owner@123` | Owner of *QuickBite Daily Essentials Mart* (**Poorly Rated: 1.89 ⭐**) |
| **Normal User** | `alexandra.turner@example.com` | `User@123` | Additional verified customer account |
| **Normal User** | `christopher.hayes@example.com` | `User@123` | Additional verified customer account |

---

## Local Setup & Installation

### Prerequisites
- Node.js v18+ (v20 Recommended)
- MySQL Server 8.0 running on `localhost:3306`

### 1. Configure Backend Environment
Navigate to `server/` and create `.env` from `.env.example`:
```bash
cd server
copy .env.example .env
```
Edit `DATABASE_URL` with your MySQL credentials:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/roxiler_db"
JWT_SECRET=roxiler_super_secret_jwt_key_2026_evaluation_token
CLIENT_URL=http://localhost:5173
```

### 2. Initialize Database & Seed
```bash
# Seed realistic demo records into MySQL
npm run seed
```

### 3. Start Backend API
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 4. Configure & Start Frontend
In a new terminal window:
```bash
cd client
copy .env.example .env
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## Automated Testing

The backend includes an automated integration test suite covering authentication, RBAC, input validation, rating upserts, and unauthorized access attempts.

Run the test suite:
```bash
cd server
npm test
```

### Test Coverage Summary:
- ✔️ `GET /api/health` returns healthy
- ✔️ `POST /api/auth/login` with valid admin credentials
- ✔️ `POST /api/auth/login` with invalid credentials fails (401)
- ✔️ `POST /api/auth/signup` validation enforces name length (20-60) and password complexity
- ✔️ `POST /api/auth/signup` successful registration creates account
- ✔️ `GET /api/stores` lists stores with overall average ratings
- ✔️ `POST /api/stores/:id/ratings` atomic upsert allows rating creation and modification
- ✔️ `GET /api/admin/dashboard` metrics requires ADMIN role (403 for non-admins)
- ✔️ `GET /api/owner/dashboard` returns store metrics isolated to the store owner

---

## Key Engineering Decisions

### 1. Why MySQL with Prisma ORM?
MySQL provides ACID compliance and robust relational integrity. Prisma provides compile-time type safety, automated query parameterization preventing SQL injection, and smooth migration management.

### 2. Why a Separate `ratings` Table with `UNIQUE(userId, storeId)`?
Storing ratings directly in the stores or users table causes severe denormalization and concurrency problems. A dedicated join entity enforces one rating per user per store at the database engine level via `@@unique([userId, storeId])`, preventing race conditions and duplicate entries.

### 3. How Are Average Ratings Calculated?
Ratings are computed dynamically using SQL aggregation (`sum / count`) rounded to 1 decimal place. When a store has 0 ratings, it explicitly displays `"New"` / `"No ratings yet"`, rather than an inaccurate `0.0` which misleadingly implies negative customer feedback.

### 4. Why Unnecessary Features (QR Codes, Franchises, Food Delivery) Were Excluded
The official specification defines a focused multi-store rating system. Adding food delivery carts, franchise hierarchies, or payment gateways introduces architectural debt and violates the core requirement. Engineering excellence is demonstrated by **completeness, reliability, and precision**.

---

## Security Architecture

1. **Password Hashing:** Passwords are never stored in plaintext. They are salted and hashed using `bcryptjs` with 10 salt rounds.
2. **SQL Injection Immunization:** All database communications utilize Prisma's parameterized prepared statements.
3. **Broken Object Level Authorization (BOLA) Prevention:** Store owners cannot query or modify ratings belonging to stores they do not own.
4. **Denial of Service (DoS) Mitigation:** Express rate limiting (`express-rate-limit`) throttles API requests per IP window.
5. **Secure Headers & CORS:** Configured with `cors` allowing only verified frontend origins.

---

## Interview Preparation Guide

### Q1: Why did you choose this relational database schema?
> **Answer:** The domain contains three clear business entities: Users, Stores, and Ratings. A user can rate many stores, and a store can receive ratings from many users (many-to-many relationship). By modeling `Rating` as an explicit relational entity with foreign keys referencing `User.id` and `Store.id`, we achieve 3NF normalization, avoid redundant data, and maintain full referential integrity.

### Q2: How do you prevent a user from submitting multiple ratings for the same store?
> **Answer:** While frontend UI disabling and backend conditional checks exist, the ultimate source of truth is the database. We enforced a composite unique constraint `@@unique([userId, storeId])` in MySQL. When saving a rating, we use Prisma's atomic `upsert`, which inserts a new record or updates the existing one in a single atomic transaction without race conditions.

### Q3: How do you ensure store owners cannot view other stores' confidential data?
> **Answer:** We never trust IDs provided by the client. In `/api/owner/*` endpoints, the server retrieves `req.user.id` directly from the validated JWT token payload. The query then fetches only the store where `ownerId === req.user.id`. If no store matches, the request is terminated immediately.

### Q4: How is SQL injection prevented?
> **Answer:** All database operations are executed via Prisma ORM, which translates queries into parameterized SQL statements with bound parameters. User inputs are never concatenated directly into raw SQL strings.

### Q5: What happens if the database server goes down?
> **Answer:** The Express server includes a health probe (`/api/health`) and structured try/catch blocks that pass database errors to a centralized error handling middleware. Instead of leaking raw database connection strings or stack traces, the API responds with a sanitized `500 Internal Server Error` and a helpful message, while logging the incident internally.

### Q6: How would you scale this platform to millions of ratings?
> **Answer:** 
> 1. Add read-replicas for MySQL to offload intensive store catalog queries.
> 2. Introduce a Redis cache layer for high-traffic store average ratings, invalidated via cache eviction on rating submission.
> 3. Implement database pagination with keyset cursor pagination (`WHERE id > cursor`) instead of large offset queries.
