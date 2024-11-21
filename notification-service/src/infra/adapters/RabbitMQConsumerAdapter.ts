import { EventConsumer } from "../ports/EventConsumer";

export class RabbitMQConsumerAdapter implements EventConsumer {
    consume(queuName: string, callback: (event: any) => Promise<void>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}