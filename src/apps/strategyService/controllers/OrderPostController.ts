import { Request, Response } from 'express';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { CreateOrderCommand } from '../../../Contexts/strategyService/orders/domain/commands/CreateOrderCommand';

type OrderPostRequestParams = {};
type OrderPostRequestQuery = {};
type OrderPostRequestBody = {
  symbol: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  tradeAmount: number;
};

type CreateOrderRequest<
  Params = OrderPostRequestParams,
  Query = OrderPostRequestQuery,
  Body = OrderPostRequestBody,
> = Request<Params, any, Body, Query>;

export class OrderPostController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: CreateOrderRequest, res: Response) {
    try {
      const { symbol, entryPrice, stopLoss, takeProfit, tradeAmount } =
        req.body;

      const createOrderCommand = new CreateOrderCommand({
        symbol,
        entryPrice,
        stopLoss,
        takeProfit,
        tradeAmount,
      });

      // Inject the command and command handlers
      await this.commandBus.dispatch(createOrderCommand);

      res.status(httpStatus.CREATED).send();
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
