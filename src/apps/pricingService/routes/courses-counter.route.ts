import { Request, Response, Router } from 'express';
import container from '../dependency-injection';
import { CoursesCounterGetController } from '../controllers/CoursesCounterGetController';

export const registerCoursesCounterRoutes = (): Router => {
  const router = Router();
  const coursesCounterGetController: CoursesCounterGetController = container.get(
    'Apps.mechoui3.controllers.CoursesCounterGetController'
  );
  router.get('/courses-counter', (req: Request, res: Response) => coursesCounterGetController.run(req, res));

  return router;
};
