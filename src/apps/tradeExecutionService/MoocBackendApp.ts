import { EventBus } from '../../Contexts/Shared/domain/EventBus';
import container from './dependency-injection';
import { DomainEventSubscribers } from '../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { Server } from './server';
import { RabbitMqConnection } from '../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { ExecuteTradeOnTradeSignal } from '../../Contexts/tradeExecutionService/Courses/application/services/ExecuteTradeOnTradeSignal';
import { BrokerAPI } from '../../Contexts/tradeExecutionService/Courses/application/services/BrokerAPI';
import { MexcBroker } from '../../Contexts/tradeExecutionService/Courses/application/services/brokers/MexcBroker';

export class MoocBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5004';
    this.server = new Server(port);

    console.log('Starting server on port', port);

    await this.configureEventBus();

    console.log('Event bus configured');

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    console.log('Stopping server');
    const rabbitMQConnection = container.get<RabbitMqConnection>('TradeExecutionService.Shared.RabbitMQConnection');
    await rabbitMQConnection.close();
    return this.server?.stop();
  }

  private async configureEventBus() {
    const eventBus = container.get<EventBus>('TradeExecutionService.Shared.domain.EventBus');
    const rabbitMQConnection = container.get<RabbitMqConnection>('TradeExecutionService.Shared.RabbitMQConnection');
    await rabbitMQConnection.connect();

    console.log('RabbitMQ connection established');

    const brokerAPI: BrokerAPI = new MexcBroker();
    const executeTradeOnTradeSignal = new ExecuteTradeOnTradeSignal(brokerAPI, eventBus);

    eventBus.addSubscribers(DomainEventSubscribers.from(container));
    eventBus.addSubscribers(new DomainEventSubscribers([executeTradeOnTradeSignal]));

    console.log('Subscribed to TradeSignalDomainEvent');
  }
}
