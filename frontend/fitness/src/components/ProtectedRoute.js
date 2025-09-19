import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        // User not logged in
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // User does not have the required role
        return <Navigate to="/" />; // Or to an 'unauthorized' page
    }

    return children;
};

export default ProtectedRoute;