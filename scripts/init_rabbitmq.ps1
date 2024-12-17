Write-Output "Running RabbitMQ setup commands..."

# Wait for RabbitMQ and MongoDB to initialize
Start-Sleep -Seconds 5

# # Run RabbitMQ setup commands
npm run windows:command:mooc:rabbitmq
npm run windows:command:backoffice:rabbitmq
npm run windows:command:pricingService:rabbitmq
npm run windows:command:mechoui3:rabbitmq
npm run windows:command:strategyService:rabbitmq
npm run windows:command:alertService:rabbitmq
npm run windows:command:notificationService:rabbitmq
npm run windows:command:example:rabbitmq
