import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSEO } from '../hooks/useSEO';

const Login = () => {
  useSEO({ title: "Login - TheAlphaZone", description: "Login to your AlphaZone account" });
  const { login, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const from = location.state?.from || '/';

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (email.includes('@') && password.length >= 6) {
      login({ name: email.split('@')[0], email, phone: '', avatar: null });
      navigate(from, { replace: true });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="page-enter responsive-flex" style={{ minHeight: '80vh', gap: 0 }}>
      <div className="responsive-flex-item hide-mobile" style={{ background: 'var(--accent)', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#fff' }}>
        <h1 className="display-text" style={{ fontSize: '48px', marginBottom: '16px' }}>TheAlphaZone</h1>
        <p style={{ fontSize: '20px', opacity: 0.9 }}>Wear Bold. Live Alpha.</p>
      </div>
      
      <div className="responsive-flex-item" style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <h2 className="display-text mb-4">Welcome Back</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }} />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }} />
            </div>
            
            {error && <div style={{ color: 'var(--accent)', fontSize: '14px', marginBottom: '16px' }}>{error}</div>}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Forgot Password?</a>
            </div>
            
            <button type="submit" className="btn-primary full-width mb-4">Login</button>
            
            <p className="text-center text-muted">
              Don't have an account? <Link to="/signup" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
