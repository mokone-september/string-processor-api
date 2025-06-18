import winston from 'winston';
import fs from 'fs';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

// Ensure logs directory exists
const logDir = path.resolve('logs');
if (isProduction && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define common log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const logger = winston.createLogger({
  level: isProduction ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    ...(isProduction
      ? [
          new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
          }),
          new winston.transports.File({
            filename: path.join(logDir, 'combined.log'),
          }),
        ]
      : []),
  ],
});

export default logger;
