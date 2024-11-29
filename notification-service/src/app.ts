import { SendMailUseCase } from "./core/usecases/SendMailUseCase";
import { NodeMailerSenderAdapter } from "./infra/adapters/NodeMailerSenderAdapter";
import { RabbitMQConsumerAdapter } from "./infra/adapters/RabbitMQConsumerAdapter";
import { rabbitMQConfig } from "./infra/config/RabbitMQConfig";

export function initializeApp() {
    const rabbitMQConsumer = new RabbitMQConsumerAdapter();
    const NotificationSender = new NodeMailerSenderAdapter();
    const sendMailUseCase = new SendMailUseCase(NotificationSender);
    rabbitMQConsumer.consume(rabbitMQConfig.queues.notificationA, async(notification) => {

        sendMailUseCase.execute(notification);
        console.log("mail sending, dirou lmechwi")
    })

    return {rabbitMQConsumer}

}