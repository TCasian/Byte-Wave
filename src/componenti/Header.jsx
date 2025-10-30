import { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import './Header.css';

import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../features/menu/menuSlice";
import { Link } from 'react-router-dom'


function Header() {
  const menuOpen = useSelector((state) => state.menu.open);
  const dispatch = useDispatch();

  const links = [
    { name: "Latest", path: "/" },
    { name: "Security", path: "/security" },
    { name: "AI", path: "/ai" },
    { name: "Startups", path: "/startups" },
    { name: "Venture", path: "/venture" },
    { name: "Blockchain", path: "/blockchain" },
    { name: "Newsletters", path: "/newsletters" }
  ];

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo-section">
        <img src="logo.png" alt="Logo" className="logo-img" />
        <span className="logo-title">ByteWave</span>
      </div>

      {/* Navbar */}
      <nav className={`nav active`}>
        {links.map(link => (
          <div key={link.name} className="nav-item">
            <Link to={link.path}>{link.name}</Link>
          </div>
        ))}
      </nav>

      {/* Icone */}
      <div className="icons">
        <div className="icon"> 
            <FaSearch className="search-icon" />
         </div>
        <div className="icon"> 
             <div className="burger" onClick={() => dispatch(toggleMenu())} >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        </div>
      </div>
      
    </header>
  );
}

export default Header;
