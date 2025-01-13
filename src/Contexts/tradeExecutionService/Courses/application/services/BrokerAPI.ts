import { TradeSignalDomainEvent } from '../../../../../Events/TradeSignalEvent';
import { TradeExecutedDomainEvent } from '../../domain/TradeExecutedEvent';

export interface BrokerAPI {
    executeTrade(tradeSignal: TradeSignalDomainEvent): Promise<TradeExecutedDomainEvent>;
}