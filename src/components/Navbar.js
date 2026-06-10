import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService'; 
import '../styles/navbar.css';
import '../styles/global.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setIsMenuOpen(false);
    
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedPayload = JSON.parse(window.atob(base64));
        setUserRole(decodedPayload.role);
      } catch (error) {
        console.error("Failed to decode auth token:", error);
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  }, [location]);

  const handleLogout = () => {
    authService.logout();
    setUserRole(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/" className="logo">EventHub</NavLink>
      </div>
      
      <button 
        className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Navigation Menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <div className={`nav-center ${isMenuOpen ? 'mobile-open' : ''}`}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/events">Events</NavLink>
        
        {userRole === "USER" && (
          <NavLink to="/my-bookings">My Bookings</NavLink>
        )}

        {userRole === "ORGANIZER" && (
          <>
            <NavLink to="/create-event">Create Event</NavLink>
            <NavLink to="/my-bookings">Bookings</NavLink>
            <NavLink to="/organizer-dashboard">Dashboard</NavLink>
          </>
        )}

        {userRole === "ADMIN" && (
          <>
            <NavLink to="/my-bookings">My Bookings</NavLink>
            <NavLink to="/admin-dashboard">Dashboard</NavLink>
          </>
        )}
      </div>

      <div className={`nav-right ${isMenuOpen ? 'mobile-open' : ''}`}>
        {!userRole ? (
          <>
            <NavLink to="/login" className="login-btn">Login</NavLink>
            <NavLink to="/register" className="register-btn">Register</NavLink>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;