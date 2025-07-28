import winston from 'winston';
import { LoggerPort } from '../domain/Logger';
import { CorrelationIdService } from '../infrastructure/CorrelationIdService';

export class WinstonLoggerAdapter implements LoggerPort {
  private readonly logger: winston.Logger;
  private context?: string;
  private correlationId?: string;

  constructor(private readonly correlationIdService: CorrelationIdService) {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format((info) => {
          // Add correlation ID and context to every log
          info.correlationId =
            this.correlationId || this.correlationIdService.getCorrelationId();
          info.context = this.context;
          return info;
        })(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      ],
    });
  }

  debug(message: string, metadata?: Record<string, unknown>): void {
    this.logger.debug(message, { ...metadata });
  }

  info(message: string, metadata?: Record<string, unknown>): void {
    this.logger.info(message, { ...metadata });
  }

  warn(message: string, metadata?: Record<string, unknown>): void {
    this.logger.warn(message, { ...metadata });
  }

  error(
    message: string,
    error?: Error,
    metadata?: Record<string, unknown>,
  ): void {
    this.logger.error(message, { error, ...metadata });
  }

  withContext(context: string): LoggerPort {
    const newLogger = new WinstonLoggerAdapter(this.correlationIdService);
    newLogger.context = context;
    newLogger.correlationId =
      this.correlationId || this.correlationIdService.getCorrelationId();
    return newLogger;
  }

  withCorrelationId(correlationId: string): LoggerPort {
    const newLogger = new WinstonLoggerAdapter(this.correlationIdService);
    newLogger.correlationId = correlationId;
    newLogger.context = this.context;
    return newLogger;
  }
}
