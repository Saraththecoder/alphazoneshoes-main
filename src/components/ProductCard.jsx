import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiHeart } from 'react-icons/pi';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { showToast } from './Toast';
import './ProductCard.css';

const ProductCard = ({ product, index }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const isWishlisted = isInWishlist(product.id);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0]);
    setAdded(true);
    showToast(`Added ${product.name} to cart`, 'success');
    setTimeout(() => setAdded(false), 2000);
  };

  const delay = index * 0.05;

  return (
    <Link to={`/products/${product.id}`} className="product-card" style={{ animationDelay: `${delay}s` }}>
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <div className="product-badges">
          {product.isNew && <span className="badge badge-new">New</span>}
          {product.badge && <span className="badge badge-sale">{product.badge}</span>}
        </div>
        <button 
          className="wishlist-btn-overlay" 
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          aria-label="Toggle Wishlist"
        >
          <PiHeart size={24} weight={isWishlisted ? "fill" : "regular"} className={isWishlisted ? "text-accent" : ""} />
        </button>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        
        <div className="price-row">
          <span className="sale-price">₹{product.price}</span>
          {product.originalPrice && (
            <span className="original-price">₹{product.originalPrice}</span>
          )}
        </div>
        
        <button 
          className={`add-cart-btn ${added ? 'added' : ''}`} 
          onClick={handleAdd}
        >
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
