import { Request, Response } from 'express';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { CreateAlertCommand } from '../../../Contexts/alertService/alerts/domain/commands/CreateAlertCommand';
import { LoggerPort } from '../../../Contexts/Shared/domain/Logger';

type AlertPostRequestParams = {};
type AlertPostRequestQuery = {};
type AlertPostRequestBody = {
  symbol: string;
  alertPrice: number;
  triggerCondition: 'GTE' | 'LTE';
  emailTitle: string;
  emailMessage: string;
};

type CreateAlertRequest<
  Params = AlertPostRequestParams,
  Query = AlertPostRequestQuery,
  Body = AlertPostRequestBody,
> = Request<Params, any, Body, Query>;

export class AlertPostController implements Controller {
  constructor(
    private commandBus: CommandBus,
    private logger: LoggerPort,
  ) {}

  async run(req: CreateAlertRequest, res: Response) {
    this.logger.info(`"AlertPostController : " ${req.body}`);
    try {
      const { symbol, alertPrice, triggerCondition, emailTitle, emailMessage } =
        req.body;

      const createAlertCommand = new CreateAlertCommand({
        symbol,
        alertPrice,
        emailMessage,
        emailTitle,
        triggerCondition,
      });

      //inject command and command handlers
      await this.commandBus.dispatch(createAlertCommand);

      res.status(httpStatus.CREATED).send();
    } catch (error) {
      this.logger.error(`"AlertPostController : " ${error}`);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
