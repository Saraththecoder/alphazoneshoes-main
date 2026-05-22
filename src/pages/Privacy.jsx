import React from 'react';
import { useSEO } from '../hooks/useSEO';

const Privacy = () => {
  useSEO({ title: "Privacy Policy - TheAlphaZone" });
  return (
    <div className="page-enter" style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8, color: 'var(--text-muted)' }}>
      <h1 className="display-text mb-4 text-primary" style={{ color: 'var(--text-primary)' }}>Privacy Policy</h1>
      <p>Your privacy is important to us. We only collect the necessary information to process your orders and improve your shopping experience. We never sell your personal data to third parties.</p>
    </div>
  );
};
export default Privacy;
