import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

function RestroomPost({ content, author, timestamp, authorId, id }) {
  const [likeCount, setLikeCount] = useState(0);
  
  // Load like count from localStorage when component mounts
  useEffect(() => {
    const storedLikes = localStorage.getItem(`post-like-${id}`);
    if (storedLikes) {
      setLikeCount(parseInt(storedLikes, 10));
    }
  }, [id]);
  
  const handleLike = () => {
    const newCount = likeCount + 1;
    setLikeCount(newCount);
    // Save to localStorage
    localStorage.setItem(`post-like-${id}`, newCount.toString());
  };

  return (
    <div className="post">
      <div className="post-header">
        <Link to={`/profile/${authorId}`} className="post-author">
          {author}
        </Link>
        <span className="post-time">{timestamp}</span>
      </div>
      <div className="post-content">
        {content}
      </div>
      <div className="post-actions">
        <button className="post-action-btn like-btn" onClick={handleLike}>
          <span className="action-icon">👍</span> Like ({likeCount})
        </button>
      </div>
    </div>
  );
}

export default RestroomPost; 