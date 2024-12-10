import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { Command } from '../../../../Shared/domain/Command';
import { CreateOrderCommand } from '../../domain/commands/CreateOrderCommand';
import { OrderStatus } from '../OrderObjectValues/Enums';
import {
  Symbol,
  EntryPrice,
  StopLoss,
  TakeProfit,
  TradeAmount
} from '../../domain/OrderObjectValues/ValueObjects';
import { OrderRepository } from '../OrderRepository';
import { Order } from '../Order';

export class CreateTradeCommandHandler
  implements CommandHandler<CreateOrderCommand>
{
  constructor(private tradeRepo: OrderRepository) {}

  subscribedTo(): Command {
    return CreateOrderCommand;
  }

  async handle(command: CreateOrderCommand): Promise<void> {
    const symbol = new Symbol(command.symbol);
    const entryPrice = new EntryPrice(command.entryPrice);
    const stopLoss = new StopLoss(command.stopLoss);
    const takeProfit = new TakeProfit(command.takeProfit);
    const tradeAmount = new TradeAmount(command.tradeAmount);
    const status = new OrderStatus('ACTIVE'); // Exemple de statut initial
    const createdAt = new Date(); // Généré automatiquement
    const updatedAt = new Date(); 
    await this.tradeRepo.save(
        Order.create({
        symbol,
        entryPrice,
        stopLoss,
        takeProfit,
        tradeAmount,
        status,
        createdAt,
        updatedAt
      }),
    );
  }
}
