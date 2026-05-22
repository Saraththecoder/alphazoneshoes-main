import React from 'react';
import { useSEO } from '../hooks/useSEO';

const Terms = () => {
  useSEO({ title: "Terms of Service - TheAlphaZone" });
  return (
    <div className="page-enter" style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8, color: 'var(--text-muted)' }}>
      <h1 className="display-text mb-4" style={{ color: 'var(--text-primary)' }}>Terms of Service</h1>
      <p>By accessing or using TheAlphaZone, you agree to be bound by these Terms. All content is the property of TheAlphaZone. We reserve the right to refuse service to anyone at any time.</p>
    </div>
  );
};
export default Terms;
