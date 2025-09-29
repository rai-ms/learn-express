import winston from 'winston';
import config from '../config';

const { combine, timestamp, printf, colorize, align } = winston.format;

const logger = winston.createLogger({
  level: config.logLevel,
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }),
    colorize({ all: true }),
    align(),
    printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
    )
  ),
  transports: [
    // Write all logs with level `error` and below to `error.log`
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Write all logs to `combined.log`
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
  exitOnError: false,
});

// If we're not in production then log to the `console`
if (config.env !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    })
  );
}

export { logger };
