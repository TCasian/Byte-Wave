import React, { useState, userRef, useEffect } from "react";
import "./auth.css";
import { supabase } from "../../supabaseClient";
import PixelBlast from "./PixelBlast";
import { CheckboxItem } from "../../componenti/checkbox";
import Typewriter from "../../componenti/Typewriter.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showHeader } from "../../features/menu/menuSlice";

function Signup() {
  const usernameRegex = /^[a-zA-Z0-9._]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;

  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showHeader(false));
    return () => dispatch(showHeader(true));
  }, [dispatch]);

  async function handler(req, res) {
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY, // la tua API key
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Sender Alex", email: "senderalex@example.com" },
          to: [{ email: "testmail@example.com", name: "John Doe" }],
          subject: "Hello world",
          htmlContent:
            "<html><head></head><body><p>Hello,</p><p>This is my first transactional email sent from Brevo.</p></body></html>",
        }),
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Errore invio email", error: err.toString() });
    }
  }

  const [status, setStatus] = useState({
    errors: {},
    valid: {},
  });

  const [takenData, setTakenData] = useState({
    usernames: [],
    emails: [],
  });

  const [showPasswordChecklist, setShowPasswordChecklist] = useState(false);
  const passwordChecks = {
    length: form.password.length >= 8,
    lowercase: /[a-z]/.test(form.password),
    uppercase: /[A-Z]/.test(form.password),
    number: /\d/.test(form.password),
    symbol: /[@$!%*?&]/.test(form.password),
  };

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = React.useRef([]);

  async function sendEmails(email) {
    const recipients = [email];
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipients,
        subject: "Code",
        text: "Questa è una prova di invio multiplo con Brevo SMTP",
      }),
    });

    const data = await res.json();
    console.log(data);
  }

  const handleChange = (field, value, index = 0) => {
    if (field === "code") {
      const newCode = [...code];

      const val = value.slice(-1);
      newCode[index] = val;
      setCode(newCode);

      if (val && index < code.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
      return;
    }
    setForm((prev) => ({ ...prev, [field]: value }));
    let error = "";
    let isValid = false;
    switch (field) {
      case "username":
        if (!usernameRegex.test(value))
          error = "Invalid username (3-20 chars, letters/numbers only)";
        else if (takenData.usernames.includes(value))
          error = "Username already taken";
        else isValid = true;
        break;
      case "email":
        if (!emailRegex.test(value)) error = "Invalid email format";
        else if (takenData.emails.includes(value))
          error = "Email already taken";
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
    const body = { username, email, password };
    setLoading(true);
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

    switch (error || data?.message) {
      case "USERNAME_TAKEN":
        setStatus((prev) => ({
          errors: {
            ...prev.errors,
            username: "Username already taken. Please choose another one.",
          },
          valid: { ...prev.valid, username: false },
        }));
        setTakenData((prev) => ({
          ...prev,
          usernames: [...prev.usernames, username],
        }));
        break;
      case "EMAIL_TAKEN":
        setStatus((prev) => ({
          errors: {
            ...prev.errors,
            email: "Email already registered. Please use another email.",
          },
          valid: { ...prev.valid, email: false },
        }));
        setTakenData((prev) => ({
          ...prev,
          emails: [...prev.emails, email],
        }));
        break;
      case "OK_SUCCESS":
        setLoading(false);
        alert("Registration successful! You can now log in.");
        sendEmails(form.email);
        break;
      default:
        alert("An unexpected error occurred. Please try again later.");
        setLoading(false);
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

      <div className="info-container">
        <img src="Logo.svg" alt="Logo" className="logo" />
        <h1 className="info-text">TECH RIPPLES</h1>
        <Typewriter
          strings={[
            "Write. Share. Earn. All about tech.",
            "Your tech stories deserve to be read — and rewarded.",
            "Join the free tech blog where your words make money.",
          ]}
        />
      </div>

      {!loading ? (
        <form
          className="div-auth"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister(form.username, form.email, form.password);
          }}
        >
          <h1 style={{ color: "#fff", textAlign: "center", marginTop: "0px" }}>
            Sign Up For Free
          </h1>

          <input
            className={`input-auth ${status.valid.username ? "valid" : ""} ${
              status.errors.username ? "invalid" : ""
            }`}
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            required
          />
          {status.errors.username && (
            <p className="error-text">{status.errors.username}</p>
          )}

          <input
            className={`input-auth ${status.valid.email ? "valid" : ""} ${
              status.errors.email ? "invalid" : ""
            }`}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
          {status.errors.email && (
            <p className="error-text">{status.errors.email}</p>
          )}

          <input
            className={`input-auth ${status.valid.password ? "valid" : ""} ${
              status.errors.password ? "invalid" : ""
            }`}
            type="password"
            placeholder="Password"
            value={form.password}
            onFocus={() => setShowPasswordChecklist(true)}
            onBlur={() => setShowPasswordChecklist(false)}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />

          <div
            className="password-checklist"
            style={{
              display: showPasswordChecklist ? "flex" : "none",
              pointerEvents: "none",
            }}
          >
            <CheckboxItem
              isMet={passwordChecks.length}
              label="Atlest 8 characters"
            />
            <CheckboxItem
              isMet={passwordChecks.lowercase}
              label="At least one lowercase letter"
            />
            <CheckboxItem
              isMet={passwordChecks.uppercase}
              label="At least one uppercase letter"
            />
            <CheckboxItem
              isMet={passwordChecks.number}
              label="At least one number"
            />
            <CheckboxItem
              isMet={passwordChecks.symbol}
              label="At least one of (@$!%*?&) "
            />
          </div>

          <button type="submit" className="submit-button">
            Create Account
          </button>
          <div className="disclaimer-container">
            By clicking the "Create account" button, I expressly agree to the{" "}
            <span
              className="link"
              onClick={() => navigate("/terms-of-service")}
            >
              TechRipples Terms of Service
            </span>{" "}
            and understand that my account information will be used according to{" "}
            <span className="link" onClick={() => navigate("/privacy-policy")}>
              TechRipples Privacy Policy
            </span>
          </div>
          <div className="signup-div">
            <h4>You already have an account?</h4>{" "}
            <h4 className="link" onClick={() => navigate("/login")}>
              Log In
            </h4>
          </div>
        </form>
      ) : (
        <div className="div-auth">
          <h2>Verification code</h2>
          <h3>Please enter the verification code sent to {form.email}</h3>
          <div className={`otp-container ${status.errors.code ? "error" : ""}`}>
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                className="otp-box"
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange("code", e.target.value, i)}
                onKeyDown={(e) => {
                  console.log(e.key);
                  if (e.key === "Backspace" && !code[i] && i > 0) {
                    inputsRef.current[i - 1]?.focus();
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
