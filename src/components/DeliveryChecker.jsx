import React, { useState, useEffect } from 'react';
import { PiMapPin } from 'react-icons/pi';

const DeliveryChecker = () => {
  const [pincode, setPincode] = useState('');
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('alphaPincode');
    if (saved) {
      setPincode(saved);
    }
  }, []);

  const handleCheck = () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setStatus('error');
      setMessage('Please enter a valid 6-digit pincode');
      return;
    }

    setStatus('loading');
    sessionStorage.setItem('alphaPincode', pincode);

    // Simulate API check
    setTimeout(() => {
      const pinNum = parseInt(pincode);
      if (pinNum >= 110000 && pinNum <= 999999) {
        setStatus('success');
        const date = new Date();
        date.setDate(date.getDate() + 3);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        setMessage(`Delivery available by ${date.toLocaleDateString('en-IN', options)}`);
      } else {
        setStatus('error');
        setMessage('Delivery not available to this pincode');
      }
    }, 800);
  };

  return (
    <div className="delivery-checker" style={{ marginTop: '24px', padding: '24px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <PiMapPin size={20} className="text-accent" />
        <h4 style={{ margin: 0 }}>Check Delivery Details</h4>
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <input 
          type="text" 
          maxLength="6"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
          style={{ flex: 1, padding: '12px 16px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
        />
        <button className="btn-secondary" onClick={handleCheck} disabled={status === 'loading'} style={{ minWidth: '100px' }}>
          {status === 'loading' ? 'Checking...' : 'Check'}
        </button>
      </div>
      
      {status === 'success' && (
        <div style={{ marginTop: '12px' }}>
          <p style={{ color: 'var(--success)', margin: '0 0 4px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>✅ {message}</p>
          <p style={{ color: '#60A5FA', margin: 0, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>🚚 Express delivery available (+₹49)</p>
        </div>
      )}
      
      {status === 'error' && (
        <p style={{ color: 'var(--accent)', marginTop: '12px', marginBottom: 0, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>❌ {message}</p>
      )}
    </div>
  );
};

export default DeliveryChecker;
