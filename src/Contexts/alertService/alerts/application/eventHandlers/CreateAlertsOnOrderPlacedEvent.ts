import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { AlertRepository } from '../../domain/AlertRepository';
import { Alert } from '../../domain/Alert';
import {
  AlertStatus,
  AlertType,
  TriggerCondition,
} from '../../domain/AlertValueObjects/Enums';
import { OrderPlacedDomainEvent } from '../../../../../Events/OrderPlacedEvent';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import {
  AlertMessage,
  AlertPrice,
  AlertTitle,
  Symbol,
} from '../../domain/AlertValueObjects/ValueObjects';

export class CreateAlertsOnOrderPlacedEvent
  implements DomainEventSubscriber<OrderPlacedDomainEvent>
{
  constructor(private readonly alertRepository: AlertRepository) {}

  subscribedTo(): DomainEventClass[] {
    return [OrderPlacedDomainEvent];
  }

  async on(domainEvent: OrderPlacedDomainEvent): Promise<void> {
    const { orderId, entryPrice, stopLoss, takeProfit, symbol } = domainEvent;

    try {
      const entryAlert = this.createAlert(
        orderId,
        symbol,
        new TriggerCondition('LTE'),
        entryPrice,
        new AlertType('ENTRY'),
      );
      const takeProfitAlert = this.createAlert(
        orderId,
        symbol,
        new TriggerCondition('GTE'),
        takeProfit,
        new AlertType('TAKE_PROFIT'),
        new AlertStatus('INACTIVE'),
      );
      const stopLossAlert = this.createAlert(
        orderId,
        symbol,
        new TriggerCondition('LTE'),
        stopLoss,
        new AlertType('STOP_LOSS'),
        new AlertStatus('INACTIVE'),
      );

      // Save alerts to the repository
      await this.alertRepository.saveAll([
        entryAlert,
        takeProfitAlert,
        stopLossAlert,
      ]);

      console.log(`Alerts created for order ${orderId}`);
    } catch (error) {
      console.error(`Error creating alerts for order ${orderId}:`, error);
    }
  }

  private createAlert(
    orderId: string,
    symbol: string,
    triggerCondition: TriggerCondition,
    alertPrice: number,
    alertType: AlertType,
    status: AlertStatus = new AlertStatus('ACTIVE'),
  ): Alert {
    return Alert.create({
      linkedOrderId: new Uuid(orderId),
      symbol: new Symbol(symbol),
      triggerCondition,
      alertPrice: new AlertPrice(alertPrice),
      title: new AlertTitle(
        `[${alertType.value}] : price crossed ${alertPrice}$ for ${symbol}`,
      ),
      message: new AlertMessage(` price crossed ${alertPrice}$ for ${symbol}`),
      alertType,
      status,
    });
  }
}
