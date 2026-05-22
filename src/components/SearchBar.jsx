import React, { useState, useRef, useEffect } from 'react';
import { PiMagnifyingGlass, PiX } from 'react-icons/pi';
import { useDebounce } from '../hooks/useDebounce';
import SearchResults from './SearchResults';
import './Search.css';

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }
    const search = async () => {
      setLoading(true);
      try {
        const { getAllProducts } = await import('../api/products');
        const res = await getAllProducts();
        const matches = res.data.filter(p => 
          p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || 
          p.category.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setResults(matches);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    search();
  }, [debouncedQuery]);

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-container" ref={searchRef}>
        <div className="search-input-wrapper">
          <PiMagnifyingGlass size={24} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search sandals, t-shirts..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button onClick={onClose} aria-label="Close search"><PiX size={24} /></button>
        </div>
        <SearchResults query={query} results={results} loading={loading} onClose={onClose} setQuery={setQuery} />
      </div>
    </div>
  );
};

export default SearchBar;
