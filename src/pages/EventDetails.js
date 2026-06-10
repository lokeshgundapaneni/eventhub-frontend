import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import eventService from "../services/eventService";
import SeatSelectionModal from "./SeatSelectionModal";
import "../styles/eventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSeatModal, setShowSeatModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    eventService.getEventById(id)
      .then((data) => {
        setEvent(data);
        setLoading(false);
        if (location.state?.triggerBooking) {
          setShowSeatModal(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching event details:", err);
        setError("Could not load event details. Please try again later.");
        setLoading(false);
      });
  }, [id, location.state]);

  const handleBookTicket = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setShowSeatModal(true);
    }
  };

  const handleRefreshData = () => {
    eventService.getEventById(id).then(data => setEvent(data));
  };

  if (loading) return <div className="details-loading">Loading Event Details...</div>;
  if (error) return <div className="details-error">{error}</div>;
  if (!event) return <div className="details-error">Event not found.</div>;

  return (
    <div className="event-details-container">
      <button className="round-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="back-icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="details-hero">
        <div className="details-hero-backdrop" style={{ backgroundImage: `url(${event.imageUrl})` }}></div>
        <div className="details-hero-content">
          <div className="details-hero-img-wrapper">
            {event.imageUrl ? (
              <img src={event.imageUrl} alt={event.title} className="details-hero-main-img" />
            ) : (
              <div className="details-hero-img-placeholder">No Image Available</div>
            )}
          </div>
          <div className="details-hero-text-details">
            <div className="details-hero-tags">
              <span className="details-badge-cat">{event.categoryName}</span>
              <span className={`details-badge-status ${event.status?.toLowerCase()}`}>{event.status}</span>
            </div>
            <h1 className="details-title">{event.title}</h1>
            <p className="details-organizer">Hosted by <span>{event.organizerName}</span></p>
            <div className="details-hero-quick-meta">
              <div className="meta-item">📅 {event.eventDate}</div>
              <div className="meta-item">📍 {event.venue}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="details-main-layout">
        <div className="details-left-col">
          <section className="info-section">
            <h3>About the Event</h3>
            <p className="description-text">{event.description}</p>
          </section>
          <section className="info-section venue-section">
            <h3>Venue & Location</h3>
            <div className="venue-card">
              <div className="venue-icon">📍</div>
              <div>
                <h4>{event.venue}</h4>
                <p>Please arrive 15 minutes before the scheduled event time.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="details-right-col">
          <div className="booking-widget">
            <div className="widget-price-row">
              <span className="widget-label">Ticket Price</span>
              <span className="widget-price">₹{event.ticketPrice}</span>
            </div>
            <hr className="widget-divider" />
            <div className="widget-status-row">
              {event.remainingSeats > 0 && event.status !== "COMPLETED" ? (
                <p className="seats-available">In Stock: Only <span>{event.remainingSeats} tickets</span> left!</p>
              ) : (
                <p className="seats-unavailable">Currently Unavailable / Sold Out</p>
              )}
            </div>
            <button 
              className="widget-booking-btn"
              onClick={handleBookTicket}
              disabled={event.remainingSeats <= 0 || event.status === "COMPLETED"}
            >
              {event.remainingSeats <= 0 ? "Sold Out" : "Book Ticket"}
            </button>
          </div>
        </div>
      </div>

      {showSeatModal && (
        <SeatSelectionModal 
          event={event} 
          onClose={() => setShowSeatModal(false)} 
          onPaymentSuccess={handleRefreshData}
        />
      )}
    </div>
  );
}

export default EventDetails;