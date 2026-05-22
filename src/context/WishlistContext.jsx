import React, { createContext, useState, useEffect } from 'react';
import { showToast } from '../components/Toast';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const localData = localStorage.getItem('alphaWishlist');
      const parsed = localData ? JSON.parse(localData) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('alphaWishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product) => {
    setItems((prev) => {
      if (prev.some(item => item.id === product.id)) return prev;
      showToast('Added to Wishlist ♥', 'success');
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setItems((prev) => {
      showToast('Removed from wishlist');
      return prev.filter(item => item.id !== id);
    });
  };

  const isWishlisted = (id) => {
    return Array.isArray(items) && items.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
    showToast('Wishlist cleared');
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isWishlisted, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
