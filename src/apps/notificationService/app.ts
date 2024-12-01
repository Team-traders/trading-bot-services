import { SendMailUseCase } from "../../Contexts/notificationService/mails/application/usecases/SendMailUseCase";
import { NodeMailerSenderAdapter } from "../../Contexts/notificationService/mails/infra/adapters/NodeMailerSenderAdapter";
import { RabbitMQConsumerAdapter } from "../../Contexts/notificationService/mails/infra/adapters/RabbitMQConsumerAdapter";
import { rabbitMQConfig } from "../../Contexts/notificationService/mails/infra/config/RabbitMQConfig";

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