import React, { useEffect, useState } from 'react';
import bookingService from '../services/bookingService';
import '../styles/myBookings.css';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getMyBookings();
        setBookings(data || []);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="loading-spinner">Loading your tickets...</div>;

  return (
    <div className="my-bookings-container">
      <header className="my-bookings-header">
        <h1>My Bookings</h1>
      </header>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎟️</div>
          <h2>No tickets yet!</h2>
          <p>Looks like you haven't booked any events. Explore our events and grab your spot!</p>
          <button className="browse-events-btn" onClick={() => navigate("/events")}>
            Explore Events
          </button>
        </div>
      ) : (
        <div className="my-bookings-list">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="booking-item-row"
              onClick={() => navigate(`/ticket-details/${booking.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="booking-item-icon">🎟️</div>
              <div className="booking-item-info">
                <h3>{booking.eventTitle}</h3>
                <p className="booking-item-meta">Date: {booking.eventDate}</p>
                <span className="booking-item-date">
                  Booked: {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div className="booking-item-status">
                {/* Safe optional chaining used here to prevent crashes */}
                <span className={`status-badge ${booking.status?.toLowerCase() || 'pending'}`}>
                  {booking.status || 'Pending'}
                </span>
                <span className="item-nav-arrow">›</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;