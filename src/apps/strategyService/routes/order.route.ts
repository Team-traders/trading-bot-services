import { Request, Response, Router } from 'express';
import container from '../dependency-injection';
import { OrderPostController } from '../controllers/OrderPostController';
import { OrderGetController } from '../controllers/OrderGetController';

export const registerOrderRoutes = (): Router => {
  const router = Router();

  const orderPostController: OrderPostController = container.get(
    'Apps.strategyService.controllers.OrderPostController',
  );

  const orderGetController: OrderGetController = container.get(
    'Apps.strategyService.controllers.OrderGetController',
  );

  router.post('/order', (req: Request, res: Response) =>
    orderPostController.run(req, res),
  );

  router.get('/order', (req: Request, res: Response) =>
    orderGetController.run(req, res),
  );

  return router;
};
