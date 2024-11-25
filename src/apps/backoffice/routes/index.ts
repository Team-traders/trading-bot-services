import { Router } from 'express';
import { registerStatusRoutes } from './status.route';
import { registerCoursesRoutes } from './courses.route';

export function registerRoutes(): Router {
  const router = Router();
  router.use(registerCoursesRoutes());
  router.use(registerStatusRoutes());

  return router;
}
