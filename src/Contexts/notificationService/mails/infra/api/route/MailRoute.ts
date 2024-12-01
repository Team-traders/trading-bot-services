import express, { Request, Response } from 'express';
import { sendMail } from '../service/EmailService'; // Import de la fonction depuis le service

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

router.post('/send-email', async (req: Request, res: any ) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Les champs "to", "subject" et "text" sont requis.' });
  }

  try {
    // Appel à la fonction d'envoi d'email depuis le service
    await sendMail(to, subject, text);
    res.status(200).json({ message: 'Email envoyé avec succès.' });
  } catch (err: any) {
    console.error('Erreur lors de l\'envoi de l\'email :', err);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
  }
});

export default router;
