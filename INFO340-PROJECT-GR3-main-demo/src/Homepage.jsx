import React, { useRef } from 'react';
import MapComponent from './Map';
import { Link } from 'react-router';
import './index.css';

export function Homepage() {
  const mapRef = useRef(null);

  const scrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Find the Best Restrooms at UW</h1>
          <p>Discover, rate, and share restroom experiences across campus</p>
          <div className="hero-buttons">
            <button onClick={scrollToMap} className="btn secondary-btn">Explore Map</button>
            <Link to="/ranking" className="btn primary-btn">View Rankings</Link>
          </div>
        </div>
      </div>

      <div className="about-container">
        <h2>Welcome to Dubloo</h2>
        <p>
          Dubloo is a web application designed to improve restroom accessibility, cleanliness, and transparency across the University of Washington campus.
        </p>
      </div>

      <div className="content-wrapper">
        <div className="grid">
          <div className="card">
            <h3>🎯 Our Purpose</h3>
            <p>UW's current campus restroom information is limited to static maps. Dubloo provides real-time data, user reviews, and detailed information about campus restrooms.</p>
          </div>
          <div className="card">
            <h3>⭐ Rating & Reviewing Restrooms</h3>
            <p>Dubloo allows users to evaluate restrooms on cleanliness, facility quality, odor condition, and more. Share your experiences and help others find the best facilities.</p>
          </div>
          <div className="card">
            <h3>🚻 Personalized Experience</h3>
            <p>Track your restroom usage, save your favorites, and get personalized recommendations based on your preferences and location on campus.</p>
          </div>
        </div>

        {/* ✅ 保留原地图模块 + ref */}
        <div ref={mapRef} className="map-container">
          <h2>Explore Campus Restrooms</h2>
          <MapComponent />
        </div>
      </div>
    </div>
  );
}
