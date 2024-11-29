import { NodeMailerSenderAdapter } from "../../infra/adapters/NodeMailerSenderAdapter";
import { Notification } from "../entities/Notification";
import { SendMailService } from "../services/SendMailService";
import dotenv from 'dotenv'

dotenv.config();

export class SendMailUseCase {
    constructor(private mailSender : NodeMailerSenderAdapter) {}

    async execute(notification : any) : Promise<void> {

        const mailOptions = {
            from: process.env.USER_MAIL || "EMPTY",
            to : notification.recipient, // Adresse du destinataire
            subject : "noreply", // Sujet
            text : SendMailService.getTemplateMail('AlertTriggeredEvent') // Contenu de l'email
          };
          
        await this.mailSender.send(mailOptions);
    }
}