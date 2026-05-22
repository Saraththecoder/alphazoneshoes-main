import React, { useEffect, useState, useRef } from 'react';
import { PiClock } from 'react-icons/pi';
import ProductCard from './ProductCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);
  const containerRef = useRef(null);
  const { hasIntersected } = useIntersectionObserver(containerRef);

  useEffect(() => {
    if (!hasIntersected) return;
    const fetchRecent = async () => {
      try {
        const ids = JSON.parse(localStorage.getItem('alphaRecent')) || [];
        if (ids.length < 2) return;
        
        const { getAllProducts } = await import('../api/products');
        const res = await getAllProducts();
        
        const recentProducts = ids.map(id => res.data.find(p => p.id === parseInt(id))).filter(Boolean);
        setProducts(recentProducts);
      } catch (e) {
        console.error(e);
      }
    };
    fetchRecent();
  }, [hasIntersected]);

  if (hasIntersected && products.length < 2) return null;

  return (
    <div ref={containerRef} style={{ marginTop: '64px', marginBottom: '64px' }}>
      <h2 className="display-text" style={{ fontSize: '28px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <PiClock className="text-accent" /> Recently Viewed
      </h2>
      
      {hasIntersected ? (
        <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none' }}>
          {products.map((product, idx) => (
            <div key={product.id} style={{ minWidth: '240px', width: '240px' }}>
              <ProductCard product={product} index={idx} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ height: '300px' }}></div>
      )}
    </div>
  );
};

export default RecentlyViewed;
