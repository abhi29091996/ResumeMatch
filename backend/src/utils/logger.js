// sharepoint-to-s3-sync/src/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = logger;