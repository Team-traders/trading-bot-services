import { MailOption } from "../../core/entities/MailOption";
import { Notification } from "../../core/entities/Notification";
import { NotificationSender } from "../ports/NotificationSender";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import SMTPTransport from "nodemailer/lib/smtp-transport";

dotenv.config()


export class NodeMailerSenderAdapter implements NotificationSender {

    // Configurer le transporteur SMTP
private transporter : any

    async send(mailOption : MailOption): Promise<void> {
      const transporter : any = {
        host: process.env.HOST_GMAIL || "EMPTY",
        port: parseInt(process.env.PORT || "EMPTY"), // Assurez-vous que le port est un nombre
        secure : true,
        auth: {
          user: process.env.USER_MAIL || "EMPTY",
          pass:  process.env.PASSWORD_APPLICATION || "EMPTY",
        },
      }

      this.transporter = nodemailer.createTransport(transporter);
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