#!/bin/bash

# Set the script to exit on any errors
set -e

# Initialize Docker containers
echo "Initializing Docker containers..."
./init_docker.sh

# Wait for RabbitMQ and MongoDB to initialize
echo "Waiting for services to initialize..."
sleep 10

# Run RabbitMQ setup commands
echo "Running RabbitMQ setup commands..."
yarn command:mooc:rabbitmq
yarn command:backoffice:rabbitmq
yarn command:mechoui3:rabbitmq
yarn command:mechoui2:rabbitmq
yarn command:mechoui:rabbitmq
yarn command:example:rabbitmq

# Start development servers
echo "Starting development servers..."
yarn dev:mooc:backend &
yarn dev:mechoui:backend &
yarn dev:mechoui2:backend &
yarn dev:mechoui3:backend &
yarn dev:backoffice:backend &
yarn dev:example:backend &

# Wait for all background jobs to complete (if desired)
wait

echo "All services are running. Press Ctrl+C to exit."
