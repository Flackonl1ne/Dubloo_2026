// Updated Rate.jsx (Demo mode: localStorage review submission)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';
import { getDemoUser, saveReview } from './demoStore';

function Rate({ user }) {
  const { restroomId } = useParams();
  const navigate = useNavigate();

  const [restroomName, setRestroomName] = useState('');
  const [overallScore, setOverallScore] = useState('');
  const [cleanlinessScore, setCleanlinessScore] = useState('');
  const [facilityScore, setFacilityScore] = useState('');
  const [odorScore, setOdorScore] = useState('');
  const [comment, setComment] = useState('');
  const [hasPaper, setHasPaper] = useState(true);
  const [hasSoap, setHasSoap] = useState(true);
  const [isAccessible, setIsAccessible] = useState(false);
  const [isGenderNeutral, setIsGenderNeutral] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState({
    overall: 0,
    cleanliness: 0,
    facility: 0,
    odor: 0
  });

  useEffect(() => {
    if (restroomId) {
      setRestroomName(decodeURIComponent(restroomId));
    }
  }, [restroomId]);

  // Based on the rating category clicked by the user, save the corresponding rating value
  const handleStarClick = (category, rating) => {
    switch (category) {
      case 'overall':
        setOverallScore(rating.toString());
        break;
      case 'cleanliness':
        setCleanlinessScore(rating.toString());
        break;
      case 'facility':
        setFacilityScore(rating.toString());
        break;
      case 'odor':
        setOdorScore(rating.toString());
        break;
      default:
        break;
    }
  };

  const handleStarHover = (category, rating) => {
    setHoverRating(prev => ({ ...prev, [category]: rating }));
  };

  const handleStarLeave = (category) => {
    setHoverRating(prev => ({ ...prev, [category]: 0 }));
  };

  const renderStarRating = (category, value) => {
    const rating = hoverRating[category] || parseInt(value) || 0;
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''}`}
            onClick={() => handleStarClick(category, star)}
            onMouseEnter={() => handleStarHover(category, star)}
            onMouseLeave={() => handleStarLeave(category)}
          >
            {star <= rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  const validateRatings = () => {
    if (!overallScore || !cleanlinessScore || !facilityScore || !odorScore) {
      setErrorMsg('Please provide all ratings');
      return false;
    }
    if (!user) {
      setErrorMsg('Please log in to submit a review');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateRatings()) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const u = getDemoUser(user);

      const reviewData = {
        id: `r_${Date.now()}`,
        userId: u.email || "guest@demo.local",
        username: u.username || u.email || "Guest",
        restroom: restroomName,
        cleanliness: Number(cleanlinessScore),
        odor: Number(odorScore),
        facility: Number(facilityScore),
        overall: Number(overallScore),
        comment,
        amenities: { hasPaper, hasSoap, isAccessible, isGenderNeutral },
        timestamp: new Date().toISOString()
      };

      // Demo mode: save to localStorage
      saveReview(reviewData);

      setIsSubmitting(false);
      setSubmitted(true);

      setTimeout(() => {
        navigate(`/dashboard/${encodeURIComponent(restroomName)}`);
      }, 800);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      setErrorMsg('Failed to submit in demo mode.');
    }
  };

  if (submitted) {
    return (
      <div className="rate-success">
        <div className="success-icon">✅</div>
        <h2>Thank you for your review!</h2>
        <p>Your rating for {restroomName} has been submitted.</p>
        <p>Redirecting to restroom page...</p>
      </div>
    );
  }

  return (
    <div className="rate-container">
      <div className="rate-header">
        <h2>Rate Restroom</h2>
        {restroomName && <h3>{restroomName}</h3>}
      </div>

      {errorMsg && <div className="error-message">{errorMsg}</div>}

      <form className="rate-form" onSubmit={handleSubmit}>
        <div className="rating-section">
          <div className="rating-group">
            <label>Overall Rating</label>
            {renderStarRating('overall', overallScore)}
            <span className="rating-value">{overallScore ? `${overallScore}/5` : ''}</span>
          </div>

          <div className="rating-group">
            <label>Cleanliness</label>
            {renderStarRating('cleanliness', cleanlinessScore)}
            <span className="rating-value">{cleanlinessScore ? `${cleanlinessScore}/5` : ''}</span>
          </div>

          <div className="rating-group">
            <label>Facility Quality</label>
            {renderStarRating('facility', facilityScore)}
            <span className="rating-value">{facilityScore ? `${facilityScore}/5` : ''}</span>
          </div>

          <div className="rating-group">
            <label>Odor Condition</label>
            {renderStarRating('odor', odorScore)}
            <span className="rating-value">{odorScore ? `${odorScore}/5` : ''}</span>
          </div>
        </div>

        <div className="amenities-section">
          <h3>Amenities & Features</h3>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={hasPaper}
                onChange={(e) => setHasPaper(e.target.checked)}
              />
              {' '}Has Toilet Paper
            </label>

            <label>
              <input
                type="checkbox"
                checked={hasSoap}
                onChange={(e) => setHasSoap(e.target.checked)}
              />
              {' '}Has Soap
            </label>

            <label>
              <input
                type="checkbox"
                checked={isAccessible}
                onChange={(e) => setIsAccessible(e.target.checked)}
              />
              {' '}Wheelchair Accessible
            </label>

            <label>
              <input
                type="checkbox"
                checked={isGenderNeutral}
                onChange={(e) => setIsGenderNeutral(e.target.checked)}
              />
              {' '}Gender Neutral
            </label>
          </div>
        </div>

        <div className="comment-section">
          <label htmlFor="comment">Additional Comments</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Rate;
