#!/bin/bash

# Function to stop a container if it's running
stop_container() {
    local container_name=$1

    if docker ps --format '{{.Names}}' | grep -q "^${container_name}$"; then
        echo "Stopping ${container_name} container..."
        docker stop "${container_name}"
    else
        echo "${container_name} container is not running."
    fi
}

# Stop MongoDB and RabbitMQ containers
echo "Stopping Docker containers..."
docker compose down
echo "Docker containers stopped."
