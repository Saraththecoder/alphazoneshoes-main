import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useSEO } from '../hooks/useSEO';

const Profile = () => {
  useSEO({ title: "My Profile - TheAlphaZone" });
  const { user, updateProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: user?.name || '', phone: user?.phone || '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <div className="page-enter" style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="display-text mb-4">My Profile</h1>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold' }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 style={{ margin: '0 0 4px 0' }}>{user?.name}</h2>
            <p className="text-muted m-0">{user?.email}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Phone Number</label>
            <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }} />
          </div>
          
          <button type="submit" className="btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
