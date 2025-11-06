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
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="top-headlines">
                <div className="titles"></div>
                <div className="articles"></div>
              </div>
              <div className="ad-space"></div>
            </>
          }
        />

        <Route path="/security" element={<Security />} />
        <Route path="/add-articles" element={<AddArticles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
