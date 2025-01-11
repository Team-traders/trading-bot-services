    # Run RabbitMQ setup commands
    echo "Running RabbitMQ setup commands..."
    yarn command:strategyService:rabbitmq
    yarn command:alertService:rabbitmq
    yarn command:notificationService:rabbitmq
    #yarn command:pricingService:rabbitmq