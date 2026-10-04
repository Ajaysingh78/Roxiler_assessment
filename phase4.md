# Phase 4: Integration, Security & Performance Engineering

## 1. Security Engineering & OWASP Compliance
1. **Password Security**: Bcrypt with 10 salt rounds. Never log or return password hashes.
2. **Authentication**: Signed JSON Web Tokens with standard expiration (24h).
3. **Authorization & RBAC**: Strict role checks on all administrative and store owner endpoints.
4. **Input Sanitization & Validation**:
   - Name: `20 <= length <= 60`
   - Address: `length <= 400`
   - Password: `8 <= length <= 16`, contains `[A-Z]` and `[!@#$%^&*(),.?":{}|<>]`
   - Email: RFC 5322 compliant regex.
   - Rating: Integer between 1 and 5.
5. **CORS & Headers**: Configured CORS origin restrictions and security headers.
6. **Data Integrity**: Enforce atomic database transactions and composite unique constraints on `(user_id, store_id)`.

---

## 2. Performance Engineering
1. **SQL Aggregations**: Compute average ratings and counts directly in the database engine using `AVG(rating)` and `COUNT(*)`, preventing N+1 application-level queries.
2. **Database Indexing**:
   - B-tree index on `users.email` (unique lookup).
   - Index on `stores.name`, `stores.address`, and `stores.owner_id`.
   - Compound index on `ratings(store_id, rating)` and unique index on `ratings(user_id, store_id)`.
3. **Frontend Bundle Optimization**: Code-splitting with Vite, asset minification, and zero unnecessary heavy UI libraries.

---

## 3. Database Portability & Migration Scripts
- **Prisma Schema**: Core schema definition with models.
- **SQLite Engine**: Pre-configured out of the box for instant zero-dependency testing, evaluation, and CI.
- **PostgreSQL & MySQL DDL Scripts**: Included in `server/prisma/schema.postgres.sql` and `server/prisma/schema.mysql.sql` for enterprise deployment in PostgreSQL and MySQL production environments.
