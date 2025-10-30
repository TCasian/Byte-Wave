
import './App.css'
import Header from './componenti/Header.jsx'
import { useEffect } from 'react'

import { supabase } from './supabaseClient.js'
function App() {

  useEffect(() => {
    async function testConnection() {
      console.log("🔍 Test connessione Supabase in corso...")

      // Prova a fare una chiamata leggera
      const { data, error } = await supabase.from('articles').select('*').limit(1)

      if (error) {
        console.error("❌ Connessione fallita:", error.message)
      } else {
        console.log("✅ Connessione riuscita! Supabase funziona:", data)
      }
    }

    testConnection()
  }, [])


  return (
    <>
      <Header />
      <div className="top-headlines">
        <div className='titles'></div>
        <div className='articles'></div>
      </div>
      <div className="ad-space"></div>
    </>
  )
}

export default App
