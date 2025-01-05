import { Command } from '../../../../Shared/domain/Command';

type CreateOrderCommandParams = {
  symbol: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  tradeAmount: number;
};

export class CreateOrderCommand extends Command {
  readonly symbol: string;
  readonly entryPrice: number;
  readonly stopLoss: number;
  readonly takeProfit: number;
  readonly tradeAmount: number;

  constructor({
    symbol,
    entryPrice,
    stopLoss,
    takeProfit,
    tradeAmount,
  }: CreateOrderCommandParams) {
    super();
    this.symbol = symbol;
    this.entryPrice = entryPrice;
    this.stopLoss = stopLoss;
    this.takeProfit = takeProfit;
    this.tradeAmount = tradeAmount;
  }
}
