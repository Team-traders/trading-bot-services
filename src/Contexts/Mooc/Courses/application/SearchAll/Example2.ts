import { CourseCreatedDomainEvent } from '../../domain/CourseCreatedDomainEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';

export class Example2 implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent];
  }

  async on(domainEvent: CourseCreatedDomainEvent): Promise<void> {
    console.log('tizarba9en ribandiw');
  }
}
