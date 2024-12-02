import { Command } from '../../../../Shared/domain/Command';

type CreateAlertCommandParams = {
  symbol: string;
  alertPrice: number;
  triggerCondition: 'GTE' | 'LTE';
  emailTitle: string;
  emailMessage: string;
};

export class CreateAlertCommand extends Command {
  readonly symbol: string;
  readonly alertPrice: number;
  readonly triggerCondition: 'GTE' | 'LTE';
  readonly emailTitle: string;
  readonly emailMessage: string;

  constructor({
    symbol,
    alertPrice,
    triggerCondition,
    emailTitle,
    emailMessage,
  }: CreateAlertCommandParams) {
    super();
    this.symbol = symbol;
    this.alertPrice = alertPrice;
    this.triggerCondition = triggerCondition;
    this.emailTitle = emailTitle;
    this.emailMessage = emailMessage;
  }
}
