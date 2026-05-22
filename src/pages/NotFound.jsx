import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page page-enter">
      <h1 className="not-found-code">404</h1>
      <h2 className="display-text">Lost in the Zone?</h2>
      <p className="text-muted">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary mt-4">Return Home</Link>
    </div>
  );
};

export default NotFound;
