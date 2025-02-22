import { Request, Response, Router } from 'express';
import container from '../dependency-injection';
import { OrderPostController } from '../controllers/OrderPostController';
import { OrderGetController } from '../controllers/OrderGetController';
import { OrderDeleteController } from '../controllers/OrderDeleteController';

export const registerOrderRoutes = (): Router => {
  const router = Router();

  const orderPostController: OrderPostController = container.get(
    'Apps.strategyService.controllers.OrderPostController',
  );

  const orderGetController: OrderGetController = container.get(
    'Apps.strategyService.controllers.OrderGetController',
  );

  const orderDeleteController: OrderDeleteController = container.get(
    'Apps.strategyService.controllers.OrderDeleteController',
  );

  router.post('/order', (req: Request, res: Response) =>
    orderPostController.run(req, res),
  );

  router.get('/order', (req: Request, res: Response) =>
    orderGetController.run(req, res),
  );

  router.delete('/order/:id', (req: Request, res: Response) =>
    orderDeleteController.run(req, res),
  );

  return router;
};
