import { AlertTriggeredDomainEvent } from '../../../../../Events/AlertTriggeredEvent';
import { PriceUpdateDomainEvent } from '../../../../../Events/PriceUpdateEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { Alert } from '../../domain/Alert';
import { AlertRepository } from '../../domain/AlertRepository';
import { AlertStatus } from '../../domain/AlertValueObjects/Enums';

export class TriggerAlertOnPriceUpdateDomainEvent
  implements DomainEventSubscriber<PriceUpdateDomainEvent>
{
  constructor(
    private readonly alertRepo: AlertRepository,
    private readonly eventBus: EventBus,
  ) {}

  subscribedTo(): DomainEventClass[] {
    return [PriceUpdateDomainEvent];
  }

  async on(domainEvent: PriceUpdateDomainEvent): Promise<void> {
    const { data: prices } = domainEvent;

    try {
      const matchingAlerts = await this.findMatchingAlerts(prices);

      if (matchingAlerts.length === 0) return;

      const events = matchingAlerts.map((alert) =>
        this.createAlertTriggeredEvent(alert),
      );

      await this.eventBus.publish(events);
      await this.alertRepo.saveAll(
        matchingAlerts.map<Alert>((a) =>
          Alert.create({ ...a, status: new AlertStatus('TRIGGERED') }),
        ),
      );

      console.log(`Triggered ${events.length} alert(s).`);
    } catch (error) {
      console.error('Error processing price update:', error);
    }
  }

  private async findMatchingAlerts(
    prices: { symbol: string; price: number }[],
  ): Promise<Alert[]> {
    const orConditions = prices.flatMap(({ symbol, price }) => [
      {
        symbol,
        status: 'ACTIVE',
        triggerCondition: 'GTE',
        alertPrice: { $lte: price },
      },
      {
        symbol,
        status: 'ACTIVE',
        triggerCondition: 'LTE',
        alertPrice: { $gte: price },
      },
    ]);

    return this.alertRepo.find({ $or: orConditions });
  }

  private createAlertTriggeredEvent(alert: Alert): AlertTriggeredDomainEvent {
    const { linkedOrderId, symbol, alertType, alertPrice, _id } =
      alert.toPrimitives();

    return new AlertTriggeredDomainEvent({
      aggregateId: _id,
      orderId: linkedOrderId,
      symbol,
      alertType,
      alertPrice,
      occurredOn: new Date(),
    });
  }
}
