import React, { useState, useEffect } from 'react';
import "../styles/createEvent.css";
import API from '../services/eventService';
import CAPI from '../services/categoryService';

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    venue: '',
    eventDate: '',
    ticketPrice: '',
    availableSeats: '',
    imageUrl: '',
    categoryId: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    CAPI.getAllCategories()
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error("Error loading categories", err);
        setCategories([]);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 handleSubmit triggered!"); // Debugging 1
    
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Prepare payload (Notice: excluded organizerId as it's now handled by backend JWT)
    const payload = {
      ...formData,
      ticketPrice: parseFloat(formData.ticketPrice),
      availableSeats: parseInt(formData.availableSeats, 10),
      categoryId: parseInt(formData.categoryId, 10)
    };

    console.log("📦 Sending payload to API:", payload); // Debugging 2

    try {
      console.log("⏳ Calling API.createEvent..."); // Debugging 3
      const response = await API.createEvent(payload);
      console.log("✅ API Success:", response); // Debugging 4
      
      setMessage({ type: 'success', text: '🎉 Event created successfully!' });
      
      // Reset form
      setFormData({
        title: '', description: '', venue: '', eventDate: '',
        ticketPrice: '', availableSeats: '', imageUrl: '', categoryId: ''
      });
    } catch (error) {
      console.error("❌ Catch block hit. Error details:", error); // Debugging 5
      
      const errorMsg = error.response?.data?.message || 'Failed to create event. Check console for details.';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='create-event-container'>
      <div className='form-card'>
        <div className="form-header">
          <h2>Create New Event</h2>
        </div>

        {message.text && (
          <div className={`alert-banner ${message.type}`}>
            {message.text}
          </div>
        )}

        <form className="event-form" onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="form-group">
            <label>Event Title</label>
            <input type="text" name="title" onChange={handleChange} value={formData.title} required />
          </div>

          <div className="form-grid-row">
            <div className="form-group">
              <label>Category</label>
              <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Venue / Location</label>
            <input type="text" name="venue" value={formData.venue} onChange={handleChange} required />
          </div>

          <div className="form-grid-row">
            <div className="form-group">
              <label>Ticket Price (₹)</label>
              <input type="number" name="ticketPrice" min="0" step="0.01" value={formData.ticketPrice} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Total Available Seats</label>
              <input type="number" name="availableSeats" min="1" value={formData.availableSeats} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Banner Image URL</label>
            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Event Description</label>
            <textarea name="description" rows="5" value={formData.description} onChange={handleChange} required></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Publishing Event...' : 'Publish Event'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;