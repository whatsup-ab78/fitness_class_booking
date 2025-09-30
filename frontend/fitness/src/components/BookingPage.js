import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useNotification } from '../context/NotificationContext';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1540496905039-512d2f7550f8?auto=format&fit=crop&q=60&w=500';

function BookingPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fitnessClass, setFitnessClass] = useState(null);
    const [error, setError] = useState('');
    const { showNotification } = useNotification();

    useEffect(() => {
        const fetchClass = async () => {
            try {
                const { data } = await axios.get(`/api/classes/${id}`);
                setFitnessClass(data);
            } catch (err) {
                setError('Could not load class details.');
            }
        };
        fetchClass();
    }, [id]);

    const handleBooking = async () => {
        setError('');
        try {
            await axios.post('/api/bookings', { classId: id });
            showNotification('Booking Confirmed!');
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Booking failed. Please try again.';
            setError(errorMsg);
            showNotification(errorMsg, 'error');
        }
    };

    if (!fitnessClass) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img src={fitnessClass.imageUrl || DEFAULT_IMAGE} className="img-fluid rounded-start" alt={fitnessClass.name} style={{ height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h2 className="card-title">{fitnessClass.name}</h2>
                            <p className="card-text">{fitnessClass.description}</p>
                            <hr />
                            <h4>Booking Details</h4>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Instructor:</strong> {fitnessClass.instructor}</li>
                                
                                {fitnessClass.durationType === 'multiDay' ? (
                                    <>
                                        <li className="list-group-item"><strong>Schedule:</strong> {fitnessClass.durationText}</li>
                                        <li className="list-group-item"><strong>Monthly:</strong> <span className="fs-5 text-success">₹{fitnessClass.priceMonthly}</span></li>
                                        <li className="list-group-item"><strong>Quarterly:</strong> <span className="fs-5 text-success">₹{fitnessClass.priceQuarterly}</span></li>
                                        <li className="list-group-item"><strong>Annually:</strong> <span className="fs-5 text-success">₹{fitnessClass.priceAnnually}</span></li>
                                    </>
                                ) : (
                                    <>
                                        <li className="list-group-item"><strong>Date:</strong> {new Date(fitnessClass.schedule).toLocaleDateString()}</li>
                                        <li className="list-group-item"><strong>Time:</strong> {new Date(fitnessClass.schedule).toLocaleTimeString()}</li>
                                        <li className="list-group-item"><strong>Price:</strong> <span className="fs-4 text-success">₹{fitnessClass.price}</span></li>
                                    </>
                                )}
                            </ul>
                            <div className="d-grid gap-2 mt-4">
                                {error && <div className="alert alert-danger">{error}</div>}
                                <button className="btn btn-success btn-lg" onClick={handleBooking}>
                                    <i className="fas fa-credit-card me-2"></i>Confirm Enrollment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingPage;