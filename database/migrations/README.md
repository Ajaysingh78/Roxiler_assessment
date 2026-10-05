# Database Migrations

This project uses **Prisma Migrate** for declarative schema management and migrations against **MySQL 8.0**.

### Schema Definition
The source of truth for the database schema is located at:
- `server/prisma/schema.prisma`

### Synchronizing Schema to MySQL
To push schema changes to the MySQL database:
```bash
cd server
npm run prisma:push
```

### Generating Prisma Client
```bash
cd server
npm run prisma:generate
```

### Seeding Data
```bash
cd server
npm run prisma:seed
```
