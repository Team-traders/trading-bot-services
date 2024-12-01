const amqp = require('amqplib');

// Fonction pour publier un message sur une queue
async function publishMessage(queueName, message) {
    try {
        // Connexion à RabbitMQ
        const connection = await amqp.connect('amqp://localhost');
        console.log('Connected to RabbitMQ');
        
        // Création d'un canal
        const channel = await connection.createChannel();
        console.log('Channel created');

        // Déclaration de la queue (elle sera créée si elle n'existe pas)
        await channel.assertQueue(queueName, { durable: true });
        console.log(`Queue "${queueName}" asserted`);

        // Envoi du message
        const messageString = JSON.stringify(message);
        channel.sendToQueue(queueName, Buffer.from(messageString));
        console.log(`Message sent to queue "${queueName}":`, message);

        // Fermeture propre du canal et de la connexion
        await channel.close();
        await connection.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Error publishing message:', error.message);
    }
}

// Exemple d'utilisation
const queueName = 'AlertTriggeredEvent';
const message = {
    recipient: 'samy1fergui@gmail.com',
    subject: 'Test Email',
    message: 'Hello, this is a test message!',
};

// Publier le message
publishMessage(queueName, message);
