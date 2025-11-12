import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true per 465 SSL
  auth: {
    user: "techripplesofficial@gmail.com",
    pass: "klir vyzt eicg ubxp",
  },
});

const mailOptions = {
  from: '"TechRipples" <techripplesofficial@gmail.com',
  to: "sebastianoiorio220@gmail.com",
  subject: "Importante PORCODIO",
  text: "Sei un frocio di merda porcodio",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log("Errore invio email:", error);
  }
  console.log("Email inviata:", info.response);
});
