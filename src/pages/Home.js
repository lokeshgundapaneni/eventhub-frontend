import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import "../styles/home.css";
import { useState,useEffect } from "react";
import API from "../services/api";
import Community from "../components/Community";
import EventPromotion from "../components/EventPromotion";
import ContactPromotion from "../components/ContactPromotion";
import TestimonialList from "../components/TestimonialList";

function Home() {

    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        API.get('/api/testimonials')
            .then(res => setTestimonials(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="home-page">
            <div className="home-page-wrapper">
                <div className="section-wrapper">
                    <Hero />
                </div>

                <div className="section-wrapper">
                    <Categories />
                </div>


                <div className="grid-background">
                    <div className="content-wrapper">
                        <div className="section-wrapper">
                            <EventPromotion />
                        </div>

                        <div className="section-wrapper">
                            <Community />
                        </div>

                        <div className="section-wrapper">
                            <ContactPromotion />
                        </div>
                    </div>
                </div>

                <div className="section-wrapper">
                    <TestimonialList testimonials={testimonials} />
                </div>
            </div>
        </div>
    );
}

export default Home;