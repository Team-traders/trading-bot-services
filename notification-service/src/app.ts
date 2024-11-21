import { RabbitMQConsumerAdapter } from "./infra/adapters/RabbitMQConsumerAdapter";
import { rabbitMQConfig } from "./infra/config/RabbitMQConfig";

export function initializeApp() {
    const rabbitMQConsumer = new RabbitMQConsumerAdapter();
    rabbitMQConsumer.consume(rabbitMQConfig.queues.notificationA, async(event) => {
        //envoyer le mail
        console.log(event)
        console.log("mail sending")
    })

    return {rabbitMQConsumer}

}