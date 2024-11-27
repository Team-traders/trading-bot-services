# Function to stop a container if it's running
function Stop-Container {
    param (
        [string]$ContainerName
    )

    if (docker ps --format '{{.Names}}' | Select-String -Pattern "^$ContainerName$") {
        Write-Output "Stopping $ContainerName container..."
        docker stop $ContainerName
    } else {
        Write-Output "$ContainerName container is not running."
    }
}

# Stop MongoDB and RabbitMQ containers
Write-Output "Stopping Docker containers..."
Stop-Container "mongodb"
Stop-Container "rabbitmq"
Write-Output "Docker containers stopped."
