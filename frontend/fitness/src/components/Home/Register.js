import React from 'react';

const Register = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="col-lg-6">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4">Register</h3>
          <form>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Phone Number" />
            </div>
            <div className="mb-3">
              <textarea className="form-control" placeholder="Address" rows="3"></textarea>
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Password" />
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
