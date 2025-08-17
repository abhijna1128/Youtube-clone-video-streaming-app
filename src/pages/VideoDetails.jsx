import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import VideoCard from "./VideoCard.jsx";
import { formatViews, timeSince } from '../utils/format';

function useLikes(id) {
  const key = `likes:${id}`;
  const [state, setState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || { likes: 0, dislikes: 0, me: null };
    } catch {
      return { likes: 0, dislikes: 0, me: null };
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  const like = () =>
    setState((s) => ({
      ...s,
      likes: s.me === "like" ? s.likes - 1 : s.likes + 1,
      dislikes: s.me === "dislike" ? s.dislikes - 1 : s.dislikes,
      me: s.me === "like" ? null : "like",
    }));

  const dislike = () =>
    setState((s) => ({
      ...s,
      dislikes: s.me === "dislike" ? s.dislikes - 1 : s.dislikes + 1,
      likes: s.me === "like" ? s.likes - 1 : s.likes,
      me: s.me === "dislike" ? null : "dislike",
    }));

  return { state, like, dislike };
}

export default function VideoDetails() {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state, like, dislike } = useLikes(id);
  const [subscribed, setSubscribed] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(async () => {
      const res = await fetch("/videos.json");
      const data = await res.json();
      setVideos(data);
      setLoading(false);
    }, 400);
  }, [id]);

  const video = useMemo(() => videos.find((v) => v.id === id), [videos, id]);

  const related = useMemo(() => {
    if (!video) return [];
    return videos.filter((v) => (video.related || []).includes(v.id));
  }, [videos, video]);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading video...</p>
      </div>
    );

  if (!video)
    return (
      <div className="p-5 text-center">
        Video not found. <Link to="/">Go Home</Link>
      </div>
    );

  return (
    <div className="video-page-container container my-4">
      <div className="row g-4">
        {/* Left/Main Video Section */}
        <div className="col-12 col-lg-8">
          <div className="video-player-container mb-4 ratio ratio-16x9">
            <iframe
              src={video.src}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <h1 className="video-title mb-3">{video.title}</h1>

          {/* Actions */}
          <div className="video-actions-section mb-4 d-flex justify-content-between flex-wrap align-items-center">
            <div className="video-stats d-flex align-items-center gap-3">
              <span>{formatViews(video.views) || "0 views"}</span>
              <span>{timeSince(video.posted)}</span>
            </div>
            <div className="action-buttons d-flex gap-2 align-items-center flex-wrap">
              <button className="video-btn" onClick={like}>
                <i className="fas fa-thumbs-up me-2"></i> {state.likes}
              </button>
              <button className="video-btn" onClick={dislike}>
                <i className="fas fa-thumbs-down me-2"></i> {state.dislikes}
              </button>
              <button className="video-btn">
                <i className="fas fa-share me-2"></i> Share
              </button>
              <button className="video-btn">
                <i className="fas fa-download me-2"></i> Download
              </button>
              <button className="video-btn">
                <i className="fas fa-cut me-2"></i> Clip
              </button>
              <button className="video-btn">
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
          </div>

          {/* Channel Info */}
          <div className="channel-section mb-4 p-3 rounded d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <img
                src={video.channelAvatar || "https://i.pravatar.cc/48"}
                alt={video.channel || "Channel"}
                width="48"
                height="48"
                className="rounded-circle"
              />
              <div>
                <div className="channel-name fw-bold">{video.channel || "Unknown"}</div>
                <div className="subscriber-count">1.8K subscribers</div>
              </div>
            </div>
            <button
              className={`btn ${subscribed ? "btn-secondary" : "btn-danger"}`}
              onClick={() => setSubscribed(!subscribed)}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          {/* Description */}
          <div className="video-description-section mb-4 p-3 rounded">
            <p>{showMore ? video.description : (video.description?.slice(0, 150) || "") + "..."}</p>
            <button className="btn btn-link p-0" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show less" : "Show more"}
            </button>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <div className="comments-header d-flex justify-content-between mb-3">
              <h5 className="mb-0">
                <i className="fas fa-comments me-2"></i> {(video.comments || []).length} Comments
              </h5>
              <select className="form-select form-select-sm w-auto">
                <option>Sort by</option>
                <option>Top comments</option>
                <option>Newest first</option>
              </select>
            </div>

            <div className="add-comment-section mb-4 d-flex gap-3">
              <i className="fas fa-user-circle text-muted" style={{ fontSize: "2rem" }}></i>
              <input
                type="text"
                className="form-control"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </div>

            {(video.comments || []).length > 0 ? (
              video.comments.map((c) => (
                <div key={c.id} className="comment-item mb-3 d-flex gap-3">
                  <i className="fas fa-user-circle text-muted" style={{ fontSize: "2rem" }}></i>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">@{c.user}</span>
                      <span className="text-muted">1 month ago</span>
                    </div>
                    <p>{c.text}</p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-light">
                        <i className="fas fa-thumbs-up me-1"></i> {c.likes || 0}
                      </button>
                      <button className="btn btn-sm btn-outline-light">Reply</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted py-4">
                <i className="fas fa-comments mb-3" style={{ fontSize: "3rem" }}></i>
                <p>No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right/Sidebar - Related Videos */}
        <div className="col-12 col-lg-4">
          <div className="related-videos-section">
            <h5 className="mb-3">
              <i className="fas fa-list me-2"></i> Related Videos
            </h5>
            {related.length > 0 ? (
              related.map((v) => (
                <div key={v.id} className="related-video-item mb-3">
                  <VideoCard video={v} />
                </div>
              ))
            ) : (
              <div className="text-center text-muted py-4">
                <i className="fas fa-video mb-3" style={{ fontSize: "3rem" }}></i>
                <p>No related videos found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
