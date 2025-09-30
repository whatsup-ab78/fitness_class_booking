import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth(); // Get the new loading state

    // Wait until the initial authentication check is complete
    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    // After loading, if there's no user, redirect to login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If roles are specified and the user's role is not included, redirect
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />; // Redirect to home for unauthorized roles
    }

    return children;
};

export default ProtectedRoute;