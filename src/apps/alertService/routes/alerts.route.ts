import { Request, Response, Router } from 'express';
import container from '../dependency-injection';
import { AlertPostController } from '../controllers/AlertPostController';

export const registerAlertsRoutes = (): Router => {
  const router = Router();

  const alertPostController: AlertPostController = container.get(
    'Apps.alertService.controllers.AlertPostController',
  );

  router.post('/alerts', (req: Request, res: Response) =>
    alertPostController.run(req, res),
  );

  return router;
};
