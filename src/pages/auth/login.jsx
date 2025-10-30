import React from 'react';
import './auth.css';
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import PixelBlast from './PixelBlast';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(`Errore: ${error.message}`);
      } else {
        setMessage("Login avvenuto con successo!");
        // puoi fare redirect o aggiornare lo stato globale
      }
    } catch (err) {
      setMessage(`Errore: ${err.message}`);
    }
  };

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
      <form onSubmit={handleLogin} className='form-auth'>
        <h1 style={{ color: "#fff", textAlign: "center" }}>Login</h1>
        
        <input
            className='input-auth'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />

        <input
            className='input-auth'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />

        <label style={{ color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Ricordami
        </label>

        <button type="submit" className='submit-button'>
          Accedi
        </button>

        {message && <p style={{ color: "#fff", textAlign: "center" }}>{message}</p>}
      </form>
    </div>
  );
}

export default Login;
