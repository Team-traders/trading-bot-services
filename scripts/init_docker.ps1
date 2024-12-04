# Fonction pour démarrer ou créer un conteneur MongoDB
function Start-MongoDB {
    if (docker ps -a --format '{{.Names}}' | Select-String -Pattern '^mongodb$') {
        Write-Output "Le conteneur MongoDB existe déjà. Démarrage..."
        docker start mongodb
    } else {
        Write-Output "Création et démarrage d'un nouveau conteneur MongoDB..."
        docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
    }
}

# Fonction pour démarrer ou créer un conteneur RabbitMQ
function Start-RabbitMQ {
    if (docker ps -a --format '{{.Names}}' | Select-String -Pattern '^rabbitmq$') {
        Write-Output "Le conteneur RabbitMQ existe déjà. Démarrage..."
        docker start rabbitmq
    } else {
        Write-Output "Création et démarrage d'un nouveau conteneur RabbitMQ..."
        docker run --name rabbitmq -p 5672:5672 -p 15672:15672 -d rabbitmq:4.0-management
    }
}

# Initialiser les conteneurs Docker
Write-Output "Initialisation des conteneurs Docker..."
Start-MongoDB
Start-RabbitMQ
Write-Output "Les conteneurs Docker sont prêts."
