import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'
import '../styles/global.css'

function Navbar() {

  return (
    <nav className="navbar">

        <div className='nav-left'>
          <NavLink to="/" className="logo">EventHub</NavLink>
        </div>

        <div className="nav-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/events">Events</NavLink>
        </div>

        <div className="nav-right">
          <NavLink to="/login" className="login-btn">Login</NavLink>
          <NavLink to="/register" className="register-btn">Register</NavLink>
        </div>

    </nav>
  )
}

export default Navbar