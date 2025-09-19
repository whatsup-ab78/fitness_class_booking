// frontend/src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // <-- 1. IMPORT Link HERE
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // It sends the 'email' and 'password' from the form fields
        const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
        login(response.data);
        
        if (response.data.user.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/dashboard');
        }
    } catch (err) {
        // It sets our error message when the backend sends a 400 or 500 status
        setError('Invalid credentials. Please try again.');
    }
};

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card p-4">
                    <div className="card-body">
                        <h2 className="text-center mb-4">Login</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                        
                        {/* vvv 2. ADD THIS SECTION BELOW THE FORM vvv */}
                        <div className="text-center mt-3">
                            <p>
                                Don't have an account? <Link to="/register">Sign Up</Link>
                            </p>
                        </div>
                        {/* ^^^ END OF NEW SECTION ^^^ */}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;