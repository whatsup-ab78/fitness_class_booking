// frontend/src/components/ClassList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClassList() {
    //                                   vvv THIS IS THE CRUCIAL LINE THAT WAS LIKELY MISSING vvv
    const [classes, setClasses] = useState([]); // This creates the 'classes' variable as an empty array.

    useEffect(() => {
        axios.get('http://localhost:5000/api/classes')
            .then(response => {
                // This updates the 'classes' variable with data from the API
                setClasses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the classes!', error);
            });
    }, []); // The empty array means this effect runs only once when the component loads

    return (
        <div>
            <h2 className="mb-4" style={{ color: 'var(--primary-color)' }}>Class Schedule</h2>
            <div className="row">
                {/* Now, this line can successfully use the 'classes' variable */}
                {classes.map(cls => (
                    <div className="col-md-4 mb-4" key={cls._id}>
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{cls.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{cls.category}</h6>
                                <p className="card-text">{cls.description}</p>
                                <p><strong><i className="fas fa-user-tie me-2"></i>Instructor:</strong> {cls.instructor}</p>
                                <p><strong><i className="fas fa-clock me-2"></i>Duration:</strong> {cls.duration} mins</p>
                                <p className="fs-5 mt-auto"><strong>Price:</strong> ${cls.price}</p>
                                <button className="btn btn-primary">
                                    <i className="fas fa-check-circle me-2"></i>Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClassList;