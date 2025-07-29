import { Request, Response } from 'express';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { CoursesCounterNotExist } from '../../../Contexts/Mooc/CoursesCounter/domain/CoursesCounterNotExist';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';
import { FindAlertsQuery } from '../../../Contexts/alertService/alerts/domain/queries/FindAlertsQuery';
import { EventBus } from '../../../Contexts/Shared/domain/EventBus';
import { FindAlertsResponse } from '../../../Contexts/alertService/alerts/application/queryHandlers/FindAlertsQueryHandler';
import { PriceUpdateDomainEvent } from '../../../Contexts/pricingService/domain/PriceUpdateEvent';
import { LoggerPort } from '../../../Contexts/Shared/domain/Logger';

export class AlertGetController implements Controller {
  constructor(
    private queryBus: QueryBus,
    private eventBus: EventBus,
    private logger: LoggerPort,
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      this.logger.info(`"AlertGetController : " ${req.body}`);
      const query = new FindAlertsQuery();
      await this.eventBus.publish([
        new PriceUpdateDomainEvent({
          aggregateId: 'event-aggregate-id',
          data: [
            {
              symbol: 'BTC/USDT',
              price: 45000.0,
            },
          ],
          occurredOn: new Date(),
          eventId: 'fake-event-id',
        }),
      ]);

      const alerts = await this.queryBus.ask<FindAlertsResponse>(query);

      res.json(alerts);
    } catch (e) {
      if (e instanceof CoursesCounterNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND);
      } else {
        this.logger.error(`"AlertGetController : " ${e}`);
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
