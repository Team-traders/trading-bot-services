import { NodeMailerSenderAdapter } from "../../infrastructure/adapters/NodeMailerSenderAdapter";
import { SendMailService } from "../services/SendMailService";
import { MailOption } from "../../domain/valueObjects/MailOption";
import { AlertTriggeredDomainEvent } from "../../../../alertService/alerts/domain/AlertDomainEvent";


export class SendMailUseCase {
    constructor(private mailSender : NodeMailerSenderAdapter) {}

    async execute(event : AlertTriggeredDomainEvent) : Promise<void> {

        const mailTemplate = SendMailService.createMailFactory(event.eventName);

        //il manque lde destinataire ou la personne concernée sur l'alertTriggered domain event
        const mailOptions : MailOption = {
            from: process.env.USER_MAIL || "EMPTY",
            to : "samy1fergui@gmail.com", // Adresse du destinataire
            subject : process.env.SUBJECT_MAIL || "subject", // Sujet
            text : mailTemplate // Contenu de l'email
          };
          
        await this.mailSender.send(mailOptions);
    }
}