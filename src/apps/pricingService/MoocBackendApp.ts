import { EventBus } from '../../Contexts/Shared/domain/EventBus';
import container from './dependency-injection';
import { DomainEventSubscribers } from '../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { Server } from './server';
import { RabbitMqConnection } from '../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { MarketPriceFetcher } from '../../Contexts/pricingService/application/MarketPriceFetcher';
import { MexcMarketClient } from '../../Contexts/pricingService/infrastructure/MexcMarketClient';

export class MoocBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5004';
    this.server = new Server(port);

    await this.configureEventBus();
    const eventBus = container.get<EventBus>('PricingService.Shared.domain.EventBus');
    const marketClient = new MexcMarketClient();
    const marketPriceFetcher = new MarketPriceFetcher(eventBus, marketClient);
    marketPriceFetcher.start();

    return this.server.listen();

  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    const rabbitMQConnection = container.get<RabbitMqConnection>('PricingService.Shared.RabbitMQConnection');
    await rabbitMQConnection.close();
    return this.server?.stop();
  }

  private async configureEventBus() {
    const eventBus = container.get<EventBus>('PricingService.Shared.domain.EventBus');
    const rabbitMQConnection = container.get<RabbitMqConnection>('PricingService.Shared.RabbitMQConnection');
    await rabbitMQConnection.connect();

    eventBus.addSubscribers(DomainEventSubscribers.from(container));
  }
}
