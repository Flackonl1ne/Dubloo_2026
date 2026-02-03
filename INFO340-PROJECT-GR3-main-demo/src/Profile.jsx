import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import './index.css';
import { getDemoUser, loadReviews, loadFavorites, removeFavorite as removeFavLS } from './demoStore';

// I used ChatGPT here to help me design a mock UI for logging restroom usage notes.
function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [profilePic, setProfilePic] = useState('img/default-profile.png');
  const [displayName, setDisplayName] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [usageLog, setUsageLog] = useState([]);
  const [usageNote, setUsageNote] = useState('');
  const [activeTab, setActiveTab] = useState('reviews');
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    if (userId && userId !== 'current-user') {
      setIsCurrentUser(false);
      setDisplayName(userId);
    } else {
      setIsCurrentUser(true);
      setDisplayName(user?.username || 'Guest');
    }
  }, [userId, user]);

  useEffect(() => {
  const u = getDemoUser(user);
  const allReviews = loadReviews();
  const filtered = allReviews.filter(r => r.userId === u.email);
  setMyReviews(filtered);
}, [user]);

useEffect(() => {
  const u = getDemoUser(user);
  setFavorites(loadFavorites(u.uid));
}, [user]);

function handlePicChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    // I asked ChatGPT how to preview a selected profile picture before uploading.
   // It showed me how to use FileReader to do that in React.
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePic(ev.target.result);
    reader.readAsDataURL(file);
  }

  function removeFavorite(id) {
    const u = getDemoUser(user);
    const updatedFavorites = removeFavLS(u.uid, id);
    setFavorites(updatedFavorites);
  }

  function handleLogSubmit(e) {
    e.preventDefault();
    if (!usageNote.trim()) return;
    const newEntry = {
      note: usageNote,
      timestamp: new Date().toLocaleString(),
    };
    const updatedLog = [newEntry, ...usageLog];
    setUsageLog(updatedLog);
    setUsageNote('');
  }

  function handleLogout() {
    setUser(null);
    navigate('/');
  }

// This ternary rendering pattern was suggested by ChatGPT to simplify logic.
// I understand we could also do this with if-else, but this is more concise.
  const favoriteRestroomsList = favorites.length === 0 ? (
    <p>No saved restrooms yet.</p>
  ) : (
    favorites.map(r => (
      <li key={r.id} className="favorite-item">
        <div className="favorite-info">
          <strong>{r.name}</strong>
          <small>{r.location}</small>
        </div>
        {isCurrentUser && (
          <button onClick={() => removeFavorite(r.id)} className="remove-btn" aria-label="Remove favorite">×</button>
        )}
      </li>
    ))
  );

  const usageLogList = usageLog.map((entry, i) => (
    <li key={i} className="log-entry">
      <span className="log-time">{entry.timestamp}</span>
      <p className="log-note">{entry.note}</p>
    </li>
  ));

// ChatGPT helped me generate this star rating display using Array.fill + map.
// It works well but may be more advanced than what we normally write in INFO 340.
  const reviewsList = myReviews.map((r, i) => (
    <li key={i} className="review-item">
      <div className="review-header">
        <h4>{r.restroom}</h4>
        <div className="overall-rating">
          {Array(5).fill(0).map((_, i2) => (
            <span key={i2} className={i2 < r.overall ? "star filled" : "star"}>
              {i2 < r.overall ? "★" : "☆"}
            </span>
          ))}
        </div>
      </div>
      <div className="review-details">
        <div className="rating-item">
          <span className="rating-label">Cleanliness:</span>
          <span className="rating-value">{r.cleanliness}/5</span>
        </div>
        <div className="rating-item">
          <span className="rating-label">Odor:</span>
          <span className="rating-value">{r.odor}/5</span>
        </div>
        <div className="rating-item">
          <span className="rating-label">Facility:</span>
          <span className="rating-value">{r.facility}/5</span>
        </div>
        <div className="rating-item">
          <span className="rating-label">Comment:</span>
          <span className="rating-value">{r.comment || 'None'}</span>
        </div>
      </div>
    </li>
  ));

// This section was suggested by ChatGPT to visualize restrooms I’ve added.
  const addedRestroomsList = addedRestrooms.map((r, i) => (
    <li key={i} className="added-restroom">
      <span className="restroom-name">{r.name}</span>
      <span className="restroom-floor">{r.floor} Floor</span>
    </li>
  ));

  return (
    <div className="profile-page">
      <main className="profile-container">
        <section className="profile-hero">
          <div className="profile-header">
            <div className="profile-picture">
              <img src={profilePic} alt="Profile" />
              {isCurrentUser && (
                <div className="upload-overlay">
                  <label htmlFor="upload-pic" className="upload-btn">
                    <span>Change Photo</span>
                    <input type="file" id="upload-pic" accept="image/*" onChange={handlePicChange} />
                  </label>
                </div>
              )}
            </div>
            <div className="profile-info">
              <h2>{displayName}</h2>
              <p className="email">{isCurrentUser ? user?.email : userId}</p>
              <p className="member-since">Member since: January 2025</p>
            </div>
          </div>
        </section>

        <section className="profile-tabs">
          <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Reviews</button>
          <button className={activeTab === 'favorites' ? 'active' : ''} onClick={() => setActiveTab('favorites')}>Favorites</button>
          {isCurrentUser && (
            <>
              <button className={activeTab === 'log' ? 'active' : ''} onClick={() => setActiveTab('log')}>Log</button>
              <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Settings</button>
            </>
          )}
        </section>

        <section className="profile-content">
          {activeTab === 'reviews' && (
            <div className="tab-content">
              <h3>Restroom Reviews</h3>
              {reviewsList.length > 0 ? (
                <ul className="reviews-list">{reviewsList}</ul>
              ) : (
                <p className="empty-message">No reviews yet.</p>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="tab-content">
              <h3>Saved Restrooms</h3>
              <ul className="favorites-list">{favoriteRestroomsList}</ul>
            </div>
          )}

          {activeTab === 'log' && isCurrentUser && (
            <div className="tab-content">
              <h3>Toilet Usage Log</h3>
              <form onSubmit={handleLogSubmit} className="log-form">
                <textarea placeholder="How was your restroom experience?" value={usageNote} onChange={(e) => setUsageNote(e.target.value)} />
                <button type="submit" className="log-btn">Log Usage</button>
              </form>
              <ul className="usage-log">{usageLogList}</ul>
            </div>
          )}

          {activeTab === 'settings' && isCurrentUser && (
            <div className="tab-content">
              <h3>Account Settings</h3>
              <div className="settings-section">
                <h4>Notification Preferences</h4>
                <div className="setting-item">
                  <label><input type="checkbox" defaultChecked /> Email notifications</label>
                </div>
                <div className="setting-item">
                  <label><input type="checkbox" defaultChecked /> Push notifications</label>
                </div>
              </div>
              <div className="settings-section">
                <h4>Privacy</h4>
                <div className="setting-item">
                  <label><input type="checkbox" defaultChecked /> Show my reviews publicly</label>
                </div>
                <div className="setting-item">
                  <label><input type="checkbox" /> Hide my usage log</label>
                </div>
              </div>
              <div className="settings-section">
                <h4>Account</h4>
                <button className="settings-btn">Change Password</button>
                <button className="settings-btn danger" onClick={handleLogout}>Log Out</button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;
