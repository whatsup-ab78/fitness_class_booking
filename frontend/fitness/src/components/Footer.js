// frontend/src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5>FitFlex</h5>
                        <p>Your journey to a healthier lifestyle starts here. Join us and discover your potential.</p>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li><Link to="/classes" className="text-white text-decoration-none">Classes</Link></li>
                            <li><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5>Follow Us</h5>
                        <div>
                            <a href="#" className="text-white me-3 fs-4"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="text-white me-3 fs-4"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-white fs-4"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <hr />
                <p className="mb-0">© {new Date().getFullYear()} FitFlex. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;