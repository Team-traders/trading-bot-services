import { rabbitMQConfig } from "../config/RabbitMQConfig";
import { EventConsumer } from "../ports/EventConsumer";
import amqp, { Channel, Connection } from 'amqplib';

export class RabbitMQConsumerAdapter implements EventConsumer {

    async consume(queuName: string, callback: (event: any) => Promise<void>): Promise<void> {

        try {
            const connection = await amqp.connect('amqp://localhost');
            console.log("connection")
            const channel = await connection.createChannel();
            console.log("chanel created")
    
            // Assurer que la queue existe
            await channel.assertQueue(queuName, rabbitMQConfig.options);
            console.log(`Listening to queue: ${queuName}`);
            
            channel.consume('AlertTriggeredEvent',  async (msg) => {
                if (msg) {
                    console.log("youpi")
                    const messageContent = JSON.parse(msg.content.toString());
                    await callback(messageContent);
                    channel!.ack(msg);
                    console.log("recuuuuu")
                }

                else {
                    console.log("olala")
                }
    
            })
        } catch(error) {
            console.log(error)
        }

    }


    
}