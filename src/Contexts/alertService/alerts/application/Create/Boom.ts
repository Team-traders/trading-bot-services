import { CourseCreatedDomainEvent } from '../../../../Mooc/Courses/domain/CourseCreatedDomainEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { AlertRepository } from '../../domain/AlertRepository';

export class Boom implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  constructor(private repo: AlertRepository) {}

  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent];
  }

  async on(domainEvent: CourseCreatedDomainEvent): Promise<void> {
    const result = await this.repo.find();
    console.log('alertService.com');
    console.log('alert service results : ', result, result.length);
  }
}
