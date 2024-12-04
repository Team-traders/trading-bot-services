#!/bin/bash

# Function to start or create a MongoDB container
start_mongodb() {
    if docker ps -a --format '{{.Names}}' | grep -q '^mongodb$'; then
        echo "MongoDB container already exists. Starting it..."
        docker start mongodb
    else
        echo "Creating and starting a new MongoDB container..."
        docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
    fi
}

# Function to start or create a RabbitMQ container
start_rabbitmq() {
    if docker ps -a --format '{{.Names}}' | grep -q '^rabbitmq$'; then
        echo "RabbitMQ container already exists. Starting it..."
        docker start rabbitmq
    else
        echo "Creating and starting a new RabbitMQ container..."
        docker run --name rabbitmq -p 5672:5672 -p 15672:15672 -d rabbitmq:4.0-management
    fi
}

# Initialize Docker containers
echo "Initializing Docker containers..."
start_mongodb
start_rabbitmq
echo "Docker containers are ready."
