import { Request, Response } from 'express';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { CreateOrderCommand } from '../../../Contexts/strategyService/orders/domain/commands/CreateOrderCommand';

type TradePostRequestParams = {};
type TradePostRequestQuery = {};
type TradePostRequestBody = {
  symbol: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  tradeAmount: number;
};

type CreateTradeRequest<
  Params = TradePostRequestParams,
  Query = TradePostRequestQuery,
  Body = TradePostRequestBody,
> = Request<Params, any, Body, Query>;

export class TradePostController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: CreateTradeRequest, res: Response) {
    try {
      const { symbol, entryPrice, stopLoss, takeProfit, tradeAmount } =
        req.body;

      const createTradeCommand = new CreateOrderCommand({
        symbol,
        entryPrice,
        stopLoss,
        takeProfit,
        tradeAmount,
      });

      // Inject command and command handlers
      await this.commandBus.dispatch(createTradeCommand);

      res.status(httpStatus.CREATED).send();
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
