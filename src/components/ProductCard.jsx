import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiHeart } from 'react-icons/pi';
import { FaHeart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { showToast } from './Toast';

const ProductCard = ({ product, index }) => {
  const { addToCart } = useContext(CartContext);
  const { isWishlisted, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [email, setEmail] = useState('');
  
  const inStock = product.inStock !== false; // Default to true if not specified
  const delay = Math.min(index * 0.1, 0.5);
  const wishlisted = isWishlisted(product.id);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes?.[0] || 'M');
  };

  const handleNotify = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!email) return showToast('Please enter your email', 'error');
    showToast("We'll notify you when back in stock!", 'success');
    setEmail('');
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card" style={{ animationDelay: `${delay}s`, position: 'relative' }}>
      <div className="product-image-container" style={{ position: 'relative' }}>
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'} />
        
        {!inStock && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1 }}></div>
        )}

        <div className="product-badges" style={{ zIndex: 2 }}>
          {!inStock ? (
            <span className="badge" style={{ background: '#4B5563', color: '#fff' }}>OUT OF STOCK</span>
          ) : (
            <>
              {product.isNew && <span className="badge badge-new">New</span>}
              {product.badge && <span className="badge badge-sale">{product.badge}</span>}
            </>
          )}
        </div>

        <button 
          onClick={handleToggleWishlist} 
          style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2, color: wishlisted ? 'var(--accent)' : '#fff' }}
        >
          {wishlisted ? <FaHeart size={20} /> : <PiHeart size={20} />}
        </button>

        <div className="quick-add" style={{ zIndex: 3 }}>
          {inStock ? (
            <button className="btn-quick-add" onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <div style={{ padding: '8px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }} onClick={e => e.stopPropagation()}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email..." style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', background: '#222', color: '#fff', fontSize: '12px' }} />
              <button className="btn-secondary" onClick={handleNotify} style={{ padding: '6px', fontSize: '12px' }}>
                Notify Me
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-price-row">
          <span className="product-price">₹{product.price}</span>
          {product.originalPrice && (
            <span className="product-original-price">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
