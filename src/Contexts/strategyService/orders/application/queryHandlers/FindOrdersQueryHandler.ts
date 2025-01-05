import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { OrderRepository } from '../../domain/OrderRepository';
import { FindOrdersQuery } from '../../domain/queries/FindOrdersQuery';
export type FindOrderResponse = {
  _id: string;
  symbol: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  tradeAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export class FindOrdersQueryHandler
  implements QueryHandler<FindOrdersQuery, FindOrderResponse[]>
{
  constructor(private orderRepo: OrderRepository) {}

  subscribedTo(): Query {
    return FindOrdersQuery;
  }

  async handle(_query: FindOrdersQuery): Promise<FindOrderResponse[]> {
    try {
      const orders = await this.orderRepo.find();
      return orders.map((order) => order.toPrimitives());
    } catch (error) {
      console.log('FindOrdersQueryHandler :');
      console.log(error);
      return [];
    }
  }
}
