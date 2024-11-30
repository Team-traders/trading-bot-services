import { Document, Filter, FindOptions } from 'mongodb';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { Alert } from '../../domain/Alert';
import { AlertRepository } from '../../domain/AlertRepository';
import {
  AlertStatusEnum,
  AlertTypeEnum,
  TriggerConditionEnum,
} from '../../domain/AlertValueObjects/Enums';

interface AlertDocument extends Document {
  _id: string;
  symbol: string;
  linkedOrderId?: string;
  alertType: string;
  alertPrice: number;
  triggerCondition: string;
  status: string;
  title: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MongoAlertRepository
  extends MongoRepository<Alert>
  implements AlertRepository
{
  public async save(alert: Alert): Promise<void> {
    return this.persist(alert.id.value, alert);
  }

  protected collectionName(): string {
    return 'alerts';
  }

  public async searchAll(): Promise<Alert[]> {
    const collection = await this.collection();
    const documents = await collection.find<AlertDocument>({}, {}).toArray();

    return documents.map((document) =>
      Alert.fromPrimitives({
        _id: document._id.toString(),
        symbol: document.symbol,
        linkedOrderId: document.linkedOrderId || null,
        alertType: document.alertType as AlertTypeEnum,
        alertPrice: document.alertPrice,
        triggerCondition: document.triggerCondition as TriggerConditionEnum,
        status: document.status as AlertStatusEnum,
        title: document.title,
        message: document.message,
        createdAt: document.createdAt.toISOString(),
        updatedAt: document.updatedAt.toISOString(),
      }),
    );
  }

  public async findo(
    filters: Filter<Document>,
    options: FindOptions,
  ): Promise<Alert[]> {
    const collection = await this.collection();
    const documents = await collection
      .find<AlertDocument>(filters, options)
      .toArray();

    return documents.map((document) =>
      Alert.fromPrimitives({
        _id: document._id.toString(),
        symbol: document.symbol,
        linkedOrderId: document.linkedOrderId || null,
        alertType: document.alertType as AlertTypeEnum,
        alertPrice: document.alertPrice,
        triggerCondition: document.triggerCondition as TriggerConditionEnum,
        status: document.status as AlertStatusEnum,
        title: document.title,
        message: document.message,
        createdAt: document.createdAt.toISOString(),
        updatedAt: document.updatedAt.toISOString(),
      }),
    );
  }

  public async find(
    filters: Filter<Document> = {},
    options: FindOptions = {},
  ): Promise<Alert[]> {
    const collection = await this.collection();
    const documents = await collection
      .find<AlertDocument>(filters, options)
      .toArray();

    return documents.map((document) =>
      Alert.fromPrimitives({
        _id: document._id.toString(),
        symbol: document.symbol,
        linkedOrderId: document.linkedOrderId || null,
        alertType: document.alertType as AlertTypeEnum,
        alertPrice: document.alertPrice,
        triggerCondition: document.triggerCondition as TriggerConditionEnum,
        status: document.status as AlertStatusEnum,
        title: document.title,
        message: document.message,
        createdAt: document.createdAt.toISOString(),
        updatedAt: document.updatedAt.toISOString(),
      }),
    );
  }
}
