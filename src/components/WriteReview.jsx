import React, { useState, useContext } from 'react';
import { PiX, PiImage } from 'react-icons/pi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { showToast } from './Toast';

const WriteReview = ({ isOpen, onClose }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  if (!isOpen) return null;

  if (!isLoggedIn) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onClose}>
        <div style={{ background: 'var(--bg-surface)', padding: '32px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
          <h3>Login Required</h3>
          <p className="text-muted mt-2 mb-4">You must be logged in to write a review.</p>
          <button className="btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return showToast('Please select a rating', 'error');
    if (body.length < 20) return showToast('Review must be at least 20 characters', 'error');
    
    showToast('Review submitted successfully!', 'success');
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }} onClick={onClose}>
      <div style={{ background: 'var(--bg-surface)', padding: '32px', borderRadius: 'var(--radius-lg)', maxWidth: '500px', width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><PiX size={24} /></button>
        
        <h2 className="detail-title mb-4" style={{ fontSize: '24px' }}>Write a Review</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Overall Rating</label>
            <div style={{ display: 'flex', gap: '8px', color: '#F59E0B', fontSize: '24px', cursor: 'pointer' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <div 
                  key={star} 
                  onMouseEnter={() => setHover(star)} 
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                >
                  {(hover || rating) >= star ? <FaStar /> : <FaRegStar />}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Review Title</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Review Body</label>
            <textarea 
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="What did you like or dislike?"
              style={{ width: '100%', padding: '12px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: '#fff', minHeight: '120px', resize: 'vertical' }}
              required
            />
            <span style={{ fontSize: '12px', color: body.length < 20 ? 'var(--accent)' : 'var(--text-muted)' }}>{body.length} / 20 minimum characters</span>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Add Photos (Optional)</label>
            <div style={{ width: '80px', height: '80px', border: '1px dashed var(--text-muted)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <PiImage size={24} />
            </div>
          </div>

          <button type="submit" className="btn-primary full-width">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
