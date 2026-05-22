import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PiHandbag, PiTrash, PiMinus, PiPlus } from 'react-icons/pi';
import { CartContext } from '../context/CartContext';
import Reveal from '../components/Reveal';
import './Cart.css';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useContext(CartContext);
  
  const subtotal = getTotalPrice();
  const delivery = subtotal > 499 ? 0 : 49;
  const total = items.length > 0 ? subtotal + delivery : 0;

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
                  <button onClick={() => updateQuantity(item.id, item.size, -1)}><PiMinus /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.size, 1)}><PiPlus /></button>
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
            
            <hr className="divider" />
            
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
