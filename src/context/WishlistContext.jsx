import React, { createContext, useState, useEffect } from 'react';
import { showToast } from '../components/Toast';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const localData = localStorage.getItem('alphaWishlist');
      const parsed = localData ? JSON.parse(localData) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('alphaWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast('Added to wishlist', 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return Array.isArray(wishlist) && wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
