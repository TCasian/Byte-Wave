import "./App.css";
import Header from "./componenti/Header.jsx";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./supabaseClient.js";
import Security from "./pages/security/security";
import AddArticles from "./pages/add-articles/add-articles";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home/Home.jsx";
import { TermsOfService } from "./pages/policy/terms-of-service.jsx";

function App() {
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("⚡ Evento auth:", event);
      if (session?.user) {
        console.log("🔐 Loggato:", session.user);
      } else {
        console.log("🚪 Logout o sessione scaduta");
      }
      if (window.google && window.google.accounts?.id) {
        window.google.accounts.id.disableAutoSelect();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/security" element={<Security />} />
        <Route path="/add-articles" element={<AddArticles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
}

export default App;
