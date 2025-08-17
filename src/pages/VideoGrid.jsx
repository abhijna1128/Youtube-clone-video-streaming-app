import VideoCard from './VideoCard';
import './videoCard.css';

export default function VideoGrid({ items, loading = false }) {
  if (loading) {
    return (
      <div className="row g-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="skeleton-card" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="row g-3">
      {items.map((video) => (
        <div key={video.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
}
