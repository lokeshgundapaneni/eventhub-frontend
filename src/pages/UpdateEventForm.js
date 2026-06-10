import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../styles/createEvent.css"; 
import API from '../services/eventService';
import CAPI from '../services/categoryService';

function UpdateEventForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '', description: '', venue: '', eventDate: '',
    ticketPrice: '', availableSeats: '', imageUrl: '', categoryId: ''
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  // 1. Fetch Categories
  CAPI.getAllCategories().then(setCategories).catch(console.error);

  // 2. Fetch Event Data
  API.getEventById(id).then(event => {
    // Get organizerId from localStorage to ensure it's in the form state
    const savedUser = JSON.parse(localStorage.getItem('user'));
    
    setFormData({
      title: event.title,
      description: event.description,
      venue: event.venue,
      eventDate: event.eventDate,
      ticketPrice: event.ticketPrice,
      availableSeats: event.availableSeats,
      imageUrl: event.imageUrl,
      categoryId: event.categoryId,
      organizerId: savedUser ? savedUser.id : '' // Ensure this is set
    });
  });
}, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const payload = {
    ...formData,
    ticketPrice: parseFloat(formData.ticketPrice),
    availableSeats: parseInt(formData.availableSeats, 10),
    categoryId: parseInt(formData.categoryId, 10),
    organizerId: parseInt(formData.organizerId, 10) // Ensure this is sent
  };

  try {
    await API.updateEvent(id, payload);
    toast.success('Event updated successfully!');
    navigate(-1);
  } catch (error) {
    toast.error('Updation failed. Check your data.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className='create-event-container'>
      <div className='form-card'>
        <div className="form-header">
          <h2>Update Event</h2>
          <p className="subtitle">Update the details below for event #{id}.</p>
        </div>

        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
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
              <input type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Total Available Seats</label>
              <input type="number" name="availableSeats" value={formData.availableSeats} onChange={handleChange} required />
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

          <div className="form-actions" style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </button>
            <button type="button" className="submit-btn" style={{ background: '#475569' }} onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateEventForm;