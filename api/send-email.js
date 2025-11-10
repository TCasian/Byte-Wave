import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { subject, text, recipients } = req.body; // recipients = array di email

  const transporter = nodemailer.createTransport({
    host: process.env.VITE_SMTP_HOST,
    port: process.env.VITE_SMTP_PORT,
    secure: false, // true solo se SSL
    auth: {
      user: process.env.VITE_SMTP_USER,
      pass: process.env.VITE_SMTP_PASS,
    },
  });

  try {
    // invio multiplo
    await Promise.all(
      recipients.map((email) =>
        transporter.sendMail({
          from: process.env.VITE_SMTP_USER,
          to: email,
          subject,
          text,
        })
      )
    );

    res.status(200).json({ message: "Tutte le email inviate!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore invio email", error: err });
  }
}
