import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Database Connection Module
 * Encapsulates MySQL connection pool using mysql2/promise
 * Supports standard DATABASE_URL as well as Railway-provided MYSQL_* variables
 */
function getPoolConfig() {
  let databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_PRIVATE_URL || process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL;

  if (databaseUrl) {
    databaseUrl = databaseUrl.trim().replace(/^["']|["']$/g, '');
    const masked = databaseUrl.replace(/:[^:@]+@/, ':***@');
    console.log(`Connecting to database at: ${masked}`);
    try {
      const url = new URL(databaseUrl);
      const isRemote = url.hostname !== 'localhost' && url.hostname !== '127.0.0.1' && url.hostname !== '::1';
      const sslParam = url.searchParams.get('ssl') || url.searchParams.get('sslmode');

      // Automatically configure SSL for cloud-hosted MySQL databases (Railway, Aiven, TiDB, etc.)
      const ssl = sslParam === 'false' || sslParam === 'disable'
        ? undefined
        : (isRemote || sslParam ? { rejectUnauthorized: false } : undefined);

      return {
        host: url.hostname || 'localhost',
        port: parseInt(url.port || '3306', 10),
        user: decodeURIComponent(url.username || 'root'),
        password: decodeURIComponent(url.password || ''),
        database: url.pathname.replace(/^\//, '') || process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || 'roxiler_db',
        ssl,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
      };
    } catch {
      return {
        uri: databaseUrl,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      };
    }
  }

  // Fallback to explicit environment variables (e.g. Railway's native MYSQLHOST, MYSQLUSER, etc.)
  const host = process.env.DB_HOST || process.env.MYSQLHOST || 'localhost';
  const isRemoteHost = host !== 'localhost' && host !== '127.0.0.1' && host !== '::1';

  return {
    host,
    port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT || '3306', 10),
    user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD || '',
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || 'roxiler_db',
    ssl: isRemoteHost ? { rejectUnauthorized: false } : undefined,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  };
}

export const pool = mysql.createPool(getPoolConfig());

/**
 * Verify MySQL database connectivity
 */
export const checkDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error) {
    if (!process.env.DATABASE_URL && !process.env.MYSQL_URL && !process.env.MYSQLHOST && !process.env.DB_HOST) {
      console.error('\n⚠️ [DEPLOYMENT WARNING]: No DATABASE_URL or Railway MySQL variables found!');
      console.error('In a cloud container, "localhost:3306" does NOT exist.');
      console.error('Please configure DATABASE_URL or link your MySQL service in your Railway dashboard.\n');
    }
    console.error('MySQL database connection failed:', error.message || error);
    throw error;
  }
};

/**
 * Automatically create tables if they do not exist
 * Guarantees zero-manual-migration startup on fresh cloud databases (e.g. Railway)
 */
export const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(191) NOT NULL,
        name VARCHAR(60) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        address VARCHAR(400) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'USER',
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        PRIMARY KEY (id),
        UNIQUE KEY users_email_key (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS stores (
        id VARCHAR(191) NOT NULL,
        name VARCHAR(60) NOT NULL,
        email VARCHAR(255) NOT NULL,
        address VARCHAR(400) NOT NULL,
        ownerId VARCHAR(36) NULL,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        PRIMARY KEY (id),
        UNIQUE KEY stores_email_key (email),
        KEY stores_ownerId_fkey (ownerId),
        CONSTRAINT stores_ownerId_fkey FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ratings (
        id VARCHAR(191) NOT NULL,
        userId VARCHAR(191) NOT NULL,
        storeId VARCHAR(191) NOT NULL,
        rating INT NOT NULL,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        PRIMARY KEY (id),
        UNIQUE KEY ratings_userId_storeId_key (userId, storeId),
        KEY ratings_storeId_fkey (storeId),
        CONSTRAINT ratings_storeId_fkey FOREIGN KEY (storeId) REFERENCES stores (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT ratings_userId_fkey FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
  } catch (error) {
    console.error('Database auto-initialization error:', error.message || error);
  }
};

/**
 * Graceful MySQL pool shutdown
 */
export const disconnectDatabase = async () => {
  await pool.end();
};

export default pool;
