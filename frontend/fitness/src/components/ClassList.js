import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // <-- 1. Import Link for navigation
import { useAuth } from '../context/AuthContext'; // <-- 2. Import useAuth to check login status

// A default image to show if a class doesn't have one
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1540496905039-512d2f7550f8?auto=format&fit=crop&q=60&w=500';

function ClassList() {
    const [classes, setClasses] = useState([]);
    const { user } = useAuth(); // <-- 3. Get the user object from our authentication context

    useEffect(() => {
        // The route is now relative and will use the proxy we set up
        axios.get('/api/classes')
            .then(response => {
                setClasses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the classes!', error);
            });
    }, []); // The empty array ensures this effect runs only once on component mount

    return (
        <div>
            <h2 className="mb-4" style={{ color: 'var(--primary-color)' }}>Class Schedule</h2>
            <div className="row">
                {classes.map(cls => (
                    <div className="col-md-4 mb-4" key={cls._id}>
                        <div className="card h-100 shadow-sm">
                            <img 
                                src={cls.imageUrl || DEFAULT_IMAGE} 
                                className="card-img-top" 
                                alt={cls.name} 
                                style={{ height: '200px', objectFit: 'cover' }} 
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{cls.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{cls.category}</h6>
                                <p className="card-text">{cls.description}</p>
                                <p><strong><i className="fas fa-user-tie me-2"></i>Instructor:</strong> {cls.instructor}</p>
                                <p><strong><i className="far fa-calendar-alt me-2"></i>When:</strong> {new Date(cls.schedule).toLocaleString()}</p>
                                <p><strong><i className="fas fa-clock me-2"></i>Duration:</strong> {cls.duration} mins</p>
                                <p className="fs-5 mt-auto"><strong>Price:</strong> ${cls.price}</p>
                                
                                {/* vvv 4. THE KEY CHANGE IS HERE vvv */}
                                {user && ( // This is a conditional render. The Link will only be shown if 'user' is not null.
                                    <Link to={`/book/${cls._id}`} className="btn btn-primary">
                                        <i className="fas fa-check-circle me-2"></i>Book Now
                                    </Link>
                                )}
                                {/* ^^^ END OF THE KEY CHANGE ^^^ */}

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClassList;