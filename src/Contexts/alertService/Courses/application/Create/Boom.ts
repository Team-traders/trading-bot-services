import { CourseCreatedDomainEvent } from '../../../../Mooc/Courses/domain/CourseCreatedDomainEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';

export class Boom implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent];
  }

  async on(domainEvent: CourseCreatedDomainEvent): Promise<void> {
    console.log('mechoui.com');
  }
}
