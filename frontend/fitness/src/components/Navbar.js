// frontend/src/components/Navbar.js

import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/login'); };

    const linkClassName = "nav-link nav-link-custom";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-glass fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>
                    <i className="fas fa-dumbbell me-2"></i>FitFlex
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={linkClassName} to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={linkClassName} to="/classes">Classes</NavLink>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto d-flex align-items-center flex-row">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} title="Go to Dashboard">
                                        <i className="fas fa-user-circle navbar-user-icon"></i>
                                    </Link>
                                </li>
                                <li className="nav-item ms-3">
                                    <button className="btn btn-link nav-link nav-link-custom" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className={linkClassName} to="/register">Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={linkClassName} to="/login">Login</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;