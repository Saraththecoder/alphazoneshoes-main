import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSEO } from '../hooks/useSEO';

const Signup = () => {
  useSEO({ title: "Sign Up - TheAlphaZone", description: "Create your AlphaZone account" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length > 6) score++;
    if (pass.length > 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    if (score < 2) return { text: 'Weak', color: '#EF4444', width: '33%' };
    if (score < 4) return { text: 'Medium', color: '#F59E0B', width: '66%' };
    return { text: 'Strong', color: '#10B981', width: '100%' };
  };

  const strength = calculateStrength(formData.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      setError('Passwords do not match');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError('Please enter a valid 10-digit Indian phone number');
      return;
    }
    login({ name: formData.name, email: formData.email, phone: formData.phone, avatar: null });
    navigate('/', { replace: true });
  };

  return (
    <div className="page-enter responsive-flex" style={{ minHeight: '80vh', gap: 0 }}>
      <div className="responsive-flex-item hide-mobile" style={{ background: 'var(--accent)', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#fff' }}>
        <h1 className="display-text" style={{ fontSize: '48px', marginBottom: '16px' }}>TheAlphaZone</h1>
        <p style={{ fontSize: '20px', opacity: 0.9 }}>Join the Alpha community.</p>
      </div>
      
      <div className="responsive-flex-item" style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <h2 className="display-text mb-4">Create Account</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Full Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }} required />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }} required />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Phone Number</label>
              <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }} required />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Password</label>
              <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }} required />
              {formData.password && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ height: '4px', background: 'var(--bg-elevated)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: strength.width, background: strength.color, transition: 'all 0.3s' }}></div>
                  </div>
                  <span style={{ fontSize: '12px', color: strength.color }}>{strength.text}</span>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Confirm Password</label>
              <input type="password" value={formData.confirm} onChange={e => setFormData({...formData, confirm: e.target.value})} style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }} required />
            </div>
            
            {error && <div style={{ color: 'var(--accent)', fontSize: '14px', marginBottom: '16px' }}>{error}</div>}
            
            <div style={{ marginBottom: '24px', fontSize: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                <input type="checkbox" required /> I agree to <Link to="/terms" style={{ color: 'var(--accent)' }}>Terms & Conditions</Link>
              </label>
            </div>
            
            <button type="submit" className="btn-primary full-width mb-4">Sign Up</button>
            
            <p className="text-center text-muted">
              Already have an account? <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
