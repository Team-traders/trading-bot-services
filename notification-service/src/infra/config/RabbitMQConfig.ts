export const rabbitMQConfig = {
    url: process.env.RABBITMQ_URL || 'amqp://localhost',
    queues: {
        notificationA: 'AlertTriggeredEvent',
        notificationB: 'TradeExecutedEvent',
    },
    options: {
        durable: true, // Queues persistantes
    },
};