import React from 'react';
import "../styles/TestimonialList.css";

const COLORS = [
    "#FF6B6B", "#FFD93D", "#4ECDC4", "#FF9F1C", "#FF5E5B", "#A2D2FF", "#BDE0FE", "#CDB4DB", "#FFC8DD", "#FFAFCC",
    "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#008000", "#800000",
    "#F4A261", "#E76F51", "#2A9D8F", "#264653", "#E9C46A", "#72EFDD", "#5E60CE", "#5390D9", "#4EA8DE", "#48BFE3",
    "#FDFD96", "#FFB347", "#B39EB5", "#77DD77", "#DEA5A4", "#B19CD9", "#FF6961", "#779ECB", "#F49AC2", "#CFCFC4",
    "#2D3436", "#636E72", "#B2BEC3", "#0984E3", "#6C5CE7", "#FD79A8", "#00B894", "#FDCB6E", "#E17055", "#D63031"
];

// Calculate contrast text color (Black or White)
const getContrastYIQ = (hexcolor) => {
    const r = parseInt(hexcolor.substring(1, 3), 16);
    const g = parseInt(hexcolor.substring(3, 5), 16);
    const b = parseInt(hexcolor.substring(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000' : '#fff';
};

const TestimonialList = ({ testimonials }) => {
    return (
        <section className="testimonial-section">
            <div className="testimonial-heading">
                <span className="overline">EventHub Community</span>
                <h2>What Our <br /> Users Are Saying</h2>
                <p>Join thousands of event organizers and attendees who trust EventHub to build seamless experiences and memorable moments.</p>
            </div>

            <div className="testimonial-scroll-container">
                <div className="testimonial-track">
                    {[...testimonials, ...testimonials].map((t, index) => {
                        const bgColor = COLORS[index % COLORS.length];
                        const textColor = getContrastYIQ(bgColor);

                        return (
                            <div
                                key={index}
                                className="testimonial-card"
                                style={{ backgroundColor: bgColor, color: textColor, borderColor: '#000' }}
                            >
                                <div className="avatar-box" style={{ borderColor: textColor }}>
                                    {t.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <p className="testimonial-text">"{t.experience}"</p>
                                <h4 className="testimonial-author">— {t.name}</h4>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TestimonialList;