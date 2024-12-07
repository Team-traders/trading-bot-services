import { Request, Response, Router } from 'express';
import container from '../dependency-injection';
import StatusController from '../controllers/StatusGetController';

export const registerStatusRoutes = (): Router => {
  const router = Router();
  const controller: StatusController = container.get('Apps.mechoui3.controllers.StatusGetController');
  router.get('/status', (req: Request, res: Response) => controller.run(req, res));

  return router;
};
