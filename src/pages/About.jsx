import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { PiCheckCircleFill, PiRocketLaunchFill, PiHeartFill } from 'react-icons/pi';

const About = () => {
  useSEO({ title: "About Us - TheAlphaZone" });

  return (
    <div className="page-enter" style={{ padding: '48px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="display-text mb-4 text-center">Born in India, Built for Confidence</h1>
      <p className="text-muted mb-4 text-center" style={{ fontSize: '18px', lineHeight: 1.6 }}>
        TheAlphaZone is more than a brand. It's a lifestyle. Our mission is to provide you with the highest quality fashion that empowers you to step out with confidence every single day.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '48px', marginBottom: '48px' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border)' }}>
          <PiCheckCircleFill size={40} className="text-accent mb-2" />
          <h3>Premium Quality</h3>
          <p className="text-muted text-sm">We source only the finest materials.</p>
        </div>
        <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border)' }}>
          <PiHeartFill size={40} className="text-accent mb-2" />
          <h3>Affordability</h3>
          <p className="text-muted text-sm">Luxury doesn't have to break the bank.</p>
        </div>
        <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border)' }}>
          <PiRocketLaunchFill size={40} className="text-accent mb-2" />
          <h3>Fast Delivery</h3>
          <p className="text-muted text-sm">Lightning fast shipping across India.</p>
        </div>
      </div>

      <div style={{ background: 'var(--accent)', padding: '32px', borderRadius: 'var(--radius-lg)', color: '#fff', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '16px', textAlign: 'center' }}>
        <div><h2 style={{ margin: 0, fontSize: '32px' }}>5000+</h2><p style={{ margin: 0, opacity: 0.9 }}>Orders</p></div>
        <div><h2 style={{ margin: 0, fontSize: '32px' }}>4.8★</h2><p style={{ margin: 0, opacity: 0.9 }}>Rating</p></div>
        <div><h2 style={{ margin: 0, fontSize: '32px' }}>100+</h2><p style={{ margin: 0, opacity: 0.9 }}>Products</p></div>
      </div>
    </div>
  );
};

export default About;
