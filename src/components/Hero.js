// src/components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css"; // Moving hero styles to its own CSS file!
import heroBg from "../assets/hero-section-image.jpg";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-container">
      {/* 1. The Shady Background Image Overlay Layer */}
      <div 
        className="hero-background" 
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero-overlay"></div>
      </div>

      {/* 2. The Content Layer Sitting Safely On Top */}
      <div className="hero-content">
        <span className="hero-subtitle">Discover & Experience</span>
        <h1 className="hero-title">
          Your Gateway to the <span className="highlight-text">Most Premium</span> Events
        </h1>
        <p className="hero-description">
          Book tickets for the finest concerts, tech conferences, art exhibitions, 
          and exclusive workshops happening around you.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => navigate("/events")}>
            Explore Events
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;