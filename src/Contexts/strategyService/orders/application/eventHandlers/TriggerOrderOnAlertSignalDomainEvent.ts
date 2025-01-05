import { AlertTriggeredDomainEvent } from '../../../../../Events/AlertTriggeredEvent';
import { TradeSignalDomainEvent } from '../../../../../Events/TradeSignalEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { Order } from '../../domain/Order';


export class TriggerOrderOnAlertDomainEvent
  implements DomainEventSubscriber<AlertTriggeredDomainEvent>
{

  constructor(
    private readonly eventBus: EventBus,
  ) {}

  subscribedTo(): DomainEventClass[] {
    return [AlertTriggeredDomainEvent];
  }

  async on(domainEvent: AlertTriggeredDomainEvent): Promise<void> {
    const alert = domainEvent;
    await this.processOrderOnAlert
    console.log(alert);


  }


  private async processOrderOnAlert(order : Order[]) {

    //TODO : sauvegarder l'order en base de donnée. 

    //publier l'evenement
    await this.publishTradeSignalEvent(order);
    
  }

  private async publishTradeSignalEvent(order: Order[]): Promise<void> {
    const events = order.map((order: Order) => this.createTradeTriggeredEvent(order));
    await this.eventBus.publish(events);

  }



  private createTradeTriggeredEvent(order: Order): TradeSignalDomainEvent {
    const {
      symbol,
      entryPrice,
      stopLoss,
      takeProfit,
      tradeAmount,
    } = order.toPrimitives();
  
    // Initialisation des champs manquants
    const action = "BUY"; // Action par défaut, par exemple "BUY" ou "SELL"
    const strategyId = "default-strategy-id"; // Identifiant de stratégie par défaut
    const aggregateId = "trade-aggregate-id"; // ID d'agrégat par défaut
    const eventId = "trade-event-id"; // ID d'événement par défaut (peut être généré dynamiquement si nécessaire)
    const occurredOn = new Date(); // Date actuelle comme date d'occurrence
  
    return new TradeSignalDomainEvent({
      aggregateId,
      symbol,
      action,
      entryPrice,
      stopLoss,
      takeProfit,
      tradeAmount,
      strategyId,
      eventId,
      occurredOn,
    });
  }

}
