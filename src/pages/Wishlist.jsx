import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PiHeart } from 'react-icons/pi';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { useSEO } from '../hooks/useSEO';

const Wishlist = () => {
  useSEO({ title: "My Wishlist - TheAlphaZone" });
  const { items, clearWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleMoveToCart = (product) => {
    addToCart(product, product.sizes?.[0] || 'M');
    removeFromWishlist(product.id);
  };

  if (items.length === 0) {
    return (
      <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px 24px', textAlign: 'center', minHeight: '60vh' }}>
        <PiHeart size={64} className="text-muted mb-4" />
        <h2 className="display-text mb-4">Your wishlist is empty</h2>
        <Link to="/products" className="btn-primary">Explore Products</Link>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 className="display-text">My Wishlist ({items.length} items)</h1>
        <button onClick={clearWishlist} style={{ background: 'none', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: 'var(--radius-pill)', color: 'var(--text-primary)', cursor: 'pointer' }}>
          Clear All
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
        {items.map((product, idx) => (
          <div key={product.id}>
            <ProductCard product={product} index={idx} />
            <button 
              className="btn-secondary full-width mt-2" 
              onClick={() => handleMoveToCart(product)}
            >
              Move to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
