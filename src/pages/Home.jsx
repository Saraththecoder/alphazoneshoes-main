import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiTruck, PiArrowsClockwise, PiStar, PiSneaker, PiTShirt, PiPants } from 'react-icons/pi';
import { GiSandal, GiFlipFlops } from 'react-icons/gi';
import { getAllProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import Reveal from '../components/Reveal';
import './Home.css';

const categories = [
  { name: 'Sandals', count: 12, icon: <GiSandal size={48} /> },
  { name: 'Shoes', count: 24, icon: <PiSneaker size={48} /> },
  { name: 'Flip Flops', count: 8, icon: <GiFlipFlops size={48} /> },
  { name: 'T-Shirts', count: 18, icon: <PiTShirt size={48} /> },
  { name: 'Night Pants', count: 10, icon: <PiPants size={48} /> }
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await getAllProducts();
      if (data) {
        setFeatured(data.filter(p => p.isFeatured).slice(0, 4));
      }
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  return (
    <div className="page-enter">
      {/* Cinematic Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        
        <div className="hero-content-centered">
          <Reveal>
            <h1 className="hero-title">Wear Bold.<br/>Live <span className="text-accent">Alpha.</span></h1>
            <p className="hero-subtitle">Premium Indian fashion designed for the modern trendsetter.</p>
            <div className="hero-ctas">
              <Link to="/products" className="btn-primary">Explore Collection</Link>
            </div>
          </Reveal>
        </div>

        <div className="hero-bottom-bar">
          <Reveal className="glass-features">
            <div className="feature-item">
              <PiTruck className="text-accent" size={24} />
              <span>Free Delivery ₹499+</span>
            </div>
            <div className="feature-item">
              <PiArrowsClockwise className="text-accent" size={24} />
              <span>Easy Returns</span>
            </div>
            <div className="feature-item">
              <PiStar weight="fill" className="text-accent" size={24} />
              <span>Premium Quality</span>
            </div>
          </Reveal>
          
          <div className="scroll-indicator">
            <span className="scroll-text">Scroll</span>
            <div className="mouse">
              <div className="wheel"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <Reveal>
        <section className="categories-section">
          <h2 className="section-title">Shop by Category</h2>
          <div className="category-scroll-container">
            {categories.map((cat, idx) => (
              <Link to={`/products?category=${cat.name}`} key={idx} className="category-card">
                <div className="category-icon" style={{ color: 'var(--accent)' }}>{cat.icon}</div>
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-count">{cat.count} Products</p>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Featured Products */}
      <Reveal>
        <section className="featured-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Most Loved</h2>
              <p className="section-subtitle">Picked for you</p>
            </div>
            <Link to="/products" className="btn-secondary desktop-only">View All Products</Link>
          </div>
          
          <div className="products-grid">
            {loading 
              ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : featured.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))
            }
          </div>
          
          <Link to="/products" className="btn-secondary mobile-only full-width mt-4 text-center">View All Products</Link>
        </section>
      </Reveal>
    </div>
  );
};

export default Home;
