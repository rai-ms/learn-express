import app from './app';
import config from './config';
import { logger } from './utils/logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const server = app.listen(config.port, () => {
  logger.info(`Server is running in ${config.env} mode on port ${config.port}`);
});

// Graceful shutdown helper
const shutdown = async (signal: string) => {
  logger.info(`${signal} received. Shutting down gracefully...`);
  try {
    await prisma.$disconnect();
    logger.info('Prisma disconnected');
  } catch (err) {
    logger.error(`Error during Prisma disconnect: ${err}`);
  }
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  shutdown('unhandledRejection');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  shutdown('uncaughtException');
});

// Handle termination signals
['SIGTERM', 'SIGINT'].forEach((signal) => {
  process.on(signal, () => shutdown(signal));
});
