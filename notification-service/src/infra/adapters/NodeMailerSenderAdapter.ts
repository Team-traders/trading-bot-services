import { MailOption } from "../../core/entities/MailOption";
import { Notification } from "../../core/entities/Notification";
import { NotificationSender } from "../ports/NotificationSender";
import nodemailer from 'nodemailer';


export class NodeMailerSenderAdapter implements NotificationSender {

    // Configurer le transporteur SMTP
private transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "d26e88cefe86fa6bca5ab3dcf1f7ab94",
    },
  });

    async send(mailOption : MailOption): Promise<void> {
        const mailOptions = mailOption;
        
          try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`Email envoyé avec succès : ${info.messageId}`);
          } catch (err) {
            console.error('Erreur lors de l\'envoi de l\'email :', err);
            throw new Error('Erreur lors de l\'envoi de l\'email');
          }
    }

}