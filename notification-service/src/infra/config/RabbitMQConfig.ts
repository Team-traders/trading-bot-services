export const rabbitMQConfig = {
    url: process.env.RABBITMQ_URL || 'amqp://localhost',
    queues: {
        notificationA: 'Test',
        notificationB: 'NotificationB',
    },
    options: {
        durable: true, // Queues persistantes
    },
};