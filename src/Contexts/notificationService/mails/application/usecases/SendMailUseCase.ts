import { NodeMailerSenderAdapter } from "../../infra/adapters/NodeMailerSenderAdapter";
import { Notification } from "../../domain/entities/Notification";
import { SendMailService } from "../services/SendMailService";
import dotenv from 'dotenv'
import { MailOption } from "../../domain/valueObjects/MailOption";

dotenv.config();

export class SendMailUseCase {
    constructor(private mailSender : NodeMailerSenderAdapter) {}

    async execute(notification : any) : Promise<void> {

        const mailOptions : MailOption = {
            from: process.env.USER_MAIL || "EMPTY",
            to : notification.recipient, // Adresse du destinataire
            subject : process.env.SUBJECT_MAIL || "subject", // Sujet
            text : SendMailService.getTemplateMail('AlertTriggeredEvent') // Contenu de l'email
          };
          
        await this.mailSender.send(mailOptions);
    }
}