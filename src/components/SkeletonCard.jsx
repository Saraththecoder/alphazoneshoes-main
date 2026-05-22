import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image shimmer"></div>
      <div className="skeleton-body">
        <div className="skeleton-line title shimmer"></div>
        <div className="skeleton-line category shimmer"></div>
        <div className="skeleton-price-row">
          <div className="skeleton-line price shimmer"></div>
        </div>
        <div className="skeleton-button shimmer"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
