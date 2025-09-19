import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ClassList from './components/ClassList';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer'; 
import Register from './components/Register';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-5">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/classes" element={<ClassList />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected User Route */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute allowedRoles={['user', 'admin']}>
                                <UserDashboard />
                            </ProtectedRoute>
                        } 
                    />
                    
                    {/* Protected Admin Route */}
                    <Route 
                        path="/admin" 
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } 
                    />

                    <Route path="/register" element={<Register />} />
                    
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;