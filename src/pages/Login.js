import React, { useState } from "react";
import "../styles/login.css";
import authService from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleInputChange(e) {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("📡 Sending login request...");
      const response = await authService.login(loginData);
      
      // Ensure we are accessing the data correctly based on the response structure
      // Your backend returns: { "token": "...", "user": { "id": 1, "name": "...", "email": "..." } }
      const data = response.data || response; 
      const token = data.token;
      const userProfile = data.user;

      if (token) {
        // 1. Clear old data to prevent "stuck" sessions
        localStorage.clear(); 
        
        // 2. Store the new token and user profile
        localStorage.setItem("token", token);
        
        if (userProfile) {
          localStorage.setItem("user", JSON.stringify(userProfile));
          console.log("✅ User profile stored:", userProfile);
        }

        console.log("✅ Login successful. Redirecting...");
        navigate("/");
      } else {
        setError("Login succeeded, but the server did not return a valid session token.");
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Invalid email or password.");
      } else {
        setError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in</p>
        </div>

        {error && <div className="login-error-message">⚠️ {error}</div>}

        <form onSubmit={handleFormSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" id="email" placeholder="Enter your email" 
              value={loginData.email} disabled={loading}
              onChange={handleInputChange} required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" id="password" placeholder="••••••••" 
              value={loginData.password} disabled={loading}
              onChange={handleInputChange} required 
            />
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;