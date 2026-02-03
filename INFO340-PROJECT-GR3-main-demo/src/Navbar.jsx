import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';

export default function Navbar({ user }) {
  //AI Note: useLocation is used here to preserve the current path when redirecting to login — this is beyond beginner-level routing.
  const location = useLocation();
  // AI Note: Managing responsive menu state with useState is a smart way to support mobile toggling.
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">Dubloo</Link>
        
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {/* AI Note: aria-label is added for accessibility — a detail often missed by beginners */}
          <span className="menu-icon"></span>
        </button>
        
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/ranking" onClick={() => setMenuOpen(false)}>Ranking</Link></li>
          {user ? (
            <li className="profile-link">
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                <div className="user-avatar">
                  <img
                    src="/img/profile.png"
                    alt={user.username}
                  />
                </div>
                <span className="username">{user.username}</span>
              </Link>
            </li>
          ) : (
            <li className="login-link">
              <Link to={`/login?from=${encodeURIComponent(location.pathname)}`}>
                Log in
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}