// frontend/src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ClassList from './components/ClassList';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import BookingPage from './components/BookingPage';
import setAuthToken from './utils/setAuthToken';
import DynamicIsland from './components/DynamicIsland';
import './App.css';

function App() {
    // This effect runs once when the app component loads.
    // It's the most reliable way to set the auth token for all API requests.
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        }
    }, []); // The empty dependency array ensures this runs only once.

    return (
        <Router>
            <DynamicIsland />
            <Navbar />
            <div className="container mt-5">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/classes" element={<ClassList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/book/:id" element={<ProtectedRoute allowedRoles={['user', 'admin']}><BookingPage /></ProtectedRoute>} />
                    <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['user', 'admin']}><UserDashboard /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;