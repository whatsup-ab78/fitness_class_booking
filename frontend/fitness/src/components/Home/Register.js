import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    address: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/user/register', formData);
      alert('Registration successful');
      setFormData({ name:'', email:'', phonenumber:'', address:'', password:'' });
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="col-lg-6">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4">Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" name="name" className="form-control" placeholder="Name"
                value={formData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input type="email" name="email" className="form-control" placeholder="Email"
                value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input type="text" name="phonenumber" className="form-control" placeholder="Phone Number"
                value={formData.phonenumber} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <textarea name="address" className="form-control" placeholder="Address" rows="3"
                value={formData.address} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
              <input type="password" name="password" className="form-control" placeholder="Password"
                value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            <p className="text-center mt-3">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
