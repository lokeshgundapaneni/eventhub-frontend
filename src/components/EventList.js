import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';
import eventService from '../services/eventService';

const EventList = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await eventService.getEvents();
                setEvents(data);
            } catch (err) {
                console.error("Failed to fetch events", err);
            }
        };
        fetchEvents();
    }, []);



    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate >= today;
    })
        .filter(event =>
            event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.venue?.toLowerCase().includes(searchTerm.toLowerCase())
        );


    const handleEdit = (id) => {
        navigate(`/update-event/${id}`)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            await eventService.deleteEvent(id);
            // Refresh the list after success
            setEvents(events.filter(e => e.id !== id));
            alert("Event deleted successfully!");
        } catch (err) {
            // Handle the specific 409 error
            if (err.response && err.response.status === 409) {
                alert("Cannot delete this event because there are active bookings associated with it.");
            } else {
                alert("Failed to delete event. It might have associated bookings.");
            }
            console.error("Delete error:", err);
        }
    }

    return (
        <div className="event-list-manager">
            <div className="admin-toolbar">
                <input
                    type="text"
                    placeholder="🔍 Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="admin-search-input"
                />
                <button className="btn-primary" onClick={() => navigate("/create-event")}>
                    + Create New Event
                </button>
            </div>

            <div className="events-grid">
                {filteredEvents.map(event => (
                    <div key={event.id} className="event-card">
                        <div className="card-header">
                            <h3>{event.title}</h3>
                        </div>
                        <div className="card-body">
                            <div className="info-group">
                                <span className="label">Venue</span>
                                <span className="value">{event.venue}</span>
                            </div>
                            <div className="info-group">
                                <span className="label">Date</span>
                                <span className="value">{event.eventDate}</span>
                            </div>
                            <div className="info-group">
                                <span className="label">Price</span>
                                <span className="value">₹{event.ticketPrice}</span>
                            </div>
                        </div>
                        <div className="card-actions">
                            <button className="btn-action edit" onClick={() => handleEdit(event.id)}>
                                <span className="btn-icon"></span> Edit
                            </button>
                            <button
                                className={`btn-action delete ${event.bookingCount > 0 ? 'disabled' : ''}`}
                                onClick={() => handleDelete(event.id)}
                                disabled={event.bookingCount > 0}
                                title={event.bookingCount > 0 ? "Cannot delete: Has bookings" : "Delete event"}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;