import { Request, Response } from 'express';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { CoursesCounterNotExist } from '../../../Contexts/Mooc/CoursesCounter/domain/CoursesCounterNotExist';
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';
import { FindAlertsQuery } from '../../../Contexts/alertService/alerts/domain/queries/FindAlertsQuery';
import { FindAlertsResponse } from '../../../Contexts/alertService/alerts/domain/queryHandlers/FindAlertsQueryHandler';
import { EventBus } from '../../../Contexts/Shared/domain/EventBus';
import { AlertTriggeredDomainEvent } from '../../../Contexts/alertService/alerts/domain/AlertDomainEvent';
import { CourseCreatedDomainEvent } from '../../../Contexts/Mooc/Courses/domain/CourseCreatedDomainEvent';

export class AlertGetController implements Controller {
  constructor(
    private queryBus: QueryBus,
    private eventBus: EventBus,
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const query = new FindAlertsQuery();
      console.log('eventbus : ', this.eventBus);
      await this.eventBus.publish([
        new AlertTriggeredDomainEvent({
          aggregateId: '12345-aggregate-id',
          orderId: '67890-order-id',
          symbol: 'BTC-USDT',
          alertType: 'take-profit', // or 'stop-loss', 'entry'
          alertPrice: 45000.5,
          timestamp: new Date().toISOString(),
          eventId: 'abcde-event-id', // optional, can be auto-generated
          occurredOn: new Date(), // optional, can default to now
        }),
        new CourseCreatedDomainEvent({
          aggregateId: 'course-12345',
          name: 'Introduction to Domain-Driven Design',
          duration: '10 weeks',
          eventId: 'event-98765', // optional, can be auto-generated
          occurredOn: new Date(), // optional, defaults to now if not provided
        }),
      ]);

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
