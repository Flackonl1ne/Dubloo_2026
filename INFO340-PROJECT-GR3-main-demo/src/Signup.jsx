// Demo-only Signup (no Firebase). Creates a local user for portfolio viewing.
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './index.css';

export default function Signup({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please fill in both fields.');
      return;
    }

    setIsLoading(true);
    try {
      const demoUser = {
        email,
        username: email.split('@')[0] || 'Guest',
        uid: `u_${email.replace(/[^a-z0-9]/gi, '')}`
      };
      setUser?.(demoUser);
      navigate('/');
    } catch (err) {
      setErrorMsg('Signup failed in demo mode.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Create Account</h1>
          <p>Sign up to get started with Dubloo (Demo)</p>
        </div>

        {errorMsg && <div className="error-message">{errorMsg}</div>}

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="any password (demo)"
            />
          </div>

          <button className="login-btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
