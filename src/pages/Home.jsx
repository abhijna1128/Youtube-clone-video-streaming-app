import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VideoGrid from './VideoGrid';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    'All', 'Trending', 'Music', 'Gaming', 'Technology', 'News',
    'Sports', 'Education', 'Entertainment', 'Science'
  ];

  // Fetch videos
  useEffect(() => {
    fetch('/videos.json')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b.posted) - new Date(a.posted));
        setVideos(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  // Get category filter from URL query param
  const params = new URLSearchParams(location.search);
  const cat = params.get('cat');

  // Filter videos based on selected category
  const filtered = useMemo(() => {
    if (!cat || cat === 'all') return videos;
    return videos.filter(v => v.category.toLowerCase() === cat);
  }, [videos, cat]);

  return (
    <div className="container-fluid">
      {/* Category filter buttons */}
      <div className="category-filters mb-4" style={{ overflowX: 'auto' }}>
        <div className="d-flex gap-2" style={{ minWidth: 'max-content' }}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`btn btn-sm px-3 py-2 ${cat === category.toLowerCase() ? 'active' : ''}`}
              style={{
                background: cat === category.toLowerCase() ? 'var(--category-selected)' : 'var(--category-unselected)',
                color: 'var(--text)',
                border: 'none',
                borderRadius: '18px',
                whiteSpace: 'nowrap',
                fontSize: '14px',
                fontWeight: '500'
              }}
              onClick={() => {
                if (category === 'All') {
                  navigate(`/`);
                } else {
                  navigate(`/?cat=${category.toLowerCase()}`);
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Video grid */}
      <VideoGrid items={filtered} loading={loading} />
    </div>
  );
}
