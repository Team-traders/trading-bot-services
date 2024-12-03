import { NodeMailerSenderAdapter } from "../../infra/adapters/NodeMailerSenderAdapter";
import { SendMailService } from "../services/SendMailService";
import { MailOption } from "../../domain/valueObjects/MailOption";


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