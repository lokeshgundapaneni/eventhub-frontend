import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import eventService from "../services/eventService";
import "../styles/events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // New Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000); // Default max price slider limit

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

  // Filter Logic: Executed client-side instantly when inputs change
  const filteredEvents = events.filter((event) => {
    const matchesSearch = 
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      event.venue?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = event.ticketPrice <= maxPrice;
    
    return matchesSearch && matchesPrice;
  });

  if (loading) return <div className="events-loading">Loading Upcoming Events...</div>;
  if (error) return <div className="events-error">{error}</div>;

  return (
    <div className="events-page">
      <h2 className="events-page-title">
        {selectedCategoryId && events.length > 0 
          ? `${events[0].categoryName} Events` 
          : "All Upcoming Events"}
      </h2>

      {/* --- NEW FILTER BAR --- */}
      <div className="events-filter-bar">
        <input
          type="text"
          placeholder="🔍 Search by title or venue..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />
        
        <div className="price-filter">
          <label>Max Price: ₹{maxPrice}</label>
          <input
            type="range"
            min="0"
            max="10000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="filter-slider"
          />
        </div>
      </div>
      {/* ------------------------ */}
      
      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
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
          <p className="no-events-msg">No active events found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Events;