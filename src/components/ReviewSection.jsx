import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { PiCheckCircleFill, PiThumbsUp, PiThumbsDown } from 'react-icons/pi';
import WriteReview from './WriteReview';

const MOCK_REVIEWS = [
  { id: 1, name: "Rahul S.", initials: "RS", verified: true, rating: 5, date: "2 days ago", text: "Absolutely love these! The quality is premium and they fit perfectly. Worth every rupee.", helpful: 12, unhelpful: 2 },
  { id: 2, name: "Vikram K.", initials: "VK", verified: true, rating: 4, date: "1 week ago", text: "Great product. Took one star off because delivery was a day late, but the product itself is flawless.", helpful: 8, unhelpful: 0 },
  { id: 3, name: "Anjali M.", initials: "AM", verified: false, rating: 5, date: "2 weeks ago", text: "Bought this as a gift. The packaging was beautiful and luxurious.", helpful: 4, unhelpful: 1 },
];

const ReviewSection = () => {
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState({});

  const handleHelpful = (id, type) => {
    setHelpfulCounts(prev => ({
      ...prev,
      [id]: { ...prev[id], [type]: (prev[id]?.[type] || 0) + 1 }
    }));
  };

  return (
    <div className="review-section" style={{ marginTop: '48px', paddingTop: '48px', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <h2 className="display-text" style={{ fontSize: '32px', marginBottom: '24px' }}>Customer Reviews</h2>
          
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '64px', fontFamily: '"Playfair Display", serif', lineHeight: 1 }}>4.8</div>
              <div style={{ color: '#F59E0B', display: 'flex', gap: '4px', justifyContent: 'center', margin: '8px 0' }}>
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
              </div>
              <p className="text-muted text-sm">Based on 128 reviews</p>
            </div>
            
            <div style={{ flex: 1, minWidth: '200px' }}>
              {[
                { s: 5, p: 70 },
                { s: 4, p: 18 },
                { s: 3, p: 8 },
                { s: 2, p: 3 },
                { s: 1, p: 1 },
              ].map(bar => (
                <div key={bar.s} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', width: '20px' }}>{bar.s}★</span>
                  <div style={{ flex: 1, height: '8px', background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${bar.p}%`, height: '100%', background: 'var(--accent)', borderRadius: '4px' }}></div>
                  </div>
                  <span style={{ fontSize: '14px', width: '30px', textAlign: 'right', color: 'var(--text-muted)' }}>{bar.p}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <button className="btn-primary" onClick={() => setShowWriteModal(true)}>Write a Review</button>
        </div>
      </div>

      <div className="reviews-list" style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {MOCK_REVIEWS.map(review => (
          <div key={review.id} style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {review.initials}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 600 }}>{review.name}</span>
                    {review.verified && <PiCheckCircleFill color="#34D399" title="Verified Buyer" />}
                  </div>
                  <div style={{ color: '#F59E0B', display: 'flex', gap: '2px', fontSize: '12px', marginTop: '4px' }}>
                    {[...Array(5)].map((_, i) => i < review.rating ? <FaStar key={i} /> : <FaRegStar key={i} />)}
                  </div>
                </div>
              </div>
              <span className="text-muted text-sm">{review.date}</span>
            </div>
            <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '16px' }}>{review.text}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: 'var(--text-muted)' }}>
              <span>Was this helpful?</span>
              <button 
                onClick={() => handleHelpful(review.id, 'helpful')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <PiThumbsUp /> {review.helpful + (helpfulCounts[review.id]?.helpful || 0)}
              </button>
              <button 
                onClick={() => handleHelpful(review.id, 'unhelpful')}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <PiThumbsDown /> {review.unhelpful + (helpfulCounts[review.id]?.unhelpful || 0)}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <button style={{ background: 'none', border: '1px solid var(--border)', padding: '12px 24px', borderRadius: 'var(--radius-pill)', color: 'var(--ivory)', cursor: 'pointer' }}>Load More</button>
      </div>

      <WriteReview isOpen={showWriteModal} onClose={() => setShowWriteModal(false)} />
    </div>
  );
};

export default ReviewSection;
