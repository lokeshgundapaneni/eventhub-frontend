import React, { useEffect, useState } from 'react';
import eventService from '../services/eventService';
import '../styles/organizerDashboard.css';
import { useNavigate } from 'react-router-dom';

function OrganizerDashboard() {
    const navigate=useNavigate();
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ totalEvents: 0, totalRevenue: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsList, statsData] = await Promise.all([
          eventService.getMyEvents(),
          eventService.getMyStats()
        ]);
        setEvents(eventsList);
        setStats(statsData);
      } catch (error) { console.error("Error:", error); }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="stats-header">
        <div className="stat-card">
          <h3>Total Events</h3>
          <p>{events.length}</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p>₹{stats.totalRevenue?.toLocaleString() || 0}</p>
        </div>
      </header>

      <div className="event-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3 className="card-title">{event.title}</h3>
            <p className="card-detail">📍 {event.venue}</p>
            <p className="card-detail">📅 {event.eventDate}</p>
            
            <div className="card-actions">
              <button className="btn btn-update"
              onClick={() => navigate(`/update-event/${event.id}`)}
              >Update</button>
              <button className="btn btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrganizerDashboard;