import React, { useState } from 'react';
import axios from 'axios';
import '../styles/contact.css';

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await axios.post('http://localhost:8080/api/contact', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert('Error sending message.');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-header">
          <h2>Get in Touch</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}export default ContactPage;