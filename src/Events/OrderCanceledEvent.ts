import { DomainEvent } from "../Contexts/Shared/domain/DomainEvent";

type OrderCanceledDomainEventAttributes = {
  readonly orderId: string;
  readonly timestamp: string;
};

export class OrderCanceledDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'order.canceled';

  readonly orderId: string;
  readonly timestamp: string;

  constructor({
    aggregateId,
    orderId,
    timestamp,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    orderId: string;
    timestamp: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({ eventName: OrderCanceledDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.orderId = orderId;
    this.timestamp = timestamp;
  }

  toPrimitives(): OrderCanceledDomainEventAttributes {
    const { orderId, timestamp } = this;
    return {
      orderId,
      timestamp,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: OrderCanceledDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new OrderCanceledDomainEvent({
      aggregateId,
      orderId: attributes.orderId,
      timestamp: attributes.timestamp,
      eventId,
      occurredOn,
    });
  }
}
