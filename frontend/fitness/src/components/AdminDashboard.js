import React from 'react';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
    const { user } = useAuth();
    return (
        <div>
            <h2 className="mb-4">Admin Dashboard</h2>
             <div className="alert alert-success">
                Welcome, {user?.username}! You are logged in as an Administrator.
             </div>
            {/* Admin functionalities would go here */}
        </div>
    );
}

export default AdminDashboard;