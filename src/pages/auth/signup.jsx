import React, { useState } from "react";
import "./auth.css";
import { supabase } from "../../supabaseClient";
import PixelBlast from "./PixelBlast";
import {CheckboxItem} from "../../componenti/checkbox";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", email: "", password: "" });
  const [invalidInputs, setInvalidInputs] = useState({ username: false, email: false, password: false });
  const [validInputs, setValidInputs] = useState({ username: false, email: false, password: false });
  const [showPasswordChecklist, setShowPasswordChecklist] = useState(false);

  const usernameRegex = /^[a-zA-Z0-9._]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const navigate  = useNavigate()
  const flashRed = (field) => {
    setInvalidInputs((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setInvalidInputs((prev) => ({ ...prev, [field]: false }));
    }, 1500);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (!usernameRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        username:
          "Username not valid (3-20 characters, letters, numbers, dots, and underscores only)",
      }));
      setValidInputs((prev) => ({ ...prev, username: false }));
      flashRed("username");
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
      setValidInputs((prev) => ({ ...prev, username: true }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Email non valida" }));
      flashRed("email");
      setValidInputs((prev) => ({ ...prev, email: false }));

    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
      setValidInputs((prev) => ({ ...prev, email: true }));

    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!passwordRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        password: "Weak password",
      }));
      setValidInputs((prev) => ({ ...prev, password: false }));
      flashRed("password");
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
      setValidInputs((prev) => ({ ...prev, password: true }));

    }
  };

  const showChecklist = (state) => {
    setShowPasswordChecklist(state);
  }

  async function handleRegister(username, email, password) {
    const body = { username, email, password };
    console.log("➡️ Inviando:", body);

  const res = await fetch(
    "https://pwddgvpjpqpvludspjwr.supabase.co/functions/v1/validate-subscribe",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  console.log("⬅️ Risposta:", data);
}


  // Stato dei requisiti password
  const passwordChecks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[@$!%*?&]/.test(password),
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

      <form className="form-auth"onSubmit={(e) => {
          e.preventDefault();
          handleRegister(username, email, password);
        }}>
        <h1 style={{ color: "#fff", textAlign: "center" , marginTop: "0px"}}>Signup</h1>

        {/* USERNAME */}
        <input
          className={`input-auth-signup ${validInputs.username ? "valid-input" : "input-auth-signup"} ${invalidInputs.username ? "invalid-div" : ""}`}
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        {errors.username && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.username}</p>
        )}

        {/* EMAIL */}
        <input
          className={`input-auth-signup ${validInputs.email ? "valid-input" : "input-auth-signup"} ${invalidInputs.email ? "invalid-div" : ""}`}
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.email}</p>
        )}

        {/* PASSWORD */}
        <input
          className={`input-auth-signup ${validInputs.password ? "valid-input" : "input-auth-signup"} ${invalidInputs.password ? "invalid-div" : ""}`}
          type="password"
          placeholder="Password"
          value={password}
          onFocus={() => showChecklist(true)}
          onBlur={() => showChecklist(false)}
          onChange={handlePasswordChange}
          required
        />

        {/* Lista requisiti password */}
        <div className="password-checklist" style={{ display: showPasswordChecklist ? "block" : "none" }}>
              <CheckboxItem isMet={passwordChecks.length} label="Atlest 8 characters" />
              <CheckboxItem isMet={passwordChecks.lowercase} label="At least one lowercase letter" />
              <CheckboxItem isMet={passwordChecks.uppercase} label="At least one uppercase letter" />
              <CheckboxItem isMet={passwordChecks.number} label="At least one number" />
              <CheckboxItem isMet={passwordChecks.symbol} label="At least one special character (@$!%*?&)" />
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>
        <div className='signup-div'>
          <h4>You already have an account?</h4> <h4 className='link-signup' onClick={() => navigate('/login')}>Log In</h4>
        </div>
      
      </form>
    
    </div>
  );
}

export default Signup;
