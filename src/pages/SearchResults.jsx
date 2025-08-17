import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatViews, timeSince } from '../utils/format';
import './searchResults.css';

export default function SearchResults() {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('/videos.json')
      .then(res => res.json())
      .then(data => {
        const lowerQuery = query.toLowerCase();
        const filtered = data.filter(v =>
          v.title.toLowerCase().includes(lowerQuery) ||
          v.channel.toLowerCase().includes(lowerQuery)  
        );
        setResults(filtered);
      });
  }, [query]);

  if (!results.length) {
    return (
      <div className="search-results">
        <h2>No results found for "{query}"</h2>
      </div>
    );
  }

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      <div className="results-grid">
        {results.map(v => (
          <Link key={v.id} to={`/video/${v.id}`} className="result-card">
            <img src={v.thumbnail} alt={v.title} />
            <div>
              <h3>{v.title}</h3>
              <p className="meta">{v.channel}</p> 
              <p className="meta">{formatViews(v.views)} views • {timeSince(v.posted)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
