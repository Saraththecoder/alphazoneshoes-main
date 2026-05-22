import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const Returns = () => {
  useSEO({ title: "Returns & Refunds - TheAlphaZone" });
  return (
    <div className="page-enter" style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
      <h1 className="display-text mb-4">Returns & Refunds</h1>
      <p className="text-muted">We offer a hassle-free 7-day return policy. If you are not completely satisfied with your purchase, you can return it within 7 days of delivery.</p>
      
      <h3 className="mt-4 mb-2">How to Return</h3>
      <ol className="text-muted" style={{ paddingLeft: '24px' }}>
        <li>Go to <Link to="/orders" className="text-accent">My Orders</Link>.</li>
        <li>Select the order and click on "Initiate Return".</li>
        <li>Pack the items securely in their original packaging with all tags attached.</li>
        <li>Our delivery partner will pick up the package within 2-3 business days.</li>
      </ol>
    </div>
  );
};
export default Returns;
