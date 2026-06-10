import React, { useState } from "react";
import bookingService from "../services/bookingService";
import "../styles/seatSelectionModal.css";

function SeatSelectionModal({ event, onClose, onPaymentSuccess }) {
    const [ticketsCount, setTicketsCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const availableOptions = [1, 2, 3, 4, 5, 6];
    const totalPayable = (event.ticketPrice || 0) * ticketsCount;

    const getVehicleDetails = (count) => {
        switch (count) {
            case 1: return { icon: "🚲", label: "Solo Rider" };
            case 2: return { icon: "🛵", label: "Dynamic Duo" };
            case 3: return { icon: "🛺", label: "Group Transit" };
            case 4: return { icon: "🚗", label: "Squad Trip" };
            case 5: return { icon: "🚙", label: "Cruiser Mode" };
            default: return { icon: "🚐", label: "Mega Pack" };
        }
    };

    const currentVehicle = getVehicleDetails(ticketsCount);

    const handlePayNow = async () => {
        setLoading(true);
        try {
            const orderData = await bookingService.createBooking({
                eventId: event.id,
                ticketsCount: ticketsCount
            });

            const options = {
                key: "rzp_test_Sze4fHMj9CBgdQ",
                amount: Number(orderData.totalAmount) * 100,
                currency: "INR",
                name: "EventHub Checkout",
                description: `${ticketsCount} Ticket(s) for ${event.title}`,
                order_id: orderData.razorpayOrderId,
                handler: async function (response) {
                    try {
                        await bookingService.verifyPayment({
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        });
                        setShowSuccess(true);
                    } catch (err) {
                        alert("Payment verification failed.");
                    }
                },
                modal: { ondismiss: () => setLoading(false) },
                theme: { color: "#4f46e5" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            alert("Failed to initialize payment.");
            setLoading(false);
        }
    };

    return (
        <>
            {/* Main Modal */}
            <div className="seat-modal-overlay">
                <div className="seat-modal-card">
                    <button className="seat-modal-close" onClick={onClose}>&times;</button>
                    <div className="seat-modal-body">
                        <h3>How many seats?</h3>
                        <span className="seat-modal-subtitle">{event.title}</span>
                        <div className="vehicle-display-panel">
                            <span className="vehicle-graphic-icon">{currentVehicle.icon}</span>
                            <span className="vehicle-description-text">{currentVehicle.label}</span>
                        </div>
                        <div className="number-selector-row">
                            {availableOptions.map((num) => (
                                <button
                                    key={num}
                                    className={`number-circle ${ticketsCount === num ? "active" : ""}`}
                                    onClick={() => setTicketsCount(num)}
                                    disabled={num > event.remainingSeats}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <div className="pricing-summary-card">
                            <div className="pricing-meta-label">
                                <span className="label-title">Standard Access Tickets</span>
                                <span className="label-sub">₹{event.ticketPrice} each</span>
                            </div>
                            <div className="total-payable-amount-tag">₹{totalPayable.toFixed(2)}</div>
                        </div>
                        <button
                            className="select-seats-btn"
                            onClick={handlePayNow}
                            disabled={loading || event.remainingSeats < ticketsCount}
                        >
                            {loading ? "Processing..." : `Proceed to Pay • ₹${totalPayable}`}
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Overlay (Styled inline to prevent positioning conflicts) */}
            {showSuccess && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 99999, backgroundColor: "rgba(0,0,0,0.6)"
                }}>
                    <div style={{
                        backgroundColor: "white", padding: "2rem", borderRadius: "10px",
                        textAlign: "center", maxWidth: "350px", width: "90%", boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                    }}>
                        <div style={{ fontSize: "50px", marginBottom: "10px" }}>✅</div>
                        <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Payment Successful!</h2>
                        <p style={{ color: "#666", marginBottom: "20px" }}>Your booking is confirmed.</p>
                        <button
                            onClick={() => {
                                setShowSuccess(false);
                                onClose();
                                if (onPaymentSuccess) onPaymentSuccess();
                            }}
                            style={{
                                width: "100%", backgroundColor: "#4f46e5", color: "white",
                                padding: "12px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold"
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default SeatSelectionModal;