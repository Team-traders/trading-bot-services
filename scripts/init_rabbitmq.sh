    # Run RabbitMQ setup commands
    echo "Running RabbitMQ setup commands..."
    yarn command:mooc:rabbitmq
    yarn command:backoffice:rabbitmq
    yarn command:mechoui3:rabbitmq
    yarn command:strategyService:rabbitmq
    yarn command:alertService:rabbitmq
    yarn command:notificationService:rabbitmq
    yarn command:example:rabbitmq