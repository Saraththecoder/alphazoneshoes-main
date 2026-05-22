import React from 'react';
import './CategoryPill.css';

const CategoryPill = ({ name, isActive, onClick }) => {
  return (
    <button 
      className={`category-pill ${isActive ? 'active' : ''}`} 
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default CategoryPill;
