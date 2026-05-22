import React from 'react';
import { useParams } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const OrderDetail = () => {
  const { id } = useParams();
  useSEO({ title: `Order #${id} - TheAlphaZone` });

  return (
    <div className="page-enter" style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="display-text mb-4">Order Details</h1>
      <p className="text-muted mb-4">Order #{id}</p>
      
      <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '12px', left: '10%', right: '10%', height: '2px', background: 'var(--border)', zIndex: 0 }}></div>
          <div style={{ position: 'absolute', top: '12px', left: '10%', width: '30%', height: '2px', background: 'var(--accent)', zIndex: 1 }}></div>
          
          {['Placed', 'Processing', 'Shipped', 'Delivered'].map((step, idx) => (
            <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, position: 'relative' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: idx <= 1 ? 'var(--accent)' : 'var(--bg-main)', border: `2px solid ${idx <= 1 ? 'var(--accent)' : 'var(--border)'}`, marginBottom: '8px' }}></div>
              <span style={{ fontSize: '12px', color: idx <= 1 ? '#fff' : 'var(--text-muted)' }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="responsive-flex">
        <div className="responsive-flex-item-large">
          <h3 style={{ marginBottom: '16px' }}>Items</h3>
          <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', gap: '16px' }}>
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" alt="Item" style={{ width: '80px', height: '80px', borderRadius: '4px', objectFit: 'cover' }} />
            <div>
              <h4 style={{ margin: '0 0 4px 0' }}>Alpha Signature Crimson Sneakers</h4>
              <p className="text-muted text-sm m-0">Size: 9 | Qty: 1</p>
              <p style={{ margin: '8px 0 0 0', fontWeight: 600 }}>₹2499</p>
            </div>
          </div>
        </div>
        
        <div className="responsive-flex-item" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '16px' }}>Delivery Address</h3>
            <p className="text-muted text-sm m-0" style={{ lineHeight: 1.6 }}>
              <strong>John Doe</strong><br/>
              123 Alpha Street, Apt 4B<br/>
              Mumbai, Maharashtra 400001<br/>
              Phone: +91 9999999999
            </p>
          </div>
          
          <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '16px' }}>Payment Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span className="text-muted">Subtotal</span><span>₹2499</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span className="text-muted">Delivery</span><span className="text-success">FREE</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)', fontWeight: 'bold' }}><span>Total</span><span>₹2499</span></div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="btn-secondary">Need Help?</a>
      </div>
    </div>
  );
};

export default OrderDetail;
