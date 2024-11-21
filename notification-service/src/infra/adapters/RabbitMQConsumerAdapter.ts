import { rabbitMQConfig } from "../config/RabbitMQConfig";
import { EventConsumer } from "../ports/EventConsumer";
import amqp, { Channel, Connection } from 'amqplib';

export class RabbitMQConsumerAdapter implements EventConsumer {
    private channel : Channel | undefined
    private connection : Connection | undefined

    async consume(queuName: string, callback: (event: any) => Promise<void>): Promise<void> {

        try {
            const connection = await amqp.connect('amqp://localhost');
            const channel = await connection.createChannel();
    
            // Assurer que la queue existe
            await channel.assertQueue(queuName, rabbitMQConfig.options);
            console.log(`Listening to queue: ${queuName}`);
            
            this.channel?.consume(queuName, async (msg) => {
                if (msg) {
                    const messageContent = JSON.parse(msg.content.toString());
                    await callback(messageContent);
                    this.channel!.ack(msg);
                }
    
            })
        } catch(error) {
            console.log(error)
        }

    }

    async stop(): Promise<void> {
        if (this.channel) await this.channel.close();
        if (this.connection) await this.connection.close();
    }
    
}