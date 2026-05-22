import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { PiWhatsappLogo, PiEnvelopeSimple, PiMapPin } from 'react-icons/pi';

const Contact = () => {
  useSEO({ title: "Contact Us - TheAlphaZone" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page-enter" style={{ padding: '48px 24px', maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h1 className="display-text mb-4">Get in Touch</h1>
        <p className="text-muted mb-4">We're here to help and answer any question you might have. We look forward to hearing from you.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '32px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--bg-surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}><PiWhatsappLogo size={24} className="text-accent" /></div>
            <div><h4 style={{ margin: '0 0 4px 0' }}>WhatsApp</h4><p className="text-muted m-0">+91 99999 99999</p></div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--bg-surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}><PiEnvelopeSimple size={24} className="text-accent" /></div>
            <div><h4 style={{ margin: '0 0 4px 0' }}>Email</h4><p className="text-muted m-0">support@thealphazone.in</p></div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--bg-surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}><PiMapPin size={24} className="text-accent" /></div>
            <div><h4 style={{ margin: '0 0 4px 0' }}>Headquarters</h4><p className="text-muted m-0">Mumbai, Maharashtra, India</p></div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: '300px', background: 'var(--bg-surface)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <PiEnvelopeSimple size={48} className="text-accent mb-4" />
            <h3 className="mb-2">Message Sent!</h3>
            <p className="text-muted">We will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <input type="text" placeholder="Your Name" required style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <input type="email" placeholder="Your Email" required style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <input type="text" placeholder="Subject" required style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <textarea placeholder="Your Message" required style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff', minHeight: '120px', resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" className="btn-primary full-width">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
