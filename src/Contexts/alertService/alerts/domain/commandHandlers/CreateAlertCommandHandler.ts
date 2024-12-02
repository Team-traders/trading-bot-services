import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { Command } from '../../../../Shared/domain/Command';
import { CreateAlertCommand } from '../../domain//commands/CreateAlertCommand';
import {
  Symbol,
  AlertPrice,
  AlertTitle,
  AlertMessage,
} from '../../domain/AlertValueObjects/ValueObjects';
import { AlertType, TriggerCondition } from '../AlertValueObjects/Enums';
import { AlertRepository } from '../AlertRepository';
import { Alert } from '../Alert';

export class CreateAlertCommandHandler
  implements CommandHandler<CreateAlertCommand>
{
  constructor(private alertRepo: AlertRepository) {}

  subscribedTo(): Command {
    return CreateAlertCommand;
  }

  async handle(command: CreateAlertCommand): Promise<void> {
    const symbol = new Symbol(command.symbol);
    const alertPrice = new AlertPrice(command.alertPrice);
    const triggerCondition = new TriggerCondition(command.triggerCondition);
    const emailTitle = new AlertTitle(command.emailTitle);
    const emailMessage = new AlertMessage(command.emailMessage);
    const alertType = new AlertType('NOTIFICATION');

    await this.alertRepo.save(
      Alert.create({
        symbol,
        alertType,
        alertPrice,
        triggerCondition,
        title: emailTitle,
        message: emailMessage,
      }),
    );
  }
}
