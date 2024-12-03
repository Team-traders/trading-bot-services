import { AlertTriggeredDomainEvent } from "../../../alertService/alerts/domain/AlertDomainEvent";
import { DomainEventClass } from "../../../Shared/domain/DomainEvent";
import { DomainEventSubscriber } from "../../../Shared/domain/DomainEventSubscriber";
import { NodeMailerSenderAdapter } from "../infra/adapters/NodeMailerSenderAdapter";



export class SendEmailOnAlertTrrigeredEvent implements DomainEventSubscriber<AlertTriggeredDomainEvent> {
  constructor(private nodeMailerSenderAdapter: NodeMailerSenderAdapter) {}

  subscribedTo(): DomainEventClass[] {
    return [AlertTriggeredDomainEvent];
  }

  async on(_domainEvent: AlertTriggeredDomainEvent): Promise<void> {
    console.log("test : ", this.nodeMailerSenderAdapter)
  }
}
