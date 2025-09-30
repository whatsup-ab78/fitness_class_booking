// frontend/src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for the password toggle
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            await axios.post('/api/users/register', formData);
            showNotification('Registration successful! Please log in.');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'An unexpected error occurred. Please try again.';
            setError(errorMsg);
            showNotification(errorMsg, 'error');
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card p-4">
                    <div className="card-body">
                        <h2 className="text-center mb-4">Register</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={onChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={onChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={onChange}
                                    className="form-control"
                                    required
                                    minLength="6"
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="showPasswordCheck"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                />
                                <label className="form-check-label" htmlFor="showPasswordCheck">
                                    Show Password
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Register
                            </button>
                        </form>
                        <div className="text-center mt-3">
                            <p>
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;