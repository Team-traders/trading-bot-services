import { Document, Filter, FindOptions } from 'mongodb';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { Order } from '../../domain/Order';
import { OrderStatusEnum } from '../../domain/OrderObjectValues/Enums';
import { OrderRepository } from '../../domain/OrderRepository';

interface OrderDocument extends Document {
  _id: string;
  symbol: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  status: string;
  tradeAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class MongoOrderRepository
  extends MongoRepository<Order>
  implements OrderRepository
{
  public async save(order: Order): Promise<void> {
    return this.persist(order._id.value, order);
  }

  protected collectionName(): string {
    return 'orders';
  }

  public async searchAll(): Promise<Order[]> {
    const collection = await this.collection();
    const documents = await collection.find<OrderDocument>({}, {}).toArray();

    return documents.map((document) =>
      Order.fromPrimitives({
        _id: document._id.toString(),
        symbol: document.symbol,
        entryPrice: document.entryPrice,
        stopLoss: document.stopLoss,
        takeProfit: document.takeProfit,
        status: document.status as OrderStatusEnum,
        tradeAmount: document.tradeAmount,
        createdAt: document.createdAt.toISOString(),
        updatedAt: document.updatedAt.toISOString(),
      }),
    );
  }

  public async find(
    filters: Filter<Document>,
    options: FindOptions,
  ): Promise<Order[]> {
    const collection = await this.collection();
    const documents = await collection
      .find<OrderDocument>(filters, options)
      .toArray();

    return documents.map((document) =>
      Order.fromPrimitives({
        _id: document._id.toString(),
        symbol: document.symbol,
        entryPrice: document.entryPrice,
        stopLoss: document.stopLoss,
        takeProfit: document.takeProfit,
        status: document.status as OrderStatusEnum,
        tradeAmount: document.tradeAmount,
        createdAt: document.createdAt.toISOString(),
        updatedAt: document.updatedAt.toISOString(),
      }),
    );
  }
}
