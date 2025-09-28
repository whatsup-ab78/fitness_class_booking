// frontend/src/components/UserDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1540496905039-512d2f7550f8?auto=format&fit=crop&q=60&w=500';

function UserDashboard() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await axios.get('/api/bookings/mybookings');
                setBookings(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch bookings', err);
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <div>Loading your dashboard...</div>;

    return (
        <div>
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-4">
                    <h1 className="display-5 fw-bold">Welcome, {user?.username}!</h1>
                    <p className="col-md-8 fs-4">Here are your upcoming classes. Stay fit, stay healthy!</p>
                </div>
            </div>

            <h2 className="mb-4">My Bookings</h2>
            {bookings.length > 0 ? (
                <div className="row">
                    {bookings.map(booking => (
                        <div className="col-md-4 mb-4" key={booking._id}>
                            <div className="card h-100 shadow-sm">
                                <img src={booking.fitnessClass.imageUrl || DEFAULT_IMAGE} className="card-img-top" alt={booking.fitnessClass.name} style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{booking.fitnessClass.name}</h5>
                                    <p className="card-text">
                                        with <strong>{booking.fitnessClass.instructor}</strong>
                                    </p>
                                    <p><strong>Scheduled for:</strong> {new Date(booking.fitnessClass.schedule).toLocaleString()}</p>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-info">You have no classes booked yet. Why not <a href="/classes">book one now</a>?</div>
            )}
        </div>
    );
}

export default UserDashboard;