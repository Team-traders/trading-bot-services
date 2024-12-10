import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { OrderStatus, OrderStatusEnum } from './OrderObjectValues/Enums';
import {
  OrderPrice,
  Symbol,
  TradeAmount,
} from './OrderObjectValues/ValueObjects';

type OrderProps = {
  symbol: Symbol;
  entryPrice: OrderPrice;
  stopLoss: OrderPrice;
  takeProfit: OrderPrice;
  tradeAmount: TradeAmount;
  status?: OrderStatus; // Optionnel, valeur par défaut "PENDING"
  createdAt?: Date; // Optionnel, valeur par défaut: date actuelle
  updatedAt?: Date; // Optionnel, valeur par défaut: date actuelle
};

export class Order extends AggregateRoot {
  readonly id: Uuid;
  readonly symbol: Symbol;
  readonly entryPrice: OrderPrice;
  readonly stopLoss: OrderPrice;
  readonly takeProfit: OrderPrice;
  readonly tradeAmount: TradeAmount;
  readonly status: OrderStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(
    id: Uuid,
    symbol: Symbol,
    entryPrice: OrderPrice,
    stopLoss: OrderPrice,
    takeProfit: OrderPrice,
    tradeAmount: TradeAmount,
    status: OrderStatus,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.id = id;
    this.symbol = symbol;
    this.entryPrice = entryPrice;
    this.stopLoss = stopLoss;
    this.takeProfit = takeProfit;
    this.tradeAmount = tradeAmount;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create({
    symbol,
    entryPrice,
    stopLoss,
    takeProfit,
    tradeAmount,
    status = new OrderStatus('ACTIVE'), // Statut par défaut
    createdAt = new Date(), // Date de création par défaut
    updatedAt = new Date(), // Date de mise à jour par défaut
  }: OrderProps): Order {
    const id = Uuid.random();

    return new Order(
      id,
      symbol,
      entryPrice,
      stopLoss,
      takeProfit,
      tradeAmount,
      status,
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
    tradeAmount: number;
    status: OrderStatusEnum;
    createdAt: string;
    updatedAt: string;
  }): Order {
    return new Order(
      new Uuid(plainData._id),
      new Symbol(plainData.symbol),
      new OrderPrice(plainData.entryPrice),
      new OrderPrice(plainData.stopLoss),
      new OrderPrice(plainData.takeProfit),
      new TradeAmount(plainData.tradeAmount),
      new OrderStatus(plainData.status),
      new Date(plainData.createdAt),
      new Date(plainData.updatedAt),
    );
  }

  toPrimitives(): {
    _id: string;
    symbol: string;
    entryPrice: number;
    stopLoss: number;
    takeProfit: number;
    tradeAmount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      _id: this.id.value,
      symbol: this.symbol.value,
      entryPrice: this.entryPrice.value,
      stopLoss: this.stopLoss.value,
      takeProfit: this.takeProfit.value,
      tradeAmount: this.tradeAmount.value,
      status: this.status.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
