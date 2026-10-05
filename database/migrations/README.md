# Database Schema & Migrations

This project uses native **MySQL 8.0 DDL statements** with automated table initialization and idempotent seeding.

### Schema Definition
The source of truth for the database schema is located at:
- `database/schema.sql`

### Zero-Manual-Migration Auto Initialization
Upon server boot, `server/src/database/connection.js` automatically executes `CREATE TABLE IF NOT EXISTS` for all required tables (`users`, `stores`, `ratings`) with all required indexes and foreign keys. This guarantees seamless, zero-config startup on local machines and cloud platforms (such as Railway).

### Manual Schema Initialization (Optional)
To manually execute the schema directly against MySQL:
```bash
mysql -u root -p roxiler_db < database/schema.sql
```

### Seeding Demo Data
To populate the database with comprehensive, realistic demo accounts, stores, and ratings:
```bash
cd server
npm run seed
```
Or from the root directory:
```bash
npm run seed
```
