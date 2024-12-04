import { AlertTriggeredDomainEvent } from "../../../alertService/alerts/domain/AlertDomainEvent";
import { DomainEventClass } from "../../../Shared/domain/DomainEvent";
import { DomainEventSubscriber } from "../../../Shared/domain/DomainEventSubscriber";
import { SendMailUseCase } from "./usecases/SendMailUseCase";



export class SendEmailOnAlertTrrigeredEvent implements DomainEventSubscriber<AlertTriggeredDomainEvent> {
  constructor(private sendMailUsecase: SendMailUseCase) {}

  subscribedTo(): DomainEventClass[] {
    return [AlertTriggeredDomainEvent];
  }

  async on(_domainEvent: AlertTriggeredDomainEvent): Promise<void> {
    try {
      await this.sendMailUsecase.execute(_domainEvent);
    } catch (error) {
      console.error("Error in sendMailUsecase.execute:", error);
    }
    
    
  }
}
