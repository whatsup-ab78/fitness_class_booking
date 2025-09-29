// frontend/src/components/ClassList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import formatDate from '../utils/formatDate';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1540496905039-512d2f7550f8?auto=format&fit=crop&q=60&w=500';
const CATEGORIES = ["All", "Yoga", "Gym", "Dance", "Zumba"];

function ClassList() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        axios.get('/api/classes').then(response => {
            setClasses(response.data);
            setLoading(false); // Turn off loading on success
        }).catch(error => {
            console.error('There was an error fetching the classes!', error);
            setLoading(false); // Turn off loading on error
        });
    }, []);

    const now = new Date();
    const filteredClasses = classes
        .filter(cls => cls.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(cls => selectedCategory === 'All' || cls.category === selectedCategory);

    return (
        <div>
            <h2 className="mb-4" style={{ color: 'var(--primary-color)' }}>Class Schedule</h2>
            <div className="row mb-4">
                <div className="col-md-8"><input type="text" className="form-control" placeholder="Search for a class..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                <div className="col-md-4"><select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>{CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
            </div>

            {loading ? (
                <p>Loading classes...</p>
            ) : (
                <div className="row">
                    {filteredClasses.length > 0 ? filteredClasses.map(cls => {
                        const classDate = new Date(cls.schedule);
                        const isPast = classDate < now;
                        const isFull = cls.enrollmentCount >= cls.capacity;

                        return (
                            <div className="col-md-4 mb-4" key={cls._id}>
                                <div className="card h-100 shadow-sm">
                                    <img src={cls.imageUrl || DEFAULT_IMAGE} className="card-img-top" alt={cls.name} style={{ height: '200px', objectFit: 'cover' }} />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{cls.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{cls.category}</h6>
                                        <p className="card-text">{cls.description}</p>
                                        <p><strong><i className="fas fa-user-tie me-2"></i>Instructor:</strong> {cls.instructor}</p>
                                        <p><strong><i className="far fa-calendar-alt me-2"></i>When:</strong> {formatDate(cls.schedule)} at {classDate.toLocaleTimeString()}</p>
                                        <p><strong><i className="fas fa-clock me-2"></i>Duration:</strong> {cls.duration} mins</p>
                                        <p><strong><i className="fas fa-users me-2"></i>Slots:</strong> {cls.enrollmentCount} / {cls.capacity}</p>
                                        <p className="fs-5 mt-auto"><strong>Price:</strong> ₹{cls.price}</p>
                                        {user && (
                                            (isPast || isFull) ? (
                                                <button className="btn btn-secondary" disabled>{isPast ? "Event Passed" : "Class Full"}</button>
                                            ) : (
                                                <Link to={`/book/${cls._id}`} className="btn btn-primary"><i className="fas fa-check-circle me-2"></i>Book Now</Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }) : (
                        // This message will now show if the filters result in no classes OR if the database is empty
                        <div className="col-12">
                            <div className="alert alert-info">No classes match your search criteria. Please try different filters or check back later!</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ClassList;