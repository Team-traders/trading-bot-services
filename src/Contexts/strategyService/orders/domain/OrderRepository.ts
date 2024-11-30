import { Filter, FindOptions } from 'mongodb';
import { Order } from './Order';

export interface OrderRepository {
  save(order: Order): Promise<void>;
  searchAll(): Promise<Array<Order>>;
  find(filters?: Filter<Document>, options?: FindOptions): Promise<Order[]>;
}
