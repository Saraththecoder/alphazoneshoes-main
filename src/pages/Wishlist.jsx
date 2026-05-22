import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PiHeartBreak } from 'react-icons/pi';
import { WishlistContext } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return (
      <div className="cart-page page-enter empty" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <PiHeartBreak size={64} className="text-muted mb-4" />
        <h2 className="display-text">Your wishlist is empty</h2>
        <p className="text-muted">Save your favorite items here to buy them later.</p>
        <Link to="/products" className="btn-primary mt-4">Discover Styles</Link>
      </div>
    );
  }

  return (
    <div className="products-page page-enter">
      <div className="products-header">
        <h1 className="display-text">Your Wishlist</h1>
        <p className="text-muted">({wishlist.length} items saved)</p>
      </div>
      
      <Reveal className="products-grid-masonry">
        {wishlist.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </Reveal>
    </div>
  );
};

export default Wishlist;
