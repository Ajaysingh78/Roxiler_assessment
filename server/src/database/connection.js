import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Database Connection Module
 * Encapsulates MySQL connection pool using mysql2/promise
 */
function getPoolConfig() {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    try {
      const url = new URL(databaseUrl);
      const isRemote = url.hostname !== 'localhost' && url.hostname !== '127.0.0.1' && url.hostname !== '::1';
      const sslParam = url.searchParams.get('ssl') || url.searchParams.get('sslmode');

      // Automatically configure SSL for cloud-hosted MySQL databases (Aiven, Railway, TiDB, Clever Cloud)
      const ssl = sslParam === 'false' || sslParam === 'disable'
        ? undefined
        : (isRemote || sslParam ? { rejectUnauthorized: false } : undefined);

      return {
        host: url.hostname || 'localhost',
        port: parseInt(url.port || '3306', 10),
        user: decodeURIComponent(url.username || 'root'),
        password: decodeURIComponent(url.password || ''),
        database: url.pathname.replace(/^\//, '') || 'roxiler_db',
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

  // Fallback to explicit environment variables
  const host = process.env.DB_HOST || 'localhost';
  const isRemoteHost = host !== 'localhost' && host !== '127.0.0.1';

  return {
    host,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'roxiler_db',
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
    if (!process.env.DATABASE_URL && !process.env.DB_HOST) {
      console.error('\n⚠️ [DEPLOYMENT WARNING]: No DATABASE_URL or DB_HOST found in Environment Variables!');
      console.error('In a cloud container (Render, Railway, Docker, etc.), "localhost:3306" does NOT exist inside the container.');
      console.error('Please configure DATABASE_URL in your cloud platform dashboard (Environment Variables settings).\n');
    }
    console.error('MySQL database connection failed:', error.message || error);
    throw error;
  }
};

/**
 * Graceful MySQL pool shutdown
 */
export const disconnectDatabase = async () => {
  await pool.end();
};

export default pool;
