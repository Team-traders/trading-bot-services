import { NextFunction, Request, Response, Router } from 'express';
import container from '../dependency-injection';
import StatusController from '../controllers/StatusGetController';

export const registerStatusRoutes = (): Router => {
  const router = Router();
  const controller: StatusController = container.get(
    'Apps.alertService.controllers.StatusGetController',
  );

  router.get('/status', (req: Request, res: Response, next: NextFunction) =>
    controller.run(req, res, next),
  );

  return router;
};
