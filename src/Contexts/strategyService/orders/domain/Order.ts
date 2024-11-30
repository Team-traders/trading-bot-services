import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { OrderStatus, OrderStatusEnum } from './OrderObjectValues/Enums';
import {
  OrderPrice,
  Symbol,
  TradeAmount,
} from './OrderObjectValues/ValueObjects';

export class Order extends AggregateRoot {
  readonly _id: Uuid;
  readonly symbol: Symbol;
  readonly entryPrice: OrderPrice;
  readonly stopLoss: OrderPrice;
  readonly takeProfit: OrderPrice;
  readonly status: OrderStatus;
  readonly tradeAmount: TradeAmount;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(
    _id: Uuid,
    symbol: Symbol,
    entryPrice: OrderPrice,
    stopLoss: OrderPrice,
    takeProfit: OrderPrice,
    status: OrderStatus,
    tradeAmount: TradeAmount,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this._id = _id;
    this.symbol = symbol;
    this.entryPrice = entryPrice;
    this.stopLoss = stopLoss;
    this.takeProfit = takeProfit;
    this.status = status;
    this.tradeAmount = tradeAmount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(
    symbol: Symbol,
    entryPrice: OrderPrice,
    stopLoss: OrderPrice,
    takeProfit: OrderPrice,
    status: OrderStatus,
    tradeAmount: TradeAmount,
    createdAt: Date,
    updatedAt: Date,
  ): Order {
    const id = Uuid.random();
    return new Order(
      id,
      symbol,
      entryPrice,
      stopLoss,
      takeProfit,
      status,
      tradeAmount,
      createdAt,
      updatedAt,
    );
  }

  static fromPrimitives(plainData: {
    _id: string;
    symbol: string;
    entryPrice: number;
    stopLoss: number;
    takeProfit: number;
    status: string;
    tradeAmount: number;
    createdAt: string;
    updatedAt: string;
  }): Order {
    return new Order(
      new Uuid(plainData._id),
      new Symbol(plainData.symbol),
      new OrderPrice(plainData.entryPrice),
      new OrderPrice(plainData.stopLoss),
      new OrderPrice(plainData.takeProfit),
      new OrderStatus(plainData.status as OrderStatusEnum),
      new TradeAmount(plainData.tradeAmount),
      new Date(plainData.createdAt),
      new Date(plainData.updatedAt),
    );
  }

  toPrimitives() {
    return {
      _id: this._id.value,
      symbol: this.symbol.value,
      entryPrice: this.entryPrice.value,
      stopLoss: this.stopLoss.value,
      takeProfit: this.takeProfit.value,
      status: this.status.value,
      tradeAmount: this.tradeAmount.value,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
