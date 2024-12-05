import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type AlertTriggeredEventAttributes = {
  readonly orderId: string;
  readonly symbol: string;
  readonly alertType: string;
  readonly alertPrice: number;
  readonly timestamp: string;
};

export class AlertTriggeredDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'alert.triggered';

  readonly orderId: string;
  readonly symbol: string;
  readonly alertType: string;
  readonly alertPrice: number;
  readonly timestamp: string;

  constructor({
    aggregateId,
    orderId,
    symbol,
    alertType,
    alertPrice,
    timestamp,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    orderId: string;
    symbol: string;
    alertType: string;
    alertPrice: number;
    timestamp: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: AlertTriggeredDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.orderId = orderId;
    this.symbol = symbol;
    this.alertType = alertType;
    this.alertPrice = alertPrice;
    this.timestamp = timestamp;
  }

  toPrimitives(): AlertTriggeredEventAttributes {
    const { orderId, symbol, alertType, alertPrice, timestamp } = this;
    return {
      orderId,
      symbol,
      alertType,
      alertPrice,
      timestamp,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: AlertTriggeredEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new AlertTriggeredDomainEvent({
      aggregateId,
      orderId: attributes.orderId,
      symbol: attributes.symbol,
      alertType: attributes.alertType,
      alertPrice: attributes.alertPrice,
      timestamp: attributes.timestamp,
      eventId,
      occurredOn,
    });
  }
}
