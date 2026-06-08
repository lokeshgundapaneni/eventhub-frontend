import { NavLink } from "react-router-dom";
import {
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaFacebook
} from "react-icons/fa";

import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>EventHub</h2>

          <p>
            Discover, create and manage events
            effortlessly with EventHub.
          </p>

          <div className="social-links">
            <a href="#">
              <FaLinkedin />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaFacebook />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <NavLink to="/">Home</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>

        <div className="footer-links">
          <h3>Resources</h3>

          <a href="#!">About Us</a>
          <a href="#!">Contact</a>
          <a href="#!">Support</a>
          <a href="#!">Privacy Policy</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 EventHub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;