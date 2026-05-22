import { useEffect, useState } from 'react';

export const useRecentlyViewed = (productId) => {
  const [recentIds, setRecentIds] = useState(() => {
    try {
      const stored = localStorage.getItem('alphaRecent');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!productId) return;
    
    setRecentIds(prev => {
      const filtered = prev.filter(id => id !== productId);
      const updated = [productId, ...filtered].slice(0, 8); // Max 8
      localStorage.setItem('alphaRecent', JSON.stringify(updated));
      return updated;
    });
  }, [productId]);

  return recentIds;
};
