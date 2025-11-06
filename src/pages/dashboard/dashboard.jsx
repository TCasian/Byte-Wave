import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("❌ Errore durante il logout:", error.message);
    } else {
      console.log("✅ Logout avvenuto con successo");
      navigate("/login"); // torna alla pagina di login
    }
  };

  return (
    <center>
      <button onClick={signOut}>Sign Out</button>
    </center>
  );
}

export default Dashboard;
