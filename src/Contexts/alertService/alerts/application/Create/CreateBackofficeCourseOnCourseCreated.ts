import { CourseCreatedDomainEvent } from '../../../../Mooc/Courses/domain/CourseCreatedDomainEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
//import { BackofficeCourseCreator } from './BackofficeCourseCreator';

export class CreateBackofficeCourseOnCourseCreated
  implements DomainEventSubscriber<CourseCreatedDomainEvent>
{
  //constructor(private creator: BackofficeCourseCreator) {}

  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent];
  }

  async on(_domainEvent: CourseCreatedDomainEvent): Promise<void> {
    console.log('zerbou3i.com');
  }
}
