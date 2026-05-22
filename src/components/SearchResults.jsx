import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiClock, PiX, PiSpinnerGap } from 'react-icons/pi';

const POPULAR = ["Sandals", "White T-Shirt", "Night Pants"];

const SearchResults = ({ query, results, loading, onClose, setQuery }) => {
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('alphaRecentSearches')) || [];
    } catch {
      return [];
    }
  });

  const removeRecent = (term, e) => {
    e.stopPropagation();
    const updated = recent.filter(t => t !== term);
    setRecent(updated);
    localStorage.setItem('alphaRecentSearches', JSON.stringify(updated));
  };

  const saveSearch = (term) => {
    if (!term) return;
    const updated = [term, ...recent.filter(t => t !== term)].slice(0, 5);
    localStorage.setItem('alphaRecentSearches', JSON.stringify(updated));
  };

  if (loading) {
    return <div className="search-results center"><PiSpinnerGap className="spinner" size={32} /></div>;
  }

  if (!query) {
    return (
      <div className="search-results">
        {recent.length > 0 && (
          <div className="search-group">
            <h4>Recent Searches</h4>
            {recent.map(term => (
              <div key={term} className="search-item" onClick={() => setQuery(term)}>
                <PiClock className="text-muted" />
                <span>{term}</span>
                <button onClick={(e) => removeRecent(term, e)}><PiX /></button>
              </div>
            ))}
          </div>
        )}
        <div className="search-group">
          <h4>Popular Searches</h4>
          <div className="popular-tags">
            {POPULAR.map(term => (
              <button key={term} className="badge outline" onClick={() => setQuery(term)}>{term}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="search-results center empty">
        <p>No results for "{query}"</p>
        <p className="text-muted text-sm mt-2">Try: sandals, t-shirts...</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      {results.map(product => (
        <Link 
          to={`/products/${product.id}`} 
          key={product.id} 
          className="search-result-card"
          onClick={() => { saveSearch(query); onClose(); }}
        >
          <img src={product.image} alt={product.name} loading="lazy" />
          <div className="search-result-info">
            <h5>{product.name}</h5>
            <span className="text-muted text-sm">{product.category}</span>
          </div>
          <div className="search-result-price">₹{product.price}</div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
