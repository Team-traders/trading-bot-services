import { DomainEvent } from "../Contexts/Shared/domain/DomainEvent";

type TradeExecutedDomainEventAttributes = {
  readonly symbol: string;
  readonly executionPrice: number;
  readonly filledAmount: number;
  readonly status: string;
  readonly strategyId: string;
  readonly tradeId: string;
  readonly timestamp: string;
};

export class TradeExecutedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'trade.executed';

  readonly symbol: string;
  readonly executionPrice: number;
  readonly filledAmount: number;
  readonly status: string;
  readonly strategyId: string;
  readonly tradeId: string;
  readonly timestamp: string;

  constructor({
    aggregateId,
    symbol,
    executionPrice,
    filledAmount,
    status,
    strategyId,
    tradeId,
    timestamp,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    symbol: string;
    executionPrice: number;
    filledAmount: number;
    status: string;
    strategyId: string;
    tradeId: string;
    timestamp: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({ eventName: TradeExecutedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.symbol = symbol;
    this.executionPrice = executionPrice;
    this.filledAmount = filledAmount;
    this.status = status;
    this.strategyId = strategyId;
    this.tradeId = tradeId;
    this.timestamp = timestamp;
  }

  toPrimitives(): TradeExecutedDomainEventAttributes {
    const { symbol, executionPrice, filledAmount, status, strategyId, tradeId, timestamp } = this;
    return {
      symbol,
      executionPrice,
      filledAmount,
      status,
      strategyId,
      tradeId,
      timestamp,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: TradeExecutedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TradeExecutedDomainEvent({
      aggregateId,
      symbol: attributes.symbol,
      executionPrice: attributes.executionPrice,
      filledAmount: attributes.filledAmount,
      status: attributes.status,
      strategyId: attributes.strategyId,
      tradeId: attributes.tradeId,
      timestamp: attributes.timestamp,
      eventId,
      occurredOn,
    });
  }
}
