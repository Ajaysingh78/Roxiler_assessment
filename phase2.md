# Phase 2: Backend Implementation Strategy & API Layer

## 1. Directory Structure
```
server/
├── prisma/
│   ├── schema.prisma       # Prisma relational schema with models (User, Store, Rating)
│   ├── seed.js             # Initial database seed script (Admin, Store Owner, Users, Stores, Ratings)
│   ├── schema.postgres.sql # Native PostgreSQL DDL script
│   └── schema.mysql.sql    # Native MySQL DDL script
├── src/
│   ├── config/             # Environment, JWT secrets, database connection
│   ├── middleware/
│   │   ├── auth.js         # JWT verification & token extraction
│   │   ├── roles.js        # Role-based authorization guard (ADMIN, USER, STORE_OWNER)
│   │   ├── validator.js    # Express-validator / Joi schema sanitization
│   │   ├── rateLimiter.js  # Brute-force & API protection
│   │   └── errorHandler.js # Global error handler with clean JSON envelope
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── admin.controller.js
│   │   ├── store.controller.js
│   │   ├── rating.controller.js
│   │   └── owner.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── admin.routes.js
│   │   ├── store.routes.js
│   │   ├── rating.routes.js
│   │   └── owner.routes.js
│   ├── utils/
│   │   ├── hash.js         # Bcrypt helpers
│   │   ├── response.js     # Standard response envelope: { success, data, message }
│   │   └── validators.js   # Reusable field validator rules
│   └── server.js           # Express app bootstrap
└── package.json
```

---

## 2. Security Middleware & Defense in Depth
1. **JWT Verification**: Validates the Bearer token in the `Authorization` header, extracts user payload, and attaches `req.user`.
2. **Role Authorization (`requireRole('ADMIN')`)**: Asserts `req.user.role` matches the required privilege level, returning `403 Forbidden` if unauthorized.
3. **Data Validation**: Strict validators enforce name (20-60 chars), password (8-16 with uppercase and special character), address (max 400 chars), email standard regex, and rating range (1-5).
4. **Rate Limiting**: Applied to login and registration endpoints to prevent brute-force attacks.
5. **CORS & Helmet**: Secure headers and cross-origin resource sharing configured for development and production environments.

---

## 3. Database Integrity & Rating Calculation
- Ratings are stored in the `ratings` table with an atomic unique constraint on `(user_id, store_id)`.
- When a user submits a rating:
  - If a rating doesn't exist, create it.
  - If a rating already exists for that user and store, update it (Upsert).
- Store average ratings are dynamically calculated using SQL aggregations `AVG(rating)` and `COUNT(rating)` to guarantee 100% data consistency, rounded to 1 decimal place.
- Store owner ratings are queried by finding the store owned by the user, then computing the average and user listing.
