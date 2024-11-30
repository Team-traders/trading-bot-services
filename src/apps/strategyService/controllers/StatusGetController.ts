import { Request, Response } from 'express';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { Controller } from './Controller';

export default class StatusGetController implements Controller {
  async run(req: Request, res: Response) {
    res.status(httpStatus.OK).send();
  }
}
