import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "../styles/register.css"; 

function Register() {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER"
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleInputChange(e) {
    const { id, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = registerData;
      await authService.register(dataToSend);
      
      setSuccess("Registration successful! Redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else if (typeof err.response.data === "object") {
          const validationErrors = Object.values(err.response.data).join(", ");
          setError(validationErrors || "Validation failed.");
        } else {
          setError("Registration failed. Email might already be taken.");
        }
      } else {
        setError("An error occurred. Please check your network connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        
        <div className="register-header">
          <h2>Create An Account</h2>
          <p>Join EventHub today</p>
        </div>

        {error && <div className="register-error-message">⚠️ {error}</div>}
        {success && <div className="register-success-message">🎉 {success}</div>}

        <form onSubmit={handleFormSubmit} className="register-form">
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter your name" 
              value={registerData.name}
              disabled={loading}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={registerData.email}
              disabled={loading}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={registerData.password}
              disabled={loading}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="••••••••" 
              value={registerData.confirmPassword}
              disabled={loading}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <select
              id="role"
              value={registerData.role}
              disabled={loading}
              onChange={handleInputChange}
            >
              <option value="USER">Attendee (User)</option>
              <option value="ORGANIZER">Event Organizer</option>
            </select>
          </div>

          <button type="submit" className="register-submit-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;