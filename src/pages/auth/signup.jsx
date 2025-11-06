import React, { useState } from "react";
import "./auth.css";
import { supabase } from "../../supabaseClient";
import PixelBlast from "./PixelBlast";
import {CheckboxItem} from "../../componenti/checkbox";
import { useNavigate } from "react-router-dom";

function Signup() {
  const usernameRegex = /^[a-zA-Z0-9._]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  const navigate  = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    errors: {},
    valid: {},
  });

  const [showPasswordChecklist, setShowPasswordChecklist] = useState(false);
  const passwordChecks = {
    length: form.password.length >= 8,
    lowercase: /[a-z]/.test(form.password),
    uppercase: /[A-Z]/.test(form.password),
    number: /\d/.test(form.password),
    symbol: /[@$!%*?&]/.test(form.password),
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    let error = "";
    let isValid = false;
    switch (field) {
      case "username":
        if (!usernameRegex.test(value)) error = "Invalid username (3-20 chars, letters/numbers only)";
        else isValid = true;
        break;
      case "email":
        if (!emailRegex.test(value)) error = "Invalid email format";
        else isValid = true;
        break;
      case "password":
        if (!passwordRegex.test(value)) error = "Weak password";
        else isValid = true;
        break;
      default:
        break;
  }
  setStatus((prev) => ({
    errors: { ...prev.errors, [field]: error },
    valid: { ...prev.valid, [field]: isValid },
    }));
  };

  async function handleRegister(username, email, password) {
    const body = {username, email, password };
    console.log("➡️ Inviando:", body);

  const res = await fetch(
    "https://pwddgvpjpqpvludspjwr.supabase.co/functions/v1/create-user",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  const error = data?.error;
    console.log("➡️ ricevuto", data);

  switch(error || data?.message) {
    case "USERNAME_TAKEN":
      alert("Username already taken. Please choose another one.");
      break;
    case "EMAIL_TAKEN":
      alert("Email already registered. Please use another email.");
      break;
    case "OK_SUCCESS":
      alert("Registration successful! You can now log in.");
      break;
    default:
      alert("An unexpected error occurred. Please try again later.");
      break;
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

      <form className="form-auth"onSubmit={(e) => {
          e.preventDefault();
          handleRegister(form.username, form.email, form.password);
        }}>
        <h1 style={{ color: "#fff", textAlign: "center" , marginTop: "0px"}}>Signup</h1>

        <input
          className={`input-auth ${status.valid.username ? "valid" : ""} ${status.errors.username ? "invalid" : ""}`}
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
          required
        />
        {status.errors.username && <p className="error-text">{status.errors.username}</p>}

        <input
          className={`input-auth ${status.valid.email ? "valid" : ""} ${status.errors.email ? "invalid" : ""}`}
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        {status.errors.email && <p className="error-text">{status.errors.email}</p>}


        <input
          className={`input-auth ${status.valid.password ? "valid" : ""} ${status.errors.password ? "invalid" : ""}`}
          type="password"
          placeholder="Password"
          value={form.password}
          onFocus={() =>  setShowPasswordChecklist(true)}
          onBlur={() => setShowPasswordChecklist(false)}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />

        <div className="password-checklist" style={{ display: showPasswordChecklist ? "flex" : "none" }}>
              <CheckboxItem isMet={passwordChecks.length} label="Atlest 8 characters" />
              <CheckboxItem isMet={passwordChecks.lowercase} label="At least one lowercase letter" />
              <CheckboxItem isMet={passwordChecks.uppercase} label="At least one uppercase letter" />
              <CheckboxItem isMet={passwordChecks.number} label="At least one number" />
              <CheckboxItem isMet={passwordChecks.symbol} label="At least one special character " />
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
