// frontend/src/components/Home.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [featuredClasses, setFeaturedClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/classes');
                // Get the first 3 classes to feature
                setFeaturedClasses(response.data.slice(0, 3));
            } catch (error) {
                console.error("Error fetching featured classes:", error);
            }
        };
        fetchClasses();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <div className="p-5 mb-4 hero-section">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Your Fitness Journey Starts Here</h1>
                    <p className="col-md-8 fs-4">Join a community dedicated to strength, wellness, and health. Find the perfect class for you.</p>
                    <Link className="btn btn-primary btn-lg" to="/classes">
                        <i className="fas fa-calendar-alt me-2"></i>View Schedule
                    </Link>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="container section fade-in-section">
                <h2 className="section-title">Why Choose Us?</h2>
                <div className="row text-center">
                    <div className="col-md-4 mb-4">
                        <div className="feature-card h-100">
                            <div className="icon"><i className="fas fa-star"></i></div>
                            <h4>Expert Instructors</h4>
                            <p>Our certified trainers are dedicated to helping you achieve your fitness goals with personalized guidance.</p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="feature-card h-100">
                            <div className="icon"><i className="fas fa-heartbeat"></i></div>
                            <h4>Modern Facilities</h4>
                            <p>Train with the latest equipment in a clean, safe, and motivating environment.</p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="feature-card h-100">
                            <div className="icon"><i className="fas fa-users"></i></div>
                            <h4>Vibrant Community</h4>
                            <p>Be part of a supportive community that cheers you on every step of the way.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Featured Classes Section */}
            {featuredClasses.length > 0 && (
                <div className="container section fade-in-section">
                    <h2 className="section-title">Featured Classes</h2>
                    <div className="row">
                        {featuredClasses.map(cls => (
                            <div className="col-md-4 mb-4" key={cls._id}>
                                <div className="card h-100">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{cls.name}</h5>
                                        <h6 className="card-subtitle mb-2">{cls.category}</h6>
                                        <p className="card-text">{cls.description.substring(0, 100)}...</p>
                                        <Link to="/classes" className="btn btn-primary mt-auto">Learn More</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Testimonials Section */}
            <div className="container section fade-in-section">
                <h2 className="section-title">What Our Members Say</h2>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="testimonial-card h-100">
                            <img src="https://i.pravatar.cc/150?img=11" alt="Member" />
                            <p>"FitFlex has completely transformed my approach to fitness. The instructors are amazing and the community is so welcoming!"</p>
                            <h5 className="mt-3">- Jessica M.</h5>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="testimonial-card h-100">
                            <img src="https://i.pravatar.cc/150?img=32" alt="Member" />
                            <p>"The variety of classes keeps me motivated. I've never been more consistent with my workouts. Highly recommended!"</p>
                            <h5 className="mt-3">- David R.</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;