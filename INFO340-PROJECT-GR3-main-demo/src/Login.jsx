// Demo-only Login (no Firebase). Keeps the original UI, but stores a local user for portfolio viewing.
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import './index.css';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from') || '/';

  function handleSubmit(e) {
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
      navigate(from);
    } catch (err) {
      setErrorMsg('Login failed in demo mode.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to Dubloo (Demo)</p>
        </div>

        {errorMsg && <div className="error-message">{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
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
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don&apos;t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
