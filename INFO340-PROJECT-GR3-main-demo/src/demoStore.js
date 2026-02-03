// Simple localStorage-backed data layer for portfolio demo (no Firebase required)

const POSTS_KEY = "dubloo_demo_posts";
const REVIEWS_KEY = "dubloo_demo_reviews";
const FAV_KEY_PREFIX = "dubloo_demo_favorites_";

function safeParse(jsonStr, fallback) {
  try { return JSON.parse(jsonStr) ?? fallback; } catch { return fallback; }
}

export function getDemoUser(user) {
  // If the app doesn't have an authenticated user, we fall back to a stable guest.
  if (user && (user.uid || user.email)) {
    return {
      uid: user.uid || `u_${hashString(user.email || "guest")}`,
      email: user.email || "guest@demo.local",
      username: user.username || user.email || "Guest",
    };
  }
  return { uid: "guest", email: "guest@demo.local", username: "Guest" };
}

export function hashString(str) {
  // tiny deterministic hash for demo IDs (not security-related)
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h.toString(16);
}

export function loadPosts() {
  return safeParse(localStorage.getItem(POSTS_KEY), []);
}

export function savePost(post) {
  const posts = loadPosts();
  const next = [post, ...posts];
  localStorage.setItem(POSTS_KEY, JSON.stringify(next));
  return next;
}

export function loadReviews() {
  return safeParse(localStorage.getItem(REVIEWS_KEY), []);
}

export function saveReview(review) {
  const reviews = loadReviews();
  const next = [review, ...reviews];
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(next));
  return next;
}

export function loadFavorites(uid) {
  return safeParse(localStorage.getItem(FAV_KEY_PREFIX + uid), []);
}

export function saveFavorite(uid, restroom) {
  const favorites = loadFavorites(uid);
  const exists = favorites.some(r => r.id === restroom.id);
  const next = exists ? favorites : [restroom, ...favorites];
  localStorage.setItem(FAV_KEY_PREFIX + uid, JSON.stringify(next));
  return next;
}

export function removeFavorite(uid, restroomId) {
  const favorites = loadFavorites(uid);
  const next = favorites.filter(r => r.id !== restroomId);
  localStorage.setItem(FAV_KEY_PREFIX + uid, JSON.stringify(next));
  return next;
}

export function seedDemoData() {
  if (typeof window === "undefined") return;

  const existingPosts = loadPosts();
  const existingReviews = loadReviews();

  if (existingPosts.length === 0) {
    const now = Date.now();
    const sample = [
      {
        id: `p_${now-300000}`,
        content: "Clean and quiet. Paper towels were stocked.",
        author: "Alex",
        authorId: "alex@demo.local",
        floor: "1",
        restroom: "Mary Gates Hall - First Floor",
        timestamp: new Date(now-300000).toISOString(),
        rawTimestamp: new Date(now-300000).toISOString()
      },
      {
        id: `p_${now-7200000}`,
        content: "Busy between classes, but still okay.",
        author: "Guest",
        authorId: "guest@demo.local",
        floor: "2",
        restroom: "Odegaard Library - Second Floor",
        timestamp: new Date(now-7200000).toISOString(),
        rawTimestamp: new Date(now-7200000).toISOString()
      }
    ];
    localStorage.setItem(POSTS_KEY, JSON.stringify(sample));
  }

  if (existingReviews.length === 0) {
    const now = Date.now();
    const sample = [
      {
        id: `r_${now-600000}`,
        userId: "alex@demo.local",
        username: "Alex",
        restroom: "Mary Gates Hall - First Floor",
        cleanliness: 5,
        odor: 4,
        facility: 4,
        overall: 5,
        comment: "Great for a quick stop.",
        amenities: { hasPaper: true, hasSoap: true, isAccessible: true, isGenderNeutral: false },
        timestamp: new Date(now-600000).toISOString()
      }
    ];
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(sample));
  }
}
