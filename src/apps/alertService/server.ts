import * as Sentry from '@sentry/node';
import express, { Request, Response, Router } from 'express';
import helmet from 'helmet';
import * as http from 'http';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { registerRoutes } from './routes';
import container from './dependency-injection';
import { CorrelationIdService } from '../../Contexts/Shared/infrastructure/CorrelationIdService';

export class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: http.Server;
  private correlationIdService: CorrelationIdService;

  constructor(port: string) {
    this.port = port;
    this.correlationIdService = container.get<CorrelationIdService>(
      'AlertService.Shared.domain.CorrelationIdService',
    );
    this.express = express();
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    const router = Router();

    // Middleware to set correlation ID for each HTTP request
    router.use((req, _res, next) => {
      // Get correlation ID from header, or generate a new one
      const correlationId =
        (req.headers['x-correlation-id'] as string) ||
        this.correlationIdService.generateCorrelationId();

      // Run the entire request within this correlation ID context
      this.correlationIdService.runWithCorrelationId(correlationId, () => {
        req.headers['x-correlation-id'] = correlationId;
        next();
      });
    });
    router.use(registerRoutes());
    this.express.use(router);

    Sentry.setupExpressErrorHandler(this.express);

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      Sentry.captureException(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `  Alert Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`,
        );
        console.log('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
