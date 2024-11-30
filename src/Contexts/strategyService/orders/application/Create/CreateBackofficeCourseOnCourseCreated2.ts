import { CourseCreatedDomainEvent } from '../../../../Mooc/Courses/domain/CourseCreatedDomainEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { OrderRepository } from '../../domain/OrderRepository';
//import { BackofficeCourseCreator } from './BackofficeCourseCreator';

export class CreateBackofficeCourseOnCourseCreated2
  implements DomainEventSubscriber<CourseCreatedDomainEvent>
{
  constructor(private orderRepo: OrderRepository) {}

  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent];
  }

  async on(_domainEvent: CourseCreatedDomainEvent): Promise<void> {
    const result = await this.orderRepo.find();
    console.log('strategyService.com');
    console.log('result : ', result, result.length);
  }
}
