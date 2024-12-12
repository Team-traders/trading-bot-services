import { DomainEvent } from '../Contexts/Shared/domain/DomainEvent';

export type PriceUpdateData = {
  readonly symbol: string;
  readonly price: number;
};

type PriceUpdateDomainEventAttributes = {
  readonly data: PriceUpdateData[];
};

export class PriceUpdateDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'price.update';

  readonly data: PriceUpdateData[];

  constructor({
    aggregateId,
    data,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    data: PriceUpdateData[];
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: PriceUpdateDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.data = data;
  }

  toPrimitives(): PriceUpdateDomainEventAttributes {
    const { data } = this;
    return {
      data,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: PriceUpdateDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new PriceUpdateDomainEvent({
      aggregateId,
      data: attributes.data,
      eventId,
      occurredOn,
    });
  }
}
