import { TradeSignalDomainEvent } from '../../../../../Events/TradeSignalEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { BrokerAPI } from './BrokerAPI';

export class ExecuteTradeOnTradeSignal implements DomainEventSubscriber<TradeSignalDomainEvent> {
    constructor(private broker: BrokerAPI, private eventBus: EventBus) { }

    subscribedTo(): DomainEventClass[] {
        return [TradeSignalDomainEvent];
    }

    async on(domainEvent: TradeSignalDomainEvent): Promise<void> {
        const executedTrade = await this.broker.executeTrade(domainEvent);
        await this.eventBus.publish([executedTrade]);
    }

}
