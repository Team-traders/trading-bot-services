import { Request, Response } from 'express';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { DeleteOrderCommand } from '../../../Contexts/strategyService/orders/domain/commands/DeleteOrderCommand';


export class OrderDeleteController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteOrderCommand = new DeleteOrderCommand({ id });

      const deleteResult = await this.commandBus.dispatch(deleteOrderCommand);

      res.status(httpStatus.OK).json(deleteResult);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
