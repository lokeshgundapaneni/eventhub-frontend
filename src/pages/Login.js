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

  // Safely handles typed inputs
  function handleInputChange(e) {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  }

  // Handles form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("📡 Sending network request for:", loginData.email);
      const response = await authService.login(loginData);
      
      console.log("🎯 Raw backend payload received:", response);
      
      // Extract token dynamically matching your backend response mapping ('message')
      const token = response?.data?.message || response?.message || response?.data?.token || response?.token;
      
      if (token) {
        localStorage.setItem("token", token);
        console.log("✅ Token successfully stored. Redirecting home...");
        navigate("/");
      } else {
        console.warn("⚠️ Login returned 200 OK, but token field was missing from response payload.");
        setError("Login succeeded, but no authorization token was received.");
      }
    } catch (err) {
      console.error("❌ Login failed inside catch block:", err);
      
      // Checks if backend returned a custom error string message
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.response && err.response.status === 403) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred while trying to log in. Please check your network connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Card Header */}
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in</p>
        </div>

        {/* Error Message Alert Banner */}
        {error && <div className="login-error-message">⚠️ {error}</div>}

        {/* Login Form */}
        <form onSubmit={handleFormSubmit} className="login-form">
          
          {/* Email Input Group */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={loginData.email}
              disabled={loading}
              onChange={handleInputChange}
              required 
            />
          </div>

          {/* Password Input Group */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={loginData.password}
              disabled={loading}
              onChange={handleInputChange}
              required 
            />
          </div>

          {/* Action Button */}
          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Bottom Navigation Link */}
        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;