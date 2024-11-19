import nodemailer from 'nodemailer';

// Configurer le transporteur SMTP
const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "d26e88cefe86fa6bca5ab3dcf1f7ab94",
  },
});


export const sendMail = async (to: string, subject: string, text: string): Promise<void> => {
  const mailOptions = {
    from: 'hello@demomailtrap.com', // Adresse de l'expéditeur
    to, // Adresse du destinataire
    subject, // Sujet
    text, // Contenu de l'email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email envoyé avec succès : ${info.messageId}`);
  } catch (err) {
    console.error('Erreur lors de l\'envoi de l\'email :', err);
    throw new Error('Erreur lors de l\'envoi de l\'email');
  }
};
