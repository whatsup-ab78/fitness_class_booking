// frontend/src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for convenience

function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState(''); // <-- 1. ADD STATE FOR THE ERROR MESSAGE
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError(''); // <-- 2. CLEAR PREVIOUS ERRORS ON NEW SUBMISSION

        try {
            await axios.post('http://localhost:5000/api/users/register', formData);
            alert('Registration successful! Please log in.'); // We can keep the success alert
            navigate('/login');
        } catch (err) {
            // <-- 3. SET THE SPECIFIC ERROR MESSAGE FROM THE BACKEND
            if (err.response && err.response.data.msg) {
                setError(err.response.data.msg); // e.g., "User already exists"
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
            console.error(err.response); // Keep this for debugging
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card p-4">
                    <div className="card-body">
                        <h2 className="text-center mb-4">Register</h2>

                        {/* vvv 4. DISPLAY THE ERROR MESSAGE HERE vvv */}
                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="text" placeholder="Username" name="username" value={formData.username} onChange={onChange} className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={onChange} className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={onChange} className="form-control" required minLength="6" />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Register</button>
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