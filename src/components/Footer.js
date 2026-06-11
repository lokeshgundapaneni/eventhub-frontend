import React from 'react';
import { NavLink } from "react-router-dom";
import { FaLinkedin, FaYoutube, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer-refinement">
      <div className="footer-container">
        
        {/* Row 1: Logo & Nav */}
        <div className="footer-top">
          <NavLink to="/" className="text-logo">EVENTHUB</NavLink>
          <nav className="footer-links">
            <NavLink to="/team">Team</NavLink>
            <NavLink to="/privacy">Privacy Policy</NavLink>
            <NavLink to="/terms">Terms of Service</NavLink>
          </nav>
        </div>

        {/* Row 2: Big Socials (Permanently Colored) */}
        <div className="footer-socials">
          <a href="#" className="icon-linkedin"><FaLinkedin /></a>
          <a href="#" className="icon-youtube"><FaYoutube /></a>
          <a href="#" className="icon-facebook"><FaFacebook /></a>
          <a href="#" className="icon-instagram"><FaInstagram /></a>
          <a href="#" className="icon-twitter"><FaTwitter /></a>
          <a href="mailto:your@email.com" className="icon-gmail"><SiGmail /></a>
        </div>

        {/* Row 3: Action Buttons & Copyright */}
        <div className="footer-bottom">
          <div className="footer-actions">
            <NavLink to="/testimonials" className="btn-footer btn-yellow">
              Leave a Testimonial
            </NavLink>
            <NavLink to="/contact-form" className="btn-footer btn-blue">
              Contact Us
            </NavLink>
          </div>
          <p className="copyright">© 2026 EVENTHUB. ALL RIGHTS RESERVED.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;