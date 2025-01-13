# Run RabbitMQ setup commands
echo "Running RabbitMQ setup commands..."
yarn command:strategyService:rabbitmq
yarn command:alertService:rabbitmq
yarn command:notificationService:rabbitmq
yarn command:backoffice:rabbitmq
yarn command:mooc:rabbitmq
yarn command:pricingService:rabbitmq
#yarn command:pricingService:rabbitmq
