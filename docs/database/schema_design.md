# Database Schema & Relational Design
 
The database layer runs on **MySQL 8.0** managed via native **InnoDB DDL** and **mysql2** connection pooling.

## Entity Relationship Overview

```
 [User] (1) ─────────── (0..1) [Store] (Store Owner)
   │                             │
   │ (1)                         │ (1)
   │                             │
   ▼ (*)                         ▼ (*)
 [Rating] ────────────────────────┘
 UNIQUE(userId, storeId)
```

## Schema Entities

### 1. `users`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | PRIMARY KEY, UUID | Unique user identifier |
| `name` | VARCHAR(60) | NOT NULL | Full name (20–60 characters) |
| `email` | VARCHAR(255)| NOT NULL, UNIQUE | User email address |
| `password` | VARCHAR(255)| NOT NULL | Bcrypt hashed password |
| `address` | VARCHAR(400)| NOT NULL | Physical address (max 400 chars) |
| `role` | VARCHAR(20) | DEFAULT 'USER' | Role: 'ADMIN', 'USER', 'STORE_OWNER' |
| `createdAt`| DATETIME(3) | DEFAULT NOW(3) | Account creation timestamp |
| `updatedAt`| DATETIME(3) | ON UPDATE NOW(3)| Last modification timestamp |

### 2. `stores`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | PRIMARY KEY, UUID | Unique store identifier |
| `name` | VARCHAR(60) | NOT NULL | Store commercial name (20–60 chars) |
| `email` | VARCHAR(255)| NOT NULL, UNIQUE | Official store email |
| `address` | VARCHAR(400)| NOT NULL | Physical location address |
| `ownerId` | VARCHAR(36) | NULL, FOREIGN KEY | References `users(id)` ON DELETE SET NULL |
| `createdAt`| DATETIME(3) | DEFAULT NOW(3) | Store registration timestamp |
| `updatedAt`| DATETIME(3) | ON UPDATE NOW(3)| Last modification timestamp |

### 3. `ratings`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | PRIMARY KEY, UUID | Unique rating identifier |
| `userId` | VARCHAR(36) | NOT NULL, FOREIGN KEY | References `users(id)` ON DELETE CASCADE |
| `storeId` | VARCHAR(36) | NOT NULL, FOREIGN KEY | References `stores(id)` ON DELETE CASCADE |
| `rating` | INT | NOT NULL (1 to 5) | Customer submitted score |
| `createdAt`| DATETIME(3) | DEFAULT NOW(3) | Timestamp when rating was submitted |
| `updatedAt`| DATETIME(3) | ON UPDATE NOW(3)| Timestamp when rating was updated |

---

## Critical Constraints & Indexes

1. **`UNIQUE KEY ratings_userId_storeId_key (userId, storeId)`**:
   Enforces at the database engine level that no user can have multiple ratings for a single store. Prevents race conditions during concurrent rating submissions.
2. **`INDEX ratings_storeId_idx (storeId)`**:
   Ensures fast aggregate queries (`SUM(rating)`, `COUNT(*)`) when calculating a store's overall average rating.
3. **`INDEX users_role_idx (role)`**:
   Optimizes administrative filtering and role-based counts.
