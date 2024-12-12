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
  private readonly batchSize = 1000;

  constructor(
    private readonly alertRepo: AlertRepository,
    private readonly eventBus: EventBus,
  ) {}

  subscribedTo(): DomainEventClass[] {
    return [PriceUpdateDomainEvent];
  }

  async on(domainEvent: PriceUpdateDomainEvent): Promise<void> {
    const { data: prices } = domainEvent;
    const priceBatches = this.chunkArray(prices, this.batchSize);

    try {
      for (const batch of priceBatches) {
        const matchingAlerts = await this.findMatchingAlerts(batch);

        if (matchingAlerts.length > 0) {
          //sends events and set status to `TRIGGERED`
          await this.processMatchingAlerts(matchingAlerts);
        }
        console.log(`Triggered ${matchingAlerts.length} alert(s).`);
      }
    } catch (error) {
      console.error('Error processing price update batch:', error);
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

  private async processMatchingAlerts(alerts: Alert[]): Promise<void> {
    const events = alerts.map((alert) => this.createAlertTriggeredEvent(alert));

    await this.eventBus.publish(events);

    const updatedAlerts = alerts.map<Alert>((a) =>
      Alert.create({ ...a, status: new AlertStatus('TRIGGERED') }),
    );

    await this.alertRepo.saveAll(updatedAlerts);
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

  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, i) =>
      array.slice(i * chunkSize, i * chunkSize + chunkSize),
    );
  }
}
