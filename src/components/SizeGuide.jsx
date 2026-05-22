import React, { useState } from 'react';
import { PiX } from 'react-icons/pi';

const SizeGuide = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState('Footwear');
  
  if (!isOpen) return null;

  return (
    <div className="size-guide-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }} onClick={onClose}>
      <div className="size-guide-modal" style={{ background: 'var(--bg-surface)', padding: '32px', borderRadius: 'var(--radius-lg)', maxWidth: '500px', width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><PiX size={24} /></button>
        
        <h2 className="detail-title" style={{ fontSize: '24px', marginBottom: '24px' }}>Size Guide</h2>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border)' }}>
          <button style={{ background: 'none', border: 'none', padding: '8px 0', color: tab === 'Footwear' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: tab === 'Footwear' ? '2px solid var(--accent)' : 'none', cursor: 'pointer', fontWeight: 600 }} onClick={() => setTab('Footwear')}>Footwear</button>
          <button style={{ background: 'none', border: 'none', padding: '8px 0', color: tab === 'Clothing' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: tab === 'Clothing' ? '2px solid var(--accent)' : 'none', cursor: 'pointer', fontWeight: 600 }} onClick={() => setTab('Clothing')}>Clothing</button>
        </div>

        {tab === 'Footwear' ? (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginBottom: '24px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '8px 4px' }}>UK Size</th>
                <th style={{ padding: '8px 4px' }}>US Size</th>
                <th style={{ padding: '8px 4px' }}>EU Size</th>
                <th style={{ padding: '8px 4px' }}>Length (cm)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { uk: '6', us: '7', eu: '39', len: '24.5' },
                { uk: '7', us: '8', eu: '40', len: '25.4' },
                { uk: '8', us: '9', eu: '41', len: '26.2' },
                { uk: '9', us: '10', eu: '42', len: '27.1' },
                { uk: '10', us: '11', eu: '43', len: '27.9' },
                { uk: '11', us: '12', eu: '44', len: '28.8' },
              ].map(row => (
                <tr key={row.uk} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '8px 4px' }}>{row.uk}</td>
                  <td style={{ padding: '8px 4px' }}>{row.us}</td>
                  <td style={{ padding: '8px 4px' }}>{row.eu}</td>
                  <td style={{ padding: '8px 4px' }}>{row.len}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginBottom: '24px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '8px 4px' }}>Size</th>
                <th style={{ padding: '8px 4px' }}>Chest (in)</th>
                <th style={{ padding: '8px 4px' }}>Waist (in)</th>
                <th style={{ padding: '8px 4px' }}>Hip (in)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { s: 'S', c: '36', w: '30', h: '38' },
                { s: 'M', c: '38', w: '32', h: '40' },
                { s: 'L', c: '40', w: '34', h: '42' },
                { s: 'XL', c: '42', w: '36', h: '44' },
                { s: 'XXL', c: '44', w: '38', h: '46' },
              ].map(row => (
                <tr key={row.s} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '8px 4px' }}>{row.s}</td>
                  <td style={{ padding: '8px 4px' }}>{row.c}</td>
                  <td style={{ padding: '8px 4px' }}>{row.w}</td>
                  <td style={{ padding: '8px 4px' }}>{row.h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <p className="text-muted text-sm mb-4">Measurements are approximate. When in doubt, size up.</p>
        
        <details style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600 }}>How to Measure</summary>
          <p className="text-muted text-sm mt-2">Place your foot on a piece of paper and mark the tip of your longest toe and the back of your heel. Measure the distance between the two marks.</p>
        </details>
      </div>
    </div>
  );
};

export default SizeGuide;
