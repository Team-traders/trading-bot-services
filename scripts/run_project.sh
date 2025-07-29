#!/bin/bash

# Set the script to exit on any errors
set -e

# Initialize Docker containers
echo "Initializing Docker containers MongoDB and RabbitMQ..."
docker compose up -d

# Wait for RabbitMQ and MongoDB to initialize
echo "Waiting for services to initialize..."
sleep 5

# Run RabbitMQ setup commands
echo "Running RabbitMQ setup commands..."
yarn rabbitmq:init

# Start development servers
echo "Starting development servers..."
yarn dev:alertService:backend &
yarn dev:strategyService:backend &
yarn dev:notificationService:backend &
yarn dev:pricingService:backend &
yarn dev:mooc:backend &
yarn dev:backoffice:backend

# Wait for all background jobs to complete (if desired)
wait

echo "All services are running. Press Ctrl+C to exit."
