import { MailOption } from "../../domain/valueObjects/MailOption";
import { NotificationSender } from "../../infrastructure/ports/NotificationSender";
import nodemailer from 'nodemailer';



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