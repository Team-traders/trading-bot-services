import { NextFunction, Request, Response } from 'express';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { Controller } from './Controller';

export default class StatusGetController implements Controller {
  async run(req: Request, res: Response, next: NextFunction) {
    try {
      //throw new Error('error');
      res.status(httpStatus.OK).send();
    } catch (error) {
      next(error);
    }
  }
}
