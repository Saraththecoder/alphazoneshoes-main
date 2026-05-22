import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiHandbag, PiTrash, PiMinus, PiPlus, PiTag } from 'react-icons/pi';
import { CartContext } from '../context/CartContext';
import { showToast } from '../components/Toast';
import Reveal from '../components/Reveal';
import './Cart.css';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useContext(CartContext);
  
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = getTotalPrice();
  const delivery = subtotal > 499 ? 0 : 49;
  const total = items.length > 0 ? subtotal + delivery - discount : 0;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'ALPHA20') {
      setDiscount(Math.floor(subtotal * 0.20));
      showToast('Coupon applied successfully', 'success');
    } else {
      setDiscount(0);
      showToast('Invalid coupon', 'error');
    }
  };

  const handleUpdateQty = (id, size, change, currentQty) => {
    if (currentQty + change > 5) {
      showToast('Max stock reached (5)', 'error');
    }
    updateQuantity(id, size, change);
  };

  if (items.length === 0) {
    return (
      <div className="cart-page page-enter empty">
        <PiHandbag size={64} className="text-muted mb-4" />
        <h2 className="display-text">Your cart is empty</h2>
        <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn-primary mt-4">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page page-enter">
      <h1 className="display-text mb-4">Your Cart</h1>
      
      <div className="cart-layout">
        <Reveal className="cart-items-column">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="cart-item">
              <div className="item-image-wrapper">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-meta">{item.category} | Size: {item.size}</p>
                <div className="item-price">₹{item.price}</div>
              </div>
              
              <div className="item-actions">
                <div className="quantity-stepper">
                  <button onClick={() => handleUpdateQty(item.id, item.size, -1, item.quantity)}><PiMinus /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQty(item.id, item.size, 1, item.quantity)}><PiPlus /></button>
                </div>
                
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item.id, item.size)}
                  aria-label="Remove item"
                >
                  <PiTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </Reveal>
        
        <Reveal className="cart-summary-column">
          <div className="summary-panel">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            
            <div className="summary-row">
              <span>Delivery</span>
              {delivery === 0 ? (
                <span className="text-success" style={{color: 'var(--success)'}}>FREE</span>
              ) : (
                <span>₹{delivery}</span>
              )}
            </div>

            {discount > 0 && (
              <div className="summary-row" style={{ color: 'var(--success)' }}>
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            
            <hr className="divider" />

            <div className="coupon-section" style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <PiTag style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code" 
                  style={{ width: '100%', padding: '12px 12px 12px 36px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>
              <button className="btn-secondary" onClick={handleApplyCoupon} style={{ padding: '0 16px' }}>Apply</button>
            </div>
            
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            
            <button className="btn-primary full-width mt-4">Proceed to Checkout</button>
            <div className="text-center mt-3">
              <Link to="/products" className="continue-link">Continue Shopping</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Cart;
