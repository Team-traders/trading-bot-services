export default interface Logger {
  debug(message: string): void;
  error(message: string | Error): void;
  info(message: string): void;
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LoggerPort {
  debug(message: string, metadata?: Record<string, unknown>): void;
  info(message: string, metadata?: Record<string, unknown>): void;
  warn(message: string, metadata?: Record<string, unknown>): void;
  error(
    message: string,
    error?: Error,
    metadata?: Record<string, unknown>,
  ): void;

  // Context and correlation ID
  withContext(context: string): LoggerPort;
  withCorrelationId(correlationId: string): LoggerPort;
}
