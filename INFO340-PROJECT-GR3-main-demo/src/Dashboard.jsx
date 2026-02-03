import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import RestroomPost from './RestroomPost';
import './index.css';
import { toast } from 'react-toastify';
import { getDemoUser, loadPosts, savePost } from './demoStore';
import { like } from './Like';

// Static definition of image paths for each bathroom
const restroomImages = {
  "Mary Gates Hall": "/img/marygates.jpeg",
  "Odegaard Library": "/img/ode.jpeg",
  "Suzallo Library": "/img/suzzalo.jpeg",
  "Kane Hall": "/img/kanehall.jpeg",
  "Savery Hall": "/img/sav.jpeg",
  "Paul G. Allen Center for Computer Science & Engineering": "/img/allen.jpeg",
  "Denny Hall": "/img/denny.jpeg",
  "Bagley Hall": "/img/bagley.jpeg",
  "Paccar Hall": "/img/paccar.jpeg",
  "HUB": "/img/hub.jpeg"
};

export default function Dashboard({ user }) {
  const { restroomId } = useParams();
  const postsContainerRef = useRef(null);

  const [restroom, setRestroom] = useState('Odegaard Library');
  const [showAddPost, setShowAddPost] = useState(false);
  const [currentFloor, setCurrentFloor] = useState('1');
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([]);

  // Format timestamps to display as “just now” or “a few minutes ago,” etc.
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Just now";
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  useEffect(() => {
    if (restroomId) {
      setRestroom(decodeURIComponent(restroomId));
    }
  }, [restroomId]);

  // Demo mode: load posts from localStorage and filter by restroom
  useEffect(() => {
    const all = loadPosts();

    const postsArray = all
      .map((p) => {
        const raw = p.rawTimestamp || p.timestamp;
        return {
          ...p,
          rawTimestamp: raw,
          timestamp: formatTimestamp(raw)
        };
      })
      .sort((a, b) => new Date(b.rawTimestamp) - new Date(a.rawTimestamp))
      .filter((post) => post.restroom === restroom);

    setPosts(postsArray);
  }, [restroom]);

  useEffect(() => {
    if (postsContainerRef.current) {
      postsContainerRef.current.scrollTop = 0;
    }
  }, [posts]);

  // Handle new comments
  async function handleAddPost(e) {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const u = getDemoUser(user);

      const newPostData = {
        content: newPost.trim(),
        author: u.username || u.email || "Guest",
        authorId: u.email || "guest@demo.local",
        timestamp: new Date().toISOString(),
        floor: currentFloor,
        restroom: restroom
      };

      // Save to localStorage (demo)
      const saved = {
        ...newPostData,
        id: `p_${Date.now()}`,
        rawTimestamp: newPostData.timestamp
      };
      savePost(saved);

      // Update UI immediately
      const localPost = {
        ...newPostData,
        id: saved.id,
        rawTimestamp: newPostData.timestamp,
        timestamp: "Just now"
      };

      setPosts([localPost, ...posts]);
      setNewPost('');
      setShowAddPost(false);

      toast.success("Comment submitted successfully.");
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error("Failed to submit comment. Please try again.");
    }
  }

  const filtered = posts.filter((p) => p.floor === currentFloor);

  const getBuildingName = (restroomTitle) => {
    for (const buildingName of Object.keys(restroomImages)) {
      if (restroomTitle.includes(buildingName)) {
        return buildingName;
      }
    }
    return restroomTitle.split(" - ")[0];
  };

  const buildingName = getBuildingName(restroom);

  return (
    <div className="container">
      <div className="forum-container">
        <div className="posts-container" ref={postsContainerRef}>
          {filtered.length
            ? filtered.map((p) => (
              <RestroomPost
                key={p.id}
                content={p.content}
                author={p.author}
                timestamp={p.timestamp}
                authorId={p.authorId}
              />
            ))
            : <div className="no-posts">No posts for this floor yet. Be the first!</div>
          }
        </div>

        {showAddPost && (
          <div className="add-post-box">
            <form onSubmit={handleAddPost}>
              <textarea
                placeholder="Write your post here..."
                rows={4}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <div className="post-buttons">
                <button type="submit" className="submit-post">Submit</button>
                <button
                  type="button"
                  className="cancel-post"
                  onClick={() => setShowAddPost(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="controls">
          <button
            onClick={() => {
              if (!user) {
                toast.error("Please log in to post comments.");
              } else {
                setShowAddPost(true);
              }
            }}
          >
            Add Post
          </button>
        </div>
      </div>

      <aside className="details">
        <img
          src={restroomImages[buildingName] || "/img/default.jpeg"}
          alt={restroom}
          className="place-image"
        />
        <h2 className="place-header">{restroom}</h2>

        <nav className="tabs">
          {["1", "2", "3"].map((floor) => (
            <button
              key={floor}
              className={currentFloor === floor ? 'active' : ''}
              onClick={() => setCurrentFloor(floor)}
            >
              {floor === "1" ? "First Floor" : floor === "2" ? "Second Floor" : "Third Floor"}
            </button>
          ))}
        </nav>

        <div className="rating-group">
          {[
            ["Overall Rating", "★★★★☆"],
            ["Cleanliness", "★★★★☆"],
            ["Facility Quality", "★★★★★"],
            ["Odor Condition", "★★★☆☆"]
          ].map(([title, stars]) => (
            <div className="rating-wrapper" key={title}>
              <span className="rating-title">{title}</span>
              <span className="stars">{stars}</span>
            </div>
          ))}
        </div>

        <div className="info">
          <p><span className="icon">📍</span>4060 George Washington Lane NE, Seattle, WA 98195</p>
          <p><span className="icon">⏰</span><span className="status open">Open</span> · Closes 10 PM</p>
          <p className="update-note">Updated by this business 9 weeks ago</p>
        </div>

        <Link to={`/rate/${encodeURIComponent(restroom)}`} className="suggest-edit">
          Rate
        </Link>

        <button
          className="like-btn"
          onClick={() =>
            like({
              id: restroom,
              name: restroom,
              image: restroomImages[buildingName] || "/img/default.jpeg",
              location: buildingName
            })
          }
        >
          ❤️ Like
        </button>
      </aside>
    </div>
  );
}
