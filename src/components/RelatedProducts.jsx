import React, { useEffect, useState, useRef } from 'react';
import ProductCard from './ProductCard';
import { getProductsByCategory } from '../api/products';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const RelatedProducts = ({ currentCategory, currentId }) => {
  const [products, setProducts] = useState([]);
  const containerRef = useRef(null);
  const { hasIntersected } = useIntersectionObserver(containerRef);

  useEffect(() => {
    if (!hasIntersected) return;
    const fetchRelated = async () => {
      const res = await getProductsByCategory(currentCategory || 'All');
      if (res.data) {
        const filtered = res.data.filter(p => p.id !== parseInt(currentId)).slice(0, 4);
        setProducts(filtered);
      }
    };
    fetchRelated();
  }, [currentCategory, currentId, hasIntersected]);

  return (
    <div ref={containerRef} style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid var(--border)' }}>
      <h2 className="display-text" style={{ fontSize: '32px', marginBottom: '32px' }}>You Might Also Like</h2>
      
      {hasIntersected ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      ) : (
        <div style={{ height: '300px' }}></div>
      )}
    </div>
  );
};

export default RelatedProducts;
