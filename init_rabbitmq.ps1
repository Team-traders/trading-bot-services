Write-Output "Running RabbitMQ setup commands..."

# Wait for RabbitMQ and MongoDB to initialize
Start-Sleep -Seconds 5

# # Run RabbitMQ setup commands
npm run command:mooc:rabbitmq
npm run command:backoffice:rabbitmq
npm run command:mechoui3:rabbitmq
npm run command:strategyService:rabbitmq
npm run command:mechoui:rabbitmq
npm run command:example:rabbitmq
