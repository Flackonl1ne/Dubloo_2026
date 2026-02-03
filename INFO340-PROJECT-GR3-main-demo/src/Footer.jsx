import React from 'react';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Dubloo</h3>
          <p>Find and rate the best restrooms at UW.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/ranking">Rankings</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>University of Washington</p>
          <p>Seattle, WA 98195</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Dubloo © {new Date().getFullYear()} – Built for INFO 340 at the University of Washington</p>
      </div>
    </footer>
  );
}

export default Footer; 