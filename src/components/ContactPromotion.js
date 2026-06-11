import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ContactPromotion.css';
import contactImage from '../assets/contact-promo.png';

const ContactPromotion = () => {
    const navigate = useNavigate();

    return (
        <section className="partner-section contact-promo-flipped">
            
            
            {/* Content follows the image */}
            <div className="partner-content">
                <span className="partner-label">HAVE QUESTIONS?</span>
                <h2>WE'RE HERE TO <span>HELP YOU</span></h2>
                <p>Need support, partnership inquiries, or general feedback? Our team is ready to assist you. Reach out to us and get a response within 24 hours.</p>
                <div className="partner-actions">
                    <button className="btn-primary-solid" onClick={() => navigate('/contact-form')}>
                        CONTACT US →
                    </button>
                </div>
            </div>


            {/* Image is now placed first in the JSX */}
            <div className="partner-image">
                <div className="image-placeholder">
                    <img src={contactImage} alt="Contact Support" />
                </div>
            </div>
        </section>
    );
};

export default ContactPromotion;