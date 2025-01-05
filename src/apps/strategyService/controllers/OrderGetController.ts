import { Request, Response } from 'express';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { CoursesCounterNotExist } from '../../../Contexts/Mooc/CoursesCounter/domain/CoursesCounterNotExist';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';
import { FindOrdersQuery } from '../../../Contexts/strategyService/orders/domain/queries/FindOrdersQuery';
import { FindAlertsResponse } from '../../../Contexts/alertService/alerts/application/queryHandlers/FindAlertsQueryHandler';


export class OrderGetController implements Controller {
  constructor(
    private queryBus: QueryBus,
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const query = new FindOrdersQuery();
      const alerts = await this.queryBus.ask<FindAlertsResponse>(query);

      res.json(alerts);
    } catch (e) {
      if (e instanceof CoursesCounterNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND);
      } else {
        console.log(e);
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
