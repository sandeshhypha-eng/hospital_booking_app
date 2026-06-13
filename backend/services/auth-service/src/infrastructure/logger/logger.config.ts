import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';

export const loggerConfig = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, context }) => {
          return `[${timestamp}] ${level}: [${context || 'App'}] ${message}`;
        }),
      ),
    }),
  ],
});
