import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PiHeart, PiShareNetwork, PiCaretRight, PiRuler } from 'react-icons/pi';
import { FaHeart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { getProductById } from '../api/products';
import { showToast } from '../components/Toast';
import { useSEO } from '../hooks/useSEO';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import DeliveryChecker from '../components/DeliveryChecker';
import SizeGuide from '../components/SizeGuide';
import ReviewSection from '../components/ReviewSection';
import RelatedProducts from '../components/RelatedProducts';
import RecentlyViewed from '../components/RecentlyViewed';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  
  const { addToCart } = useContext(CartContext);
  const { isWishlisted, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const wishlisted = isWishlisted(parseInt(id));

  useRecentlyViewed(id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      setLoading(true);
      const res = await getProductById(id);
      if (res.data) {
        setProduct(res.data);
        if (res.data.sizes?.length > 0) setSelectedSize(res.data.sizes[0]);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  useSEO({
    title: product ? `${product.name} - TheAlphaZone` : 'Loading...',
    description: product?.description || 'Premium footwear by TheAlphaZone'
  });

  const handleToggleWishlist = () => {
    if (wishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleAddToCart = () => {
    if (product.inStock === false) return;
    addToCart(product, selectedSize);
    setIsAdded(true);
    showToast('Added to cart successfully!', 'success');
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading) return <div className="page-enter" style={{ padding: '48px 24px', textAlign: 'center' }}>Loading product details...</div>;
  if (!product) return <div className="page-enter" style={{ padding: '48px 24px', textAlign: 'center' }}>Product not found. <Link to="/products">Back to Shop</Link></div>;

  const inStock = product.inStock !== false;

  return (
    <div className="page-enter" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
        <Link to="/" style={{ color: 'inherit' }}>Home</Link>
        <PiCaretRight />
        <Link to="/products" style={{ color: 'inherit' }}>Shop</Link>
        <PiCaretRight />
        <span>{product.name}</span>
      </div>

      <div className="responsive-flex">
        <div className="responsive-flex-item">
          <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-surface)' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
            {!inStock && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="badge" style={{ background: '#4B5563', color: '#fff', fontSize: '18px', padding: '8px 16px' }}>OUT OF STOCK</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="responsive-flex-item">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h1 className="display-text" style={{ fontSize: '32px', marginBottom: '8px' }}>{product.name}</h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleToggleWishlist} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: wishlisted ? 'var(--accent)' : 'var(--text-primary)' }}>
                {wishlisted ? <FaHeart size={20} /> : <PiHeart size={20} />}
              </button>
              <button style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-primary)' }}>
                <PiShareNetwork size={20} />
              </button>
            </div>
          </div>
          
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{product.category}</p>
          
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '24px' }}>
            <span style={{ fontSize: '28px', fontWeight: 600 }}>₹{product.price}</span>
            {product.originalPrice && <span style={{ fontSize: '18px', textDecoration: 'line-through', color: 'var(--text-muted)' }}>₹{product.originalPrice}</span>}
          </div>

          <p style={{ lineHeight: 1.6, color: 'var(--text-primary)', marginBottom: '32px' }}>{product.description}</p>

          <DeliveryChecker />

          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontWeight: 600 }}>Select Size</span>
                <button onClick={() => setShowSizeGuide(true)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><PiRuler /> Size Guide</button>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', border: `1px solid ${selectedSize === size ? 'var(--accent)' : 'var(--border)'}`, background: selectedSize === size ? 'var(--accent)' : 'var(--bg-surface)', color: selectedSize === size ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {inStock ? (
            <button className={`btn-primary full-width ${isAdded ? 'added' : ''}`} onClick={handleAddToCart} style={{ padding: '16px', fontSize: '16px', background: isAdded ? 'var(--success)' : 'var(--accent)', transition: 'background 0.3s' }}>
              {isAdded ? 'Added to Cart ✓' : `Add to Cart - ₹${product.price}`}
            </button>
          ) : (
            <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <h3 style={{ marginBottom: '8px' }}>Out of Stock</h3>
              <p className="text-muted mb-4">Leave your email to be notified when this arrives.</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="email" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)} placeholder="Email Address" style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-elevated)', color: '#fff' }} />
                <button className="btn-secondary" onClick={() => setNotifyEmail('')}>Notify</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ReviewSection />
      <RelatedProducts currentCategory={product.category} currentId={product.id} />
      <RecentlyViewed />
      
      <SizeGuide isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </div>
  );
};

export default ProductDetail;
