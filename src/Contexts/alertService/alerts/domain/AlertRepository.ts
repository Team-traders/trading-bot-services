import {
  DeleteResult,
  DeleteOptions,
  Filter,
  FindOptions,
  Document,
} from 'mongodb';
import { Alert } from './Alert';

export interface AlertRepository {
  save(alert: Alert): Promise<void>;
  saveAll(alert: Alert[]): Promise<void>;
  searchAll(): Promise<Array<Alert>>;
  find(filters?: Filter<Document>, options?: FindOptions): Promise<Alert[]>;
  deleteOne(
    filter?: Filter<Document>,
    options?: DeleteOptions,
  ): Promise<DeleteResult>;
}
