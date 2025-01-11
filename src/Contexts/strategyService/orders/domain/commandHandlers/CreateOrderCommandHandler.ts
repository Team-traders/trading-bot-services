import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { Command } from '../../../../Shared/domain/Command';
import { CreateOrderCommand } from '../commands/CreateOrderCommand';
import { OrderStatus } from '../OrderObjectValues/Enums';
import {
  Symbol,
  EntryPrice,
  StopLoss,
  TakeProfit,
  TradeAmount,
} from '../OrderObjectValues/ValueObjects';
import { OrderRepository } from '../OrderRepository';
import { Order } from '../Order';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { OrderPlacedDomainEvent } from '../../../../../Events/OrderPlacedEvent';

export class CreateOrderCommandHandler
  implements CommandHandler<CreateOrderCommand>
{
  constructor(private orderRepo: OrderRepository, private eventBus: EventBus) {}

  subscribedTo(): Command {
    return CreateOrderCommand;
  }

  async handle(command: CreateOrderCommand): Promise<void> {
    const symbol = new Symbol(command.symbol);
    const entryPrice = new EntryPrice(command.entryPrice);
    const stopLoss = new StopLoss(command.stopLoss);
    const takeProfit = new TakeProfit(command.takeProfit);
    const tradeAmount = new TradeAmount(command.tradeAmount);
    const status = new OrderStatus('ACTIVE'); // Statut initial
    const createdAt = new Date(); // Généré automatiquement
    const updatedAt = new Date(); // Généré automatiquement

    // Créez l'ordre
    const order = Order.create({
      symbol,
      entryPrice,
      stopLoss,
      takeProfit,
      tradeAmount,
      status,
      createdAt,
      updatedAt,
    });

    // Persistez l'ordre
    await this.orderRepo.save(order);

    // Créez et publiez l'événement OrderPlacedDomainEvent
    const orderPlacedEvent = new OrderPlacedDomainEvent({
      aggregateId: order.id.value,
      orderId: order.id.value,
      symbol: order.symbol.value,
      entryPrice: order.entryPrice.value,
      stopLoss: order.stopLoss.value,
      takeProfit: order.takeProfit.value,
    });

    await this.eventBus.publish([orderPlacedEvent]);
  }
}
