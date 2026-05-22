import React, { useState } from 'react';
import { PiCheckCircle, PiXCircle, PiX } from 'react-icons/pi';

const CouponInput = ({ cartTotal, onApply, appliedCoupon, onRemove }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    if (!code) return;
    const c = code.toUpperCase();
    if (c === 'ALPHA10') {
      setError('');
      onApply({ code: c, discount: Math.floor(cartTotal * 0.10) });
    } else if (c === 'FIRST50') {
      setError('');
      onApply({ code: c, discount: 50 });
    } else if (c === 'FREESHIP') {
      setError('');
      onApply({ code: c, discount: 'FREE_SHIPPING' });
    } else {
      setError('Invalid or expired code');
    }
  };

  if (appliedCoupon) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid var(--success)', borderRadius: 'var(--radius-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)' }}>
          <PiCheckCircle size={20} />
          <span style={{ fontWeight: 600 }}>{appliedCoupon.code} applied!</span>
        </div>
        <button onClick={onRemove} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><PiX size={18} /></button>
      </div>
    );
  }

  return (
    <div className="coupon-section">
      <div style={{ display: 'flex', gap: '8px' }}>
        <input 
          type="text" 
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(''); }}
          placeholder="Enter coupon code" 
          style={{ flex: 1, padding: '12px 16px', background: 'var(--bg-elevated)', border: `1px solid ${error ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', color: '#fff' }}
        />
        <button onClick={handleApply} style={{ padding: '0 24px', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 600 }}>
          Apply
        </button>
      </div>
      {error && <div style={{ color: 'var(--accent)', fontSize: '14px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}><PiXCircle /> {error}</div>}
    </div>
  );
};

export default CouponInput;
