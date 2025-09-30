"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Determine the environment
exports.NODE_ENV = process.env.NODE_ENV || 'development';
// Load environment variables from .env file
dotenv_1.default.config();
// Load environment-specific .env file
const envPath = path_1.default.join(__dirname, `../../config/${exports.NODE_ENV}.env`);
if (fs_1.default.existsSync(envPath)) {
    dotenv_1.default.config({ path: envPath });
}
// Parse environment variables
const parseEnvArray = (value, defaultValue = []) => {
    if (!value)
        return defaultValue;
    return value.split(',').map(item => item.trim());
};
// Configuration object
const config = {
    env: exports.NODE_ENV,
    port: parseInt(process.env.PORT || '3000', 10),
    database: {
        url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/portfolio?schema=public',
    },
    cors: {
        origin: process.env.CORS_ORIGIN ? parseEnvArray(process.env.CORS_ORIGIN) : '*',
    },
    logLevel: process.env.LOG_LEVEL || (exports.NODE_ENV === 'production' ? 'info' : 'debug'),
};
exports.default = config;
