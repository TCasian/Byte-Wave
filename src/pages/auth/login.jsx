import React from "react";
import "./auth.css";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import PixelBlast from "./PixelBlast";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("✅ Utente loggato:", data.user);
      console.log("🪪 Token:", data.session.access_token);

      if (error) {
        setMessage(`Errore: ${error.message}`);
      } else {
        setMessage("Login avvenuto con successo!");
      }
    } catch (err) {
      setMessage(`Errore: ${err.message}`);
    }
  };

  async function handleSignInWithGoogle(response) {
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
      });

      if (error) {
        console.error("❌ Errore login con Google:", error.message);
        alert("Errore durante il login con Google: " + error.message);
        return;
      }

      console.log("✅ Login Google riuscito:", data);

      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData?.session) {
        console.log("🪪 Sessione:", sessionData.session);
        navigate("/dashboard");
      } else {
        alert("Non è stato possibile avviare la sessione. Riprova.");
      }
    } catch (err) {
      console.error("⚠️ Errore inaspettato:", err);
      alert("Errore inaspettato: " + err.message);
    }
  }

  return (
    <div className="container-auth">
      <PixelBlast
        variant="circle"
        pixelSize={6}
        patternScale={3}
        patternDensity={1.2}
        pixelSizeJitter={0.5}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid
        liquidStrength={0}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.6}
        edgeFade={0.25}
        transparent
      />
      <script src="https://accounts.google.com/gsi/client" async></script>

      <form onSubmit={handleLogin} className="form-auth">
        <h1 style={{ color: "#fff", textAlign: "center" }}>Login</h1>

        <input
          className="input-auth"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="input-auth"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label
          style={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember Me
        </label>

        <button type="submit" className="submit-button">
          Accedi
        </button>
        <div className="signup-div">
          <h4>You don't have an account?</h4>{" "}
          <h4 className="link-signup" onClick={() => navigate("/signup")}>
            Sign Up
          </h4>
        </div>

        {message && (
          <p style={{ color: "#fff", textAlign: "center" }}>{message}</p>
        )}

        <div
          id="g_id_onload"
          data-client_id="201191962997-pqvlvqmsqeo10qcgcrj1bojah5b1vqrj.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="popup"
          data-callback="handleSignInWithGoogle"
          data-nonce=""
          data-auto_select="true"
          data-itp_support="true"
          data-use_fedcm_for_prompt="true"
        ></div>
        <div
          class="g_id_signin"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
        ></div>
      </form>
    </div>
  );
}

export default Login;
