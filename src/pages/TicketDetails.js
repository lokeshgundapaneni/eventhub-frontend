import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookingService from '../services/bookingService';
import '../styles/ticketDetails.css';

const TicketDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        bookingService.getBookingById(id)
            .then(data => setBooking(data))
            .catch(err => console.error("Error loading booking:", err));
    }, [id]);

    const handleCancel = async () => {
        try {
            await bookingService.cancelBooking(id);
            setShowModal(false);
            setShowSuccess(true); 
        } catch (err) {
            alert("Cancellation failed: " + err.message);
        }
    };

    if (!booking) return <div className="loading">Loading ticket details...</div>;

    return (
        <div className="ticket-details-container">
            {/* Custom Modal Popup */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Cancellation</h3>
                        <p>Are you sure you want to cancel this ticket?</p>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn-ok" onClick={handleCancel}>OK</button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Cancellation Processed</h3>
                        <p>Your booking has been successfully cancelled. The refund amount will be credited to your original payment method within 2-3 business days.</p>
                        <button className="btn-ok" onClick={() => navigate('/my-bookings')}>Close</button>
                    </div>
                </div>
            )}

            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
            
            <div className="ticket-card">
                <h1>🎟️ {booking.eventTitle}</h1>
                <div className="detail-row"><span>Venue:</span> {booking.venue}</div>
                <div className="detail-row"><span>Date:</span> {booking.eventDate}</div>
                <div className="detail-row"><span>Tickets:</span> {booking.ticketsCount}</div>
                <div className="detail-row"><span>Total:</span> ₹{booking.totalAmount?.toLocaleString()}</div>
                <div className="detail-row">
                    <span>Status:</span> 
                    <span className={`status-pill ${booking.status?.toLowerCase()}`}>{booking.status}</span>
                </div>

                {booking.status !== 'CANCELLED' && (
                    <button className="cancel-btn" onClick={() => setShowModal(true)}>
                        Cancel Ticket
                    </button>
                )}
            </div>
        </div>
    );
};

export default TicketDetails;