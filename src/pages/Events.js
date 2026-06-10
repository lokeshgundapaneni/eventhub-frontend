import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import eventService from "../services/eventService";
import "../styles/events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    eventService.getEvents(selectedCategoryId)
      .then((data) => {
        const sortedEvents = data.sort((a, b) => {
          return new Date(a.eventDate) - new Date(b.eventDate);
        });
        setEvents(sortedEvents);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Component error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      });
  }, [selectedCategoryId]);

  const handleBookTicket = (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/events/${eventId}`, { state: { triggerBooking: true } });
    }
  };

  if (loading) return <div className="events-loading">Loading Upcoming Events...</div>;
  if (error) return <div className="events-error">{error}</div>;

  return (
    <div className="events-page">
      <h2 className="events-page-title">
        {selectedCategoryId && events.length > 0 
          ? `${events[0].categoryName} Events` 
          : "All Upcoming Events"}
      </h2>
      
      <div className="events-grid">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="event-img" />}
              
              <div className="event-card-content">
                <div className="event-card-header-tags">
                  <span className="event-category-badge">{event.categoryName}</span>
                  <span className={`event-status-badge ${event.status?.toLowerCase()}`}>
                    {event.status}
                  </span>
                </div>

                <h3>{event.title}</h3>
                <p className="event-merchant">By {event.organizerName}</p>
                <p className="event-card-desc">{event.description}</p>
                
                <div className="event-card-meta">
                  <span>📍 {event.venue}</span>
                  <span>📅 {event.eventDate}</span>
                </div>

                <div className="event-card-footer">
                  <span className="event-price">₹{event.ticketPrice}</span>
                  <span className="event-seats">{event.remainingSeats} left</span>
                </div>

                <div className="event-card-actions">
                  <button 
                    className="btn-secondary" 
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    View Details
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => handleBookTicket(event.id)}
                    disabled={event.remainingSeats <= 0 || event.status === "COMPLETED"}
                  >
                    {event.remainingSeats <= 0 ? "Sold Out" : "Book Ticket"}
                  </button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="no-events-msg">No active events found under this specific interest.</p>
        )}
      </div>
    </div>
  );
}

export default Events;