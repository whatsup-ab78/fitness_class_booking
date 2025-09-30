// frontend/src/components/Login.js

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext' // 1. IMPORT

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const { showNotification } = useNotification() // 2. GET THE FUNCTION

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      })
      login(response.data)
      // No success message needed, the redirect is enough
      if (response.data.user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Invalid credentials. Please try again.'
      setError(errorMsg)
      showNotification(errorMsg, 'error') // 3. SHOW LOGIN ERRORS IN THE ISLAND
    }
  }

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
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
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
                <label
                  className="form-check-label"
                  htmlFor="showPasswordCheck"
                >
                  Show Password
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <div className="text-center mt-3">
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;