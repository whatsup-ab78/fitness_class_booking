import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/fitness/login", user);
      const { usertype } = res.data;
      localStorage.setItem("userEmail", res.data.username);

      if (usertype === 'admin') {
        navigate('/admin');
      } else if (usertype === 'user') { // Added condition for 'user' usertype
        navigate('/user');
      } else {
        // Handle cases where usertype is neither admin nor user, perhaps a default redirect
        console.log("Unknown user type:", usertype);
        // navigate('/default-home-page'); // Example of a default redirect
      }

    } catch (err) { // Catch the actual error object for better debugging
      setError("Invalid username or password");
      console.error("Login error:", err); // Log the error to the console
    }
  };

  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form p-l-55 p-r-55 p-t-178" onSubmit={handleSubmit}>
              <span className="login100-form-title">
                Sign In
              </span>
              {error && <p className="text-danger small mb-3">{error}</p>}
              <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Email"
                  onChange={(e) => setUser({ ...user, username: (e.target.value) })}
                  value={user.username}
                />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Please enter password">
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Password"
                  onChange={(e) => setUser({ ...user, password: (e.target.value) })}
                  value={user.password}
                />
                <span className="focus-input100"></span>
              </div>

              <div className="text-right p-t-13 p-b-23">
              </div>

              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  Sign in
                </button>
              </div>

              <div className="flex-col-c p-t-170 p-b-40">
                <span className="txt1 p-b-9">
                  Don’t have an account?
                </span>
                <a href="/register" className="txt3">
                  Sign up now
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
