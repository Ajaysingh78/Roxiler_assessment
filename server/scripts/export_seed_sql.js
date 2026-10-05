import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, disconnectDatabase } from '../src/database/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function exportSql() {
  const [users] = await pool.query('SELECT * FROM users ORDER BY email ASC');
  const [stores] = await pool.query('SELECT * FROM stores ORDER BY email ASC');
  const [ratings] = await pool.query('SELECT * FROM ratings ORDER BY storeId ASC, userId ASC');

  let sql = `-- ====================================================================
-- Roxiler Systems Store Rating Platform - Production Demo & Seed Dataset
-- Idempotent SQL Insert Script (ON DUPLICATE KEY UPDATE)
-- Database: MySQL (mysql2)
--
-- Passwords:
-- Admin:        Admin@123
-- Store Owners: Owner@123
-- Users:        User@123
-- ====================================================================

USE \`roxiler_db\`;

SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------------------
-- 1. USERS (${users.length} Records: Admins, Store Owners, Normal Users)
-- --------------------------------------------------------------------
`;

  for (const u of users) {
    const escapedName = (u.name || '').replace(/'/g, "\\'");
    const escapedAddr = (u.address || '').replace(/'/g, "\\'");
    sql += `INSERT INTO \`users\` (\`id\`, \`name\`, \`email\`, \`password\`, \`address\`, \`role\`, \`createdAt\`, \`updatedAt\`)
VALUES ('${u.id}', '${escapedName}', '${u.email}', '${u.password}', '${escapedAddr}', '${u.role}', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE \`name\` = VALUES(\`name\`), \`role\` = VALUES(\`role\`), \`address\` = VALUES(\`address\`);\n\n`;
  }

  sql += `-- --------------------------------------------------------------------
-- 2. STORES (${stores.length} Records Across India & Varied Categories)
-- --------------------------------------------------------------------
`;

  for (const s of stores) {
    const escapedName = (s.name || '').replace(/'/g, "\\'");
    const escapedAddr = (s.address || '').replace(/'/g, "\\'");
    const ownerVal = s.ownerId ? `'${s.ownerId}'` : 'NULL';
    sql += `INSERT INTO \`stores\` (\`id\`, \`name\`, \`email\`, \`address\`, \`ownerId\`, \`createdAt\`, \`updatedAt\`)
VALUES ('${s.id}', '${escapedName}', '${s.email}', '${escapedAddr}', ${ownerVal}, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE \`name\` = VALUES(\`name\`), \`address\` = VALUES(\`address\`), \`ownerId\` = VALUES(\`ownerId\`);\n\n`;
  }

  sql += `-- --------------------------------------------------------------------
-- 3. RATINGS (${ratings.length} Varied Ratings: Realistic Distributions & No Duplicates)
-- --------------------------------------------------------------------
`;

  for (const r of ratings) {
    sql += `INSERT INTO \`ratings\` (\`id\`, \`userId\`, \`storeId\`, \`rating\`, \`createdAt\`, \`updatedAt\`)
VALUES ('${r.id}', '${r.userId}', '${r.storeId}', ${r.rating}, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE \`rating\` = VALUES(\`rating\`);\n\n`;
  }

  sql += `SET FOREIGN_KEY_CHECKS = 1;\n`;

  const destPath = path.resolve(__dirname, '../../database/seeds/sample_data.sql');
  fs.writeFileSync(destPath, sql, 'utf8');
  console.log(`Successfully exported ${users.length} users, ${stores.length} stores, ${ratings.length} ratings to: ${destPath}`);
}

exportSql()
  .catch(console.error)
  .finally(async () => {
    await disconnectDatabase();
  });
