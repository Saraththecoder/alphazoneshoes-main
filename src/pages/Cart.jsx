import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiTrash, PiMinus, PiPlus, PiShieldCheck, PiTruck, PiLockKey } from 'react-icons/pi';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { useSEO } from '../hooks/useSEO';
import CouponInput from '../components/CouponInput';

const Cart = () => {
  useSEO({ title: "Your Cart - TheAlphaZone" });
  const { items, removeFromCart, updateQuantity } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const [coupon, setCoupon] = useState(null);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  let discount = 0;
  let delivery = subtotal > 4999 ? 0 : 150;
  
  if (coupon) {
    if (coupon.discount === 'FREE_SHIPPING') delivery = 0;
    else discount = coupon.discount;
  }
  
  const gst = Math.round((subtotal - discount) * 0.18);
  const total = subtotal - discount + delivery + gst;

  const handleSaveForLater = (item) => {
    addToWishlist(item);
    removeFromCart(item.cartItemId);
  };

  if (items.length === 0) {
    return (
      <div className="page-enter" style={{ padding: '64px 24px', textAlign: 'center', maxWidth: '600px', margin: '0 auto', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 className="display-text mb-4">Your Cart is Empty</h1>
        <p className="text-muted mb-4">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className="display-text mb-4">Shopping Cart ({items.length})</h1>
      
      <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 600px' }}>
          {items.map(item => (
            <div key={item.cartItemId} style={{ display: 'flex', gap: '24px', padding: '24px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{item.name}</h3>
                    <p className="text-muted m-0 text-sm">Size: {item.size}</p>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '18px' }}>₹{item.price * item.quantity}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-pill)', padding: '4px' }}>
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '4px 8px' }}><PiMinus /></button>
                    <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '4px 8px' }}><PiPlus /></button>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button onClick={() => handleSaveForLater(item)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}>Save for Later</button>
                    <button onClick={() => removeFromCart(item.cartItemId)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><PiTrash size={20} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '32px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}><PiShieldCheck size={24} className="text-accent"/> 100% Secure Checkout</div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}><PiTruck size={24} className="text-accent"/> Fast Delivery</div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}><PiLockKey size={24} className="text-accent"/> Data Privacy</div>
          </div>
        </div>

        <div style={{ flex: '1 1 350px', background: 'var(--bg-surface)', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', position: 'sticky', top: '100px' }}>
          <h2 className="display-text mb-4" style={{ fontSize: '24px' }}>Order Summary</h2>
          
          <CouponInput cartTotal={subtotal} appliedCoupon={coupon} onApply={setCoupon} onRemove={() => setCoupon(null)} />
          
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}><span>Subtotal</span><span>₹{subtotal}</span></div>
            {discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}><span>Discount</span><span>-₹{discount}</span></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Delivery</span>
              <span style={{ color: delivery === 0 ? 'var(--success)' : 'inherit' }}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}><span>GST (18%)</span><span>₹{gst}</span></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '8px', fontSize: '20px', fontWeight: 'bold' }}>
              <span>Total</span><span>₹{total}</span>
            </div>
          </div>
          
          <button className="btn-primary full-width mt-4" style={{ padding: '16px', fontSize: '16px' }}>Proceed to Checkout</button>
          
          {subtotal <= 4999 && (
            <p className="text-center text-muted text-sm mt-4">Add ₹{5000 - subtotal} more to get free delivery!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
