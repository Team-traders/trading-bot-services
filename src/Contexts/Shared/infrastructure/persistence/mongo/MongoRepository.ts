import { Collection, MongoClient, Document, ObjectId } from 'mongodb';
import { MongoCriteriaConverter } from '../../../../Backoffice/Courses/infrastructure/persistence/MongoCriteriaConverter';
import { AggregateRoot } from '../../../domain/AggregateRoot';
import { Criteria } from '../../../domain/criteria/Criteria';

export abstract class MongoRepository<T extends AggregateRoot> {
  private criteriaConverter: MongoCriteriaConverter;

  constructor(private _client: Promise<MongoClient>) {
    this.criteriaConverter = new MongoCriteriaConverter();
  }

  protected abstract collectionName(): string;

  protected client(): Promise<MongoClient> {
    return this._client;
  }

  protected async collection(): Promise<Collection> {
    return (await this._client).db().collection(this.collectionName());
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection();

    const document = {
      ...aggregateRoot.toPrimitives(),
      _id: undefined,
      id: undefined,
    };

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: document },
      { upsert: true },
    );
  }

  protected async persistAll(
    aggregates: { id: string; aggregateRoot: T }[],
  ): Promise<void> {
    const collection = await this.collection();

    const bulkOps = aggregates.map(({ id, aggregateRoot }) => {
      const document = {
        ...aggregateRoot.toPrimitives(),
        _id: undefined,
        id: undefined,
      };

      return {
        updateOne: {
          filter: { _id: new ObjectId(id) },
          update: { $set: document },
          upsert: true,
        },
      };
    });

    if (bulkOps.length > 0) {
      await collection.bulkWrite(bulkOps);
    }
  }

  protected async searchByCriteria<D extends Document>(
    criteria: Criteria,
  ): Promise<D[]> {
    const query = this.criteriaConverter.convert(criteria);

    const collection = await this.collection();

    return await collection
      .find<D>(query.filter, {})
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .toArray();
  }
}
