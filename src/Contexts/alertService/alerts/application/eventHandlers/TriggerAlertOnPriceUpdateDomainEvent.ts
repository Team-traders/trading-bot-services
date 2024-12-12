import { AlertTriggeredDomainEvent } from '../../../../../Events/AlertTriggeredEvent';
import {
  PriceUpdateData,
  PriceUpdateDomainEvent,
} from '../../../../../Events/PriceUpdateEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { Alert } from '../../domain/Alert';
import { AlertRepository } from '../../domain/AlertRepository';
import { AlertStatus } from '../../domain/AlertValueObjects/Enums';

export class TriggerAlertOnPriceUpdateDomainEvent
  implements DomainEventSubscriber<PriceUpdateDomainEvent>
{
  private readonly BATCH_SIZE = 1000;

  constructor(
    private readonly alertRepository: AlertRepository,
    private readonly eventBus: EventBus,
  ) {}

  subscribedTo(): DomainEventClass[] {
    return [PriceUpdateDomainEvent];
  }

  async on(domainEvent: PriceUpdateDomainEvent): Promise<void> {
    const prices = domainEvent.data;
    const priceBatches = this.chunkArray(prices, this.BATCH_SIZE);

    for (const batch of priceBatches) {
      try {
        // find alerts and trigger them if available
        await this.processPriceBatch(batch);
      } catch (error) {
        this.handleBatchProcessingError(batch, error);
      }
    }
  }

  private async processPriceBatch(prices: PriceUpdateData[]): Promise<void> {
    const alertGenerator = this.generateMatchingAlerts(prices);

    for await (const alerts of alertGenerator) {
      if (alerts.length > 0) {
        //publish events and updates alert's status
        await this.processMatchingAlerts(alerts);
        console.log(`Triggered ${alerts.length} alert(s) !`);
      }
    }
  }

  private async *generateMatchingAlerts(
    prices: PriceUpdateData[],
  ): AsyncGenerator<Alert[], void, void> {
    const queryConditions = this.buildQueryConditions(prices);
    let skip = 0;

    while (true) {
      const alerts = await this.alertRepository.find(
        { $or: queryConditions },
        { skip, limit: this.BATCH_SIZE },
      );

      if (alerts.length === 0) break;

      yield alerts;
      skip += this.BATCH_SIZE;
    }
  }

  private buildQueryConditions(prices: PriceUpdateData[]): any[] {
    return prices.flatMap(({ symbol, price }) => [
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
  }

  private async processMatchingAlerts(alerts: Alert[]): Promise<void> {
    const events = alerts.map((alert) => this.createAlertTriggeredEvent(alert));
    await this.eventBus.publish(events);

    const updatedAlerts = alerts.map<Alert>((a) =>
      Alert.create({ ...a, status: new AlertStatus('TRIGGERED') }),
    );
    await this.alertRepository.saveAll(updatedAlerts);
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

  private handleBatchProcessingError(
    batch: PriceUpdateData[],
    error: unknown,
  ): void {
    console.error('Error processing price batch:', {
      batch,
      error,
    });
  }
}
