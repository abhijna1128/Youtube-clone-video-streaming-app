import { Link } from 'react-router-dom';
import { formatViews, timeSince } from '../utils/format';
import './videoCard.css';

export default function VideoCard({ video }) {
  return (
    <Link className="video-card text-decoration-none" to={`/video/${video.id}`}>
      {/* Thumbnail */}
      <div className="thumb-wrap position-relative">
        <img src={video.thumbnail} alt={video.title} loading="lazy" />
        <span className="badge position-absolute bottom-0 end-0 m-1 bg-dark text-white">
          {video.duration}
        </span>
      </div>

      {/* Video meta */}
      <div className="d-grid grid-cols meta mt-2">
        <img
          className="avatar rounded-circle"
          src={video.channelAvatar}
          alt={video.channel}
          width={36}
          height={36}
        />
        <div className="text ms-2">
          <h3 className="title mb-1" title={video.title}>
            {video.title}
          </h3>
          <p className="sub mb-0">{video.channel}</p>
          <p className="sub text-muted">
            {formatViews(video.views)} • {timeSince(video.posted)}
          </p>
        </div>
      </div>
    </Link>
  );
}
