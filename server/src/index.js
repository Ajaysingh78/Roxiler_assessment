import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import prisma from './config/prisma.js';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    // Verify database connectivity
    await prisma.$connect();
    console.log('Database connected successfully.');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Roxiler API Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
