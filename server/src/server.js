import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { checkDatabaseConnection, initializeDatabase, disconnectDatabase } from './database/connection.js';

const PORT = process.env.PORT || 5000;

export async function startServer() {
  try {
    // Verify database connectivity
    await checkDatabaseConnection();
    await initializeDatabase();
    console.log('Database connected and initialized successfully.');

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Roxiler API Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    const handleShutdown = async (signal) => {
      console.log(`\nReceived ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await disconnectDatabase();
        console.log('Server and database connections closed cleanly.');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => handleShutdown('SIGINT'));
    process.on('SIGTERM', () => handleShutdown('SIGTERM'));

    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start server if executed directly
if (import.meta.url === `file://${process.argv[1]}`.replace(/\\/g, '/')) {
  startServer();
}
