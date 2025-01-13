import { DomainEvent } from "../Contexts/Shared/domain/DomainEvent";

type TradeSignalDomainEventAttributes = {
  readonly symbol: string;
  readonly action: 'BUY' | 'SELL';
  readonly entryPrice: number;
  readonly stopLoss: number;
  readonly takeProfit: number;
  readonly tradeAmount: number;
  readonly strategyId: string;
};

export class TradeSignalDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'trade.signal';

  readonly symbol: string;
  readonly action: 'BUY' | 'SELL';
  readonly entryPrice: number;
  readonly stopLoss: number;
  readonly takeProfit: number;
  readonly tradeAmount: number;
  readonly strategyId: string;

  constructor({
    aggregateId,
    symbol,
    action,
    entryPrice,
    stopLoss,
    takeProfit,
    tradeAmount,
    strategyId,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    symbol: string;
    action: 'BUY' | 'SELL';
    entryPrice: number;
    stopLoss: number;
    takeProfit: number;
    tradeAmount: number;
    strategyId: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({ eventName: TradeSignalDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.symbol = symbol;
    this.action = action;
    this.entryPrice = entryPrice;
    this.stopLoss = stopLoss;
    this.takeProfit = takeProfit;
    this.tradeAmount = tradeAmount;
    this.strategyId = strategyId;
  }

  toPrimitives(): TradeSignalDomainEventAttributes {
    const { symbol, action, entryPrice, stopLoss, takeProfit, tradeAmount, strategyId } = this;
    return {
      symbol,
      action,
      entryPrice,
      stopLoss,
      takeProfit,
      tradeAmount,
      strategyId,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: TradeSignalDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TradeSignalDomainEvent({
      aggregateId,
      symbol: attributes.symbol,
      action: attributes.action,
      entryPrice: attributes.entryPrice,
      stopLoss: attributes.stopLoss,
      takeProfit: attributes.takeProfit,
      tradeAmount: attributes.tradeAmount,
      strategyId: attributes.strategyId,
      eventId,
      occurredOn,
    });
  }
}
