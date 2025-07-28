import { LoggerPort } from '../../../../Shared/domain/Logger';
import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { AlertRepository } from '../../domain/AlertRepository';
import { FindAlertsQuery } from '../../domain/queries/FindAlertsQuery';
export type FindAlertsResponse = {
  _id: string;
  symbol: string;
  linkedOrderId: string | null;
  alertType: string;
  alertPrice: number;
  triggerCondition: string;
  status: string;
  title: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
};

export class FindAlertsQueryHandler
  implements QueryHandler<FindAlertsQuery, FindAlertsResponse[]>
{
  constructor(
    private alertRepo: AlertRepository,
    private logger: LoggerPort,
  ) {}

  subscribedTo(): Query {
    return FindAlertsQuery;
  }

  async handle(_query: FindAlertsQuery): Promise<FindAlertsResponse[]> {
    this.logger.info(`"FindAlertsQueryHandler : " ${_query}`);
    try {
      const alerts = await this.alertRepo.find();
      return alerts.map((alert) => alert.toPrimitives());
    } catch (error) {
      console.log('FindAlertsQueryHandler :');
      console.log(error);
      return [];
    }
  }
}
