import axios from "axios";

function Security() {
  async function sendTestEmail() {
    console.log("tutto" + import.meta.env.VITE_SMTP_API);
    try {
      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: { name: "Sender Alex", email: "mitocarucasian@gmail.com" },
          to: [
            { email: "mitocarucasian@protonmail.com", name: "John Doe" }, // sostituisci con la tua email
          ],
          subject: "Test Email Brevo",
          htmlContent:
            "<html><head></head><body><p>Hello,</p><p>This is a test email from Brevo API.</p></body></html>",
        },
        {
          headers: {
            accept: "application/json",
            "api-key": import.meta.env.VITE_SMTP_API, // imposta la tua API key come env
            "content-type": "application/json",
          },
        }
      );

      console.log("✅ Email inviata con successo:", response.data);
    } catch (err) {
      console.error(
        "❌ Errore invio email:",
        err.response?.data || err.message
      );
    }
  }

  return (
    <div
      style={{
        display: "flex",
        background: "black",
        color: "white",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Pagina Security
      <button onClick={sendTestEmail}>invia email</button>
    </div>
  );
}

export default Security;
