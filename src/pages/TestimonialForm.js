import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import "../styles/TestimonialForm.css"; 

function TestimonialForm() {
  const [formData, setFormData] = useState({ name: '', experience: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Get and parse the user object from localStorage
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const userId = user ? user.id : null;

    if (!userId) {
      alert("You must be logged in to leave a testimonial.");
      return;
    }

    // 2. Prepare payload
    const payload = {
      ...formData,
      userId: userId
    };

    try {
      // API instance already includes the JWT token from your interceptor
      await API.post('/api/testimonials', payload);
      alert("Testimonial submitted successfully!");
      navigate('/');
    } catch (error) {
      console.error("Error submitting testimonial", error);
      alert("Failed to submit. Please check your login status.");
    }
  };

  return (
    <div className="form-container">
      <form id="testimonial-form" className="brutalist-form" onSubmit={handleSubmit}>
        <h2 id="form-title">Leave a Testimonial</h2>
        
        <div className="input-group">
          <label htmlFor="name-input">Your Name</label>
          <input 
            id="name-input"
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="experience-textarea">Your Experience</label>
          <textarea 
            id="experience-textarea"
            rows="5"
            value={formData.experience} 
            onChange={(e) => setFormData({...formData, experience: e.target.value})}
            required 
          />
        </div>

        <button id="submit-testimonial-btn" type="submit" className="btn-footer btn-yellow">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default TestimonialForm;