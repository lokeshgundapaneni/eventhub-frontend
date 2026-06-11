import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import '../styles/home.css';
import promotionImage from '../assets/promotion1.png';

const EventPromotion = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate('/login');
        return;
    }

    try {
        const decoded = jwtDecode(token);
        const userRole = decoded.role || decoded.authorities;

        if (userRole === 'ORGANIZER' || userRole === 'ADMIN') {
            navigate('/create-event');
        } else {
            // LOGOUT LOGIC: Clear session before redirecting
            localStorage.removeItem("token");
            
            alert("Only organizers can create events. Redirecting to register as an organizer.");
            navigate('/register');
        }
    } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token"); // Clean up invalid token
        navigate('/login');
    }
};

    return (
        <section className="partner-section">
            <div className="partner-content">
                <span className="partner-label">FOR ORGANIZERS</span>
                <h2>HOST YOUR EVENTS WITH <span>EVENTHUB</span></h2>
                <p>From corporate seminars to local workshops, provide a seamless booking experience for your attendees. Join our network of successful organizers today.</p>
                <div className="partner-actions">
                    <button className="btn-primary-solid" onClick={handleGetStarted}>
                        GET STARTED →
                    </button>
                </div>
            </div>
            <div className="partner-image">
                <div className="image-placeholder">
                    <img
                        src={promotionImage}
                        alt="Event Management"
                    />
                </div>
            </div>
        </section>
    );
};

export default EventPromotion;