import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Determine the environment
export const NODE_ENV = process.env.NODE_ENV || 'development';

// Load environment variables from .env file
dotenv.config();

// Load environment-specific .env file
const envPath = path.join(__dirname, `../../config/${NODE_ENV}.env`);
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Define configuration interface
interface Config {
  env: string;
  port: number;
  database: {
    url: string;
  };
  cors: {
    origin: string | string[];
  };
  logLevel: string;
}

// Parse environment variables
const parseEnvArray = (value: string | undefined, defaultValue: string[] = []): string[] => {
  if (!value) return defaultValue;
  return value.split(',').map(item => item.trim());
};

// Configuration object
const config: Config = {
  env: NODE_ENV,
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/portfolio?schema=public',
  },
  cors: {
    origin: process.env.CORS_ORIGIN ? parseEnvArray(process.env.CORS_ORIGIN) : '*',
  },
  logLevel: process.env.LOG_LEVEL || (NODE_ENV === 'production' ? 'info' : 'debug'),
};

export default config;