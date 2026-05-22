import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PiStar, PiCheck, PiMinus, PiPlus, PiHeart, PiRuler, PiUser } from 'react-icons/pi';
import { getProductById } from '../api/products';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { showToast } from '../components/Toast';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await getProductById(id);
      if (data) {
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize);
    }
    showToast(`Added ${quantity} ${product.name} to cart`, 'success');
  };

  if (loading) {
    return <div className="product-detail-page"><div className="loading-state">Loading product details...</div></div>;
  }

  if (!product) {
    return <div className="product-detail-page"><div className="error-state">Product not found</div></div>;
  }

  const images = [
    product.image,
    product.image + '&crop=entropy',
    product.image + '&crop=edges',
  ];

  return (
    <div className="product-detail-page page-enter">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <Link to="/products">Products</Link> &gt; <span>{product.category}</span> &gt; <span className="current">{product.name}</span>
      </div>

      <div className="detail-grid">
        <div className="detail-left">
          <div className="main-image-container">
            <img src={images[activeImage]} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnail-row">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`thumbnail ${activeImage === idx ? 'active' : ''}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="detail-right">
          <div className="category-badge">{product.category}</div>
          <h1 className="detail-title">{product.name}</h1>
          
          <div className="rating-row">
            <div className="stars">
              <PiStar weight="fill" className="filled" />
              <PiStar weight="fill" className="filled" />
              <PiStar weight="fill" className="filled" />
              <PiStar weight="fill" className="filled" />
              <PiStar weight="fill" className={product.rating >= 4.8 ? "filled" : ""} />
            </div>
            <span className="rating-count">({product.rating} / 5)</span>
          </div>
          
          <div className="detail-price-row">
            <span className="sale-price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>
          
          <hr className="divider" />
          
          <div className="size-selector-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="section-subtitle">Select Size</h3>
            <button className="size-guide-btn" onClick={() => setSizeGuideOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'underline', cursor: 'pointer' }}>
              <PiRuler /> Size Guide
            </button>
          </div>
          <div className="size-selector">
            <div className="size-pills">
              {product.sizes.map((size) => (
                <button 
                  key={size}
                  className={`size-pill ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="quantity-selector">
            <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}><PiMinus /></button>
            <span className="qty-number">{quantity}</span>
            <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}><PiPlus /></button>
          </div>
          
          <div className="action-row">
            <button className="btn-primary flex-1" onClick={handleAddToCart}>
              Add to Cart - ₹{product.price * quantity}
            </button>
            <button 
              className="btn-secondary" 
              style={{ minWidth: '56px', padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle Wishlist"
            >
              <PiHeart size={24} weight={isInWishlist(product.id) ? "fill" : "regular"} className={isInWishlist(product.id) ? "text-accent" : ""} />
            </button>
          </div>
          
          <hr className="divider" />
          
          <div className="product-description">
            <p>{product.description}</p>
          </div>
          
          <ul className="features-list">
            {product.features.map((feature, idx) => (
              <li key={idx}>
                <PiCheck className="feature-icon" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Mock Reviews Section */}
      <div className="reviews-section" style={{ marginTop: '64px', borderTop: '1px solid var(--border)', paddingTop: '40px' }}>
        <h2 className="detail-title" style={{ fontSize: '24px', marginBottom: '24px' }}>Customer Reviews</h2>
        <div className="reviews-list" style={{ display: 'grid', gap: '24px' }}>
          {[1, 2, 3].map((rev) => (
            <div key={rev} className="review-card" style={{ background: 'var(--bg-elevated)', padding: '24px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PiUser size={20} className="text-muted" />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontFamily: 'DM Sans', fontSize: '14px' }}>Verified Buyer {rev}</h4>
                  <div style={{ display: 'flex', color: 'var(--accent)' }}>
                    <PiStar weight="fill" size={12} /><PiStar weight="fill" size={12} /><PiStar weight="fill" size={12} /><PiStar weight="fill" size={12} /><PiStar weight="fill" size={12} />
                  </div>
                </div>
              </div>
              <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Absolutely love the quality and design of these. They fit perfectly and are incredibly comfortable for all-day wear. Highly recommended!
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Size Guide Modal Overlay */}
      {sizeGuideOpen && (
        <div className="size-guide-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }} onClick={() => setSizeGuideOpen(false)}>
          <div className="size-guide-modal" style={{ background: 'var(--bg-surface)', padding: '32px', borderRadius: 'var(--radius-lg)', maxWidth: '400px', width: '100%' }} onClick={e => e.stopPropagation()}>
            <h2 className="detail-title" style={{ fontSize: '24px', marginBottom: '16px' }}>How to Measure</h2>
            <p className="text-muted mb-4">Place your foot on a piece of paper and mark the tip of your longest toe and the back of your heel. Measure the distance between the two marks.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px', textAlign: 'center' }}>
              <div style={{ background: 'var(--bg-elevated)', padding: '8px', fontWeight: 'bold' }}>UK Size</div>
              <div style={{ background: 'var(--bg-elevated)', padding: '8px', fontWeight: 'bold' }}>Length (cm)</div>
              <div>6</div><div>24.6</div>
              <div>7</div><div>25.4</div>
              <div>8</div><div>26.2</div>
              <div>9</div><div>27.1</div>
              <div>10</div><div>27.9</div>
            </div>
            
            <button className="btn-primary full-width" onClick={() => setSizeGuideOpen(false)}>Got It</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
