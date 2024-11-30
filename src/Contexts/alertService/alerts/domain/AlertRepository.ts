import { Filter, FindOptions } from 'mongodb';
import { Alert } from './Alert';

export interface AlertRepository {
  save(alert: Alert): Promise<void>;
  searchAll(): Promise<Array<Alert>>;
  findo(filters?: Filter<Document>, options?: FindOptions): Promise<Alert[]>;
}
