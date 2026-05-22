import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const Orders = () => {
  useSEO({ title: "My Orders - TheAlphaZone" });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: 'AZ-20260522-1045',
          date: 'May 22, 2026',
          status: 'Processing',
          total: 2499,
          items: [{ image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' }]
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return <div className="page-enter" style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto' }}>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="page-enter" style={{ padding: '64px 24px', textAlign: 'center' }}>
        <h2 className="display-text mb-4">No orders yet</h2>
        <Link to="/products" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Processing': return '#F59E0B';
      case 'Shipped': return '#3B82F6';
      case 'Delivered': return '#10B981';
      case 'Cancelled': return '#EF4444';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="page-enter" style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="display-text mb-4">My Orders</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {orders.map(order => (
          <div key={order.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', margin: '0 0 4px 0' }}>Order #{order.id}</h3>
                <p className="text-muted text-sm m-0">Placed on {order.date}</p>
              </div>
              <div style={{ background: `${getStatusColor(order.status)}20`, color: getStatusColor(order.status), padding: '4px 12px', borderRadius: 'var(--radius-pill)', fontSize: '14px', fontWeight: 600 }}>
                {order.status}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {order.items.map((item, i) => (
                  <img key={i} src={item.image} alt="product" style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                ))}
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: '0 0 8px 0', fontWeight: 600 }}>Total: ₹{order.total}</p>
                <Link to={`/orders/${order.id}`} className="btn-secondary" style={{ padding: '6px 16px', fontSize: '14px' }}>View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
