import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { AlertRepository } from '../AlertRepository';
import { FindAlertsQuery } from '../queries/FindAlertsQuery';

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
  constructor(private alertRepo: AlertRepository) {}

  subscribedTo(): Query {
    return FindAlertsQuery;
  }

  async handle(_query: FindAlertsQuery): Promise<FindAlertsResponse[]> {
    const alerts = await this.alertRepo.find();
    console.log('mechoui .com : ', alerts);
    return alerts.map((alert) => alert.toPrimitives());
  }
}
