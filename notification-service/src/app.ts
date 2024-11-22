import { SendMailUseCase } from "./core/usecases/SendMailUseCase";
import { NodeMailerSenderAdapter } from "./infra/adapters/NodeMailerSenderAdapter";
import { RabbitMQConsumerAdapter } from "./infra/adapters/RabbitMQConsumerAdapter";
import { rabbitMQConfig } from "./infra/config/RabbitMQConfig";

export function initializeApp() {
    const rabbitMQConsumer = new RabbitMQConsumerAdapter();
    const NotificationSender = new NodeMailerSenderAdapter();
    const sendMailUseCase = new SendMailUseCase(NotificationSender);
    rabbitMQConsumer.consume(rabbitMQConfig.queues.notificationA, async(event) => {
        //envoyer le mail
        // TODO : monter en abstraction, a refaire
        sendMailUseCase.execute(event);
        console.log(event)
        console.log("mail sending")
    })

    return {rabbitMQConsumer}

}