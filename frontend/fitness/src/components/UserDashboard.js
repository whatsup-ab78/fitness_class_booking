import React from 'react';
import { useAuth } from '../context/AuthContext';

function UserDashboard() {
    const { user } = useAuth();

    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Welcome, {user?.username}!</h1>
                <p className="col-md-8 fs-4">This is your personal dashboard. Here you can view your upcoming booked classes and manage your profile.</p>
                {/* Bookings list would go here */}
            </div>
        </div>
    );
}

export default UserDashboard;