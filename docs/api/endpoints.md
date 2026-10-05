# API Endpoints Specification

Base URL: `http://localhost:5000/api`

## Response Format
Every response returned by the API follows this standardized JSON envelope:

### Success Response
```json
{
  "success": true,
  "message": "Operation description",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Human readable error summary",
  "errors": {
    "field": "Specific validation failure explanation"
  }
}
```

---

## Authentication (`/api/auth`)

### 1. `POST /api/auth/signup`
- **Access:** Public
- **Description:** Register a new normal user account.
- **Payload:**
  ```json
  {
    "name": "Samantha Jacqueline Abernathy",
    "email": "samantha@example.com",
    "password": "Password@123",
    "address": "123 Elm Street, Cityville"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Account registered successfully",
    "data": {
      "user": { "id": "...", "name": "...", "email": "...", "role": "USER" },
      "token": "eyJhbGciOiJIUzI1Ni..."
    }
  }
  ```

### 2. `POST /api/auth/login`
- **Access:** Public
- **Description:** Authenticate using email and password to receive a JWT.
- **Payload:**
  ```json
  {
    "email": "admin@roxiler.com",
    "password": "Admin@123"
  }
  ```
- **Response (200 OK):** Returns `{ user, token }`.

### 3. `PUT /api/auth/change-password`
- **Access:** Authenticated (`Bearer <token>`)
- **Description:** Change password for the current user.
- **Payload:**
  ```json
  {
    "currentPassword": "OldPassword@123",
    "newPassword": "NewPassword@456"
  }
  ```

---

## Stores & Ratings (`/api/stores`)

### 1. `GET /api/stores`
- **Access:** Public (Optional auth adds `userSubmittedRating`)
- **Query Parameters:**
  - `search` (string): Search filter matching name or address.
  - `sortBy` (string): `name`, `address`, `overallRating`, `createdAt` (default: `name`).
  - `order` (string): `asc` or `desc` (default: `asc`).

### 2. `POST /api/stores/:id/ratings`
- **Access:** Authenticated (`USER`, `ADMIN`)
- **Description:** Submit or update a 1 to 5 star rating (atomic upsert).
- **Payload:**
  ```json
  {
    "rating": 5
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Rating saved successfully",
    "data": {
      "rating": { "id": "...", "userId": "...", "storeId": "...", "rating": 5 },
      "storeOverallRating": 4.8,
      "totalRatings": 12
    }
  }
  ```

---

## Admin Portal (`/api/admin`)
Requires `Authorization: Bearer <token>` where `user.role === 'ADMIN'`.

### 1. `GET /api/admin/dashboard`
Returns platform metrics:
```json
{
  "totalUsers": 7,
  "totalStores": 5,
  "totalRatings": 11,
  "roles": { "ADMIN": 1, "USER": 4, "STORE_OWNER": 2 }
}
```

### 2. `GET /api/admin/users`
Returns all users with search, role filtering, and dynamic store rating calculation for store owners.

### 3. `POST /api/admin/users`
Creates a user with explicit role (`USER`, `STORE_OWNER`, `ADMIN`).

### 4. `POST /api/admin/stores`
Creates a new store and optionally assigns a verified `STORE_OWNER` user.

---

## Store Owner Portal (`/api/owner`)
Requires `Authorization: Bearer <token>` where `user.role === 'STORE_OWNER'`.

### 1. `GET /api/owner/dashboard`
Returns the assigned store details, average rating, total ratings, and rating breakdown.

### 2. `GET /api/owner/ratings`
Returns the ledger of customer ratings with search and sorting capabilities.
