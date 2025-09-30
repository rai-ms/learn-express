"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./utils/logger");
const prisma_1 = __importDefault(require("./utils/prisma"));
const server = app_1.default.listen(config_1.default.port, () => {
    logger_1.logger.info(`Server is running in ${config_1.default.env} mode on port ${config_1.default.port}`);
});
// Graceful shutdown helper
const shutdown = async (signal) => {
    logger_1.logger.info(`${signal} received. Shutting down gracefully...`);
    try {
        await prisma_1.default.$disconnect();
        logger_1.logger.info('Prisma disconnected');
    }
    catch (err) {
        logger_1.logger.error(`Error during Prisma disconnect: ${err}`);
    }
    server.close(() => {
        logger_1.logger.info('Server closed');
        process.exit(0);
    });
};
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger_1.logger.error(`Unhandled Rejection: ${err.message}`);
    shutdown('unhandledRejection');
});
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger_1.logger.error(`Uncaught Exception: ${err.message}`);
    shutdown('uncaughtException');
});
// Handle termination signals
['SIGTERM', 'SIGINT'].forEach((signal) => {
    process.on(signal, () => shutdown(signal));
});
