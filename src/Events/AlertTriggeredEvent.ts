import { DomainEvent } from '../Contexts/Shared/domain/DomainEvent';

type AlertTriggeredDomainEventAttributes = {
  readonly orderId: string | null;
  readonly symbol: string;
  readonly alertType: string;
  readonly alertPrice: number;
};
export class AlertTriggeredDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'alert.triggered';

  readonly orderId: string | null;
  readonly symbol: string;
  readonly alertType: string;
  readonly alertPrice: number;

  constructor({
    aggregateId,
    orderId,
    symbol,
    alertType,
    alertPrice,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    orderId: string | null;
    symbol: string;
    alertType: string;
    alertPrice: number;
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
  }

  toPrimitives(): AlertTriggeredDomainEventAttributes {
    const { orderId, symbol, alertType, alertPrice } = this;
    return {
      orderId,
      symbol,
      alertType,
      alertPrice,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: AlertTriggeredDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new AlertTriggeredDomainEvent({
      aggregateId,
      orderId: attributes.orderId || null,
      symbol: attributes.symbol,
      alertType: attributes.alertType,
      alertPrice: attributes.alertPrice,
      eventId,
      occurredOn,
    });
  }
}
