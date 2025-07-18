import React from 'react';
import './Navbar.css';

const Navbar = ({ onLogout }) => (
  <nav className="navbar">
    <div className="navbar__logo">OAUTH Dashboard</div>
    <button className="navbar__logout" onClick={onLogout}>Logout</button>
  </nav>
);

export default Navbar; 