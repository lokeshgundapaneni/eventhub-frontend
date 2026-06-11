import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";
import heroBg from "../assets/hero-section-image.jpg";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-container">
      {/* Image portion at the top */}
      <div 
        className="hero-background" 
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>

      {/* Content portion underneath */}
      <div className="hero-content">
        <span className="hero-subtitle">Discover & Experience</span>
        <h1 className="hero-title">
          YOUR GATEWAY TO THE <br /> <span className="highlight-text">MOST PREMIUM</span> EVENTS
        </h1>
        <p className="hero-description">
          Book tickets for the finest concerts, tech conferences, and exclusive workshops.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => navigate("/events")}>
            EXPLORE EVENTS →
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;