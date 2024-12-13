import { DomainEvent } from '../Contexts/Shared/domain/DomainEvent';

type OrderPlacedDomainEventAttributes = {
  readonly orderId: string;
  readonly symbol: string;
  readonly entryPrice: number;
  readonly stopLoss: number;
  readonly takeProfit: number;
};

export class OrderPlacedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'order.placed';

  readonly orderId: string;
  readonly symbol: string;
  readonly entryPrice: number;
  readonly stopLoss: number;
  readonly takeProfit: number;

  constructor({
    aggregateId,
    orderId,
    symbol,
    entryPrice,
    stopLoss,
    takeProfit,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    orderId: string;
    symbol: string;
    entryPrice: number;
    stopLoss: number;
    takeProfit: number;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: OrderPlacedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.orderId = orderId;
    this.symbol = symbol;
    this.entryPrice = entryPrice;
    this.stopLoss = stopLoss;
    this.takeProfit = takeProfit;
  }

  toPrimitives(): OrderPlacedDomainEventAttributes {
    const { orderId, symbol, entryPrice, stopLoss, takeProfit } = this;
    return {
      orderId,
      symbol,
      entryPrice,
      stopLoss,
      takeProfit,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: OrderPlacedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new OrderPlacedDomainEvent({
      aggregateId,
      orderId: attributes.orderId,
      symbol: attributes.symbol,
      entryPrice: attributes.entryPrice,
      stopLoss: attributes.stopLoss,
      takeProfit: attributes.takeProfit,
      eventId,
      occurredOn,
    });
  }
}
