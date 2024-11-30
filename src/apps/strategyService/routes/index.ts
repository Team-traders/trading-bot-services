import { Router, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { registerStatusRoutes } from './status.route';
import { registerCoursesCounterRoutes } from './courses-counter.route';
import { registerCoursesRoutes } from './courses.route';

export function registerRoutes(): Router {
  const router = Router();
  router.use(registerStatusRoutes());
  router.use(registerCoursesCounterRoutes());
  router.use(registerCoursesRoutes());

  return router;
}

export function validateReqSchema(req: Request, res: Response, next: Function) {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const errors = validationErrors.array().map((err: ValidationError) => ({ [err.type]: err.msg }));

  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    errors
  });
}
