import { AlertTriggeredDomainEvent } from '../../../../../Events/AlertTriggeredEvent';
import { TradeSignalDomainEvent } from '../../../../../Events/TradeSignalEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { EventBus } from '../../../../Shared/domain/EventBus';

export class AlertTriggeredEventHandler
  implements DomainEventSubscriber<AlertTriggeredDomainEvent>
{
  constructor(private eventBus: EventBus) {}

  subscribedTo(): DomainEventClass[] {
    return [AlertTriggeredDomainEvent];
  }

  async on(event: AlertTriggeredDomainEvent): Promise<void> {
    try {
      console.log('Consuming AlertTriggeredDomainEvent:', event.toPrimitives());

      const { symbol, alertType, alertPrice } = event.toPrimitives();

      if (!this.validateAttributes(symbol, alertType, alertPrice)) {
        throw new Error('Invalid or missing attributes in AlertTriggeredDomainEvent');
      }

      const action = this.determineAction(alertType);
      const { stopLoss, takeProfit } = this.calculatePriceLevels(alertPrice);

      const tradeSignalEvent = new TradeSignalDomainEvent({
        aggregateId: this.generateAggregateId(),
        symbol,
        action,
        entryPrice: alertPrice,
        stopLoss,
        takeProfit,
        tradeAmount: 1,
        strategyId: 'default',
      });

      await this.eventBus.publish([tradeSignalEvent]);

      console.log('TradeSignalDomainEvent published:', tradeSignalEvent.toPrimitives());
    } catch (error : any) {
      console.error('Error handling AlertTriggeredDomainEvent:', error.message, error.stack);
    }
  }


  private validateAttributes(symbol: string, alertType: string, alertPrice: number): boolean {
    return !!symbol && !!alertType && alertPrice > 0;
  }


  private determineAction(alertType: string): 'BUY' | 'SELL' {
    if (alertType === 'BUY_ALERT') return 'BUY';
    if (alertType === 'SELL_ALERT') return 'SELL';
    throw new Error(`Unsupported alert type: ${alertType}`);
  }

  private calculatePriceLevels(alertPrice: number): { stopLoss: number; takeProfit: number } {
    const stopLoss = parseFloat((alertPrice * 0.95).toFixed(2)); // Precision to 2 decimals
    const takeProfit = parseFloat((alertPrice * 1.05).toFixed(2));
    return { stopLoss, takeProfit };
  }


  private generateAggregateId(): string {
    return `trade-${Date.now()}`;
  }
}
