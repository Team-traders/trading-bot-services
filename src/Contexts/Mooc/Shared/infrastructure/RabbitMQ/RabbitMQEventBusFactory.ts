import { CorrelationIdService } from '../../../../Shared/infrastructure/CorrelationIdService';
import { DomainEventFailoverPublisher } from '../../../../Shared/infrastructure/EventBus/DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { RabbitMqConnection } from '../../../../Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { RabbitMQEventBus } from '../../../../Shared/infrastructure/EventBus/RabbitMQ/RabbitMqEventBus';
import { RabbitMQqueueFormatter } from '../../../../Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter';
import { RabbitMQConfig } from './RabbitMQConfigFactory';
import { LoggerPort } from '../../../../Shared/domain/Logger';

export class RabbitMQEventBusFactory {
  static create(
    failoverPublisher: DomainEventFailoverPublisher,
    connection: RabbitMqConnection,
    queueNameFormatter: RabbitMQqueueFormatter,
    config: RabbitMQConfig,
    correlationIdService: CorrelationIdService,
    logger: LoggerPort,
  ): RabbitMQEventBus {
    return new RabbitMQEventBus({
      failoverPublisher,
      connection,
      exchange: config.exchangeSettings.name,
      queueNameFormatter: queueNameFormatter,
      maxRetries: config.maxRetries,
      // correlationIdService,
      // logger,
    });
  }
}
