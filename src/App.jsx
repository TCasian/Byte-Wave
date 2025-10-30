
import './App.css'
import Header from './componenti/Header.jsx'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { supabase } from './supabaseClient.js'
import Security from './pages/security/security'
import AddArticles from './pages/add-articles/add-articles';
import Login from './pages/auth/login'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <div className="top-headlines">
              <div className='titles'></div>
              <div className='articles'></div>
            </div>
            <div className="ad-space"></div>
          </>
        } />

        <Route path="/security" element={<Security />} />
        <Route path="/add-articles" element={<AddArticles />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
