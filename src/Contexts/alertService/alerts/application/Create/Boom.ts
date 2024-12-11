import { AlertTriggeredDomainEvent } from '../../../../../Events/AlertTriggeredEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { AlertRepository } from '../../domain/AlertRepository';

export class Boom implements DomainEventSubscriber<AlertTriggeredDomainEvent> {
  constructor(private repo: AlertRepository) {}

  subscribedTo(): DomainEventClass[] {
    return [AlertTriggeredDomainEvent];
  }

  async on(domainEvent: AlertTriggeredDomainEvent): Promise<void> {
    const result = await this.repo.find();
    console.log('alertService.com', domainEvent.symbol, domainEvent.alertPrice);
    console.log('alert service results : ', result.length);
  }
}
