import { Request, Response, Router } from 'express';
import container from '../dependency-injection';
import { AlertPostController } from '../controllers/AlertPostController';
import { AlertGetController } from '../controllers/AlertGetController';

export const registerAlertsRoutes = (): Router => {
  const router = Router();

  const alertPostController: AlertPostController = container.get(
    'Apps.alertService.controllers.AlertPostController',
  );
  const alertsGetController: AlertGetController = container.get(
    'Apps.alertService.controllers.AlertGetController',
  );

  router.post('/alerts', (req: Request, res: Response) =>
    alertPostController.run(req, res),
  );

  router.get('/alerts', (req: Request, res: Response) =>
    alertsGetController.run(req, res),
  );

  return router;
};
