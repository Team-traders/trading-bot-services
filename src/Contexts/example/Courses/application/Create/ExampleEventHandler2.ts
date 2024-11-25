import { CourseCreatedDomainEvent } from '../../../../Mooc/Courses/domain/CourseCreatedDomainEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';

export class ExampleEventHandler2 implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent];
  }

  async on(_domainEvent: CourseCreatedDomainEvent): Promise<void> {
    console.log('boom.com example service');
  }
}
