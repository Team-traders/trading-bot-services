import { Request, Response, Router } from 'express';
import container from '../dependency-injection';
import { CoursesPostController, CreateCourseRequest } from '../controllers/CoursesPostController';
import { CoursesGetController } from '../controllers/CoursesGetController';

export const registerCoursesRoutes = (): Router => {
  const router = Router();
  const coursesPostController: CoursesPostController = container.get(
    'Apps.Backoffice.Backend.controllers.CoursesPostController'
  );
  const coursesGetController = container.get<CoursesGetController>(
    'Apps.Backoffice.Backend.controllers.CoursesGetController'
  );

  router.post('/courses', (req: Request<CreateCourseRequest>, res: Response) => coursesPostController.run(req, res));
  router.get('/courses', (req: Request, res: Response) => coursesGetController.run(req, res));

  return router;
};
