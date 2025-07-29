# Set the script to exit on any errors
$ErrorActionPreference = "Stop"

# Initialize Docker containers
Write-Output "Initializing Docker containers..."
& docker compose up -d

# Wait for RabbitMQ and MongoDB to initialize
Write-Output "Waiting for services to initialize..."
Start-Sleep -Seconds 5

# Run RabbitMQ setup commands
Write-Output "Running RabbitMQ setup commands..."
& .\init_rabbitmq.ps1

# Start development servers
Write-Output "Starting development servers..."
Start-Process -NoNewWindow -FilePath npm -ArgumentList "run windows:dev:mooc:backend"
Start-Process -NoNewWindow -FilePath npm -ArgumentList "run windows:dev:alertService:backend"
Start-Process -NoNewWindow -FilePath npm -ArgumentList "run windows:dev:strategyService:backend"
Start-Process -NoNewWindow -FilePath npm -ArgumentList "run windows:dev:mechoui3:backend"
Start-Process -NoNewWindow -FilePath npm -ArgumentList "run windows:dev:backoffice:backend"
Start-Process -NoNewWindow -FilePath npm -ArgumentList "run windows:dev:example:backend"

Write-Output "All services are running. Press Ctrl+C to exit."
