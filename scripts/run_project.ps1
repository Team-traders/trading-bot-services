# Set the script to exit on any errors
$ErrorActionPreference = "Stop"

# Initialize Docker containers
Write-Output "Initializing Docker containers..."
& .\init_docker.ps1

# Wait for RabbitMQ and MongoDB to initialize
Write-Output "Waiting for services to initialize..."
Start-Sleep -Seconds 10

# Run RabbitMQ setup commands
Write-Output "Running RabbitMQ setup commands..."
# yarn windows:command:mooc:rabbitmq
# yarn windows:command:backoffice:rabbitmq
# yarn windows:command:mechoui3:rabbitmq
# yarn windows:command:strategyService:rabbitmq
# yarn windows:command:mechoui:rabbitmq
# yarn windows:command:example:rabbitmq

# Initialize Docker containers
Write-Output "Initializing Docker containers..."
& .\init_docker.ps1

# Wait for RabbitMQ and MongoDB to initialize
Write-Output "Waiting for services to initialize..."
# Start-Sleep -Seconds 10

# # Run RabbitMQ setup commands
# Write-Output "Running RabbitMQ setup commands..."
# npm run command:mooc:rabbitmq
# npm run command:backoffice:rabbitmq
# npm run command:mechoui3:rabbitmq
# npm run command:strategyService:rabbitmq
# npm run command:mechoui:rabbitmq
# npm run command:example:rabbitmq

# Start development servers
Write-Output "Starting development servers..."
Start-Process -NoNewWindow -FilePath npm -ArgumentList "run windows:dev:mooc:backend"
Start-Process -NoNewWindow -FilePath npm -ArgumentList "run windows:dev:alertService:backend"
Start-Process -NoNewWindow -FilePath npm -ArgumentList "run windows:dev:strategyService:backend"
Start-Process -NoNewWindow -FilePath npm -ArgumentList "run windows:dev:mechoui3:backend"
Start-Process -NoNewWindow -FilePath npm -ArgumentList "run windows:dev:backoffice:backend"
Start-Process -NoNewWindow -FilePath npm -ArgumentList "run windows:dev:example:backend"

Write-Output "All services are running. Press Ctrl+C to exit."
