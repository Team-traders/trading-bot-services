import { NodeMailerSenderAdapter } from "../../infra/adapters/NodeMailerSenderAdapter";
import { Notification } from "../entities/Notification";
import { SendMailService } from "../services/SendMailService";

export class SendMailUseCase {
    constructor(private mailSender : NodeMailerSenderAdapter) {}

    async execute(notification : Notification) : Promise<void> {

        const mailOptions = {
            from: 'hello@demomailtrap.com', // Adresse de l'expéditeur
            to : notification.recepient, // Adresse du destinataire
            subject : "noreply", // Sujet
            text : SendMailService.getTemplateMail('AlertTriggeredEvent') // Contenu de l'email
          };
        await this.mailSender.send(mailOptions);
    }
}