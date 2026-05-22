import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTruck, FiRefreshCw, FiStar } from 'react-icons/fi';
import { getAllProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import Reveal from '../components/Reveal';
import './Home.css';

const categories = [
  { name: 'Sandals', count: 12, icon: '👡' },
  { name: 'Shoes', count: 24, icon: '👟' },
  { name: 'Flip Flops', count: 8, icon: '🩴' },
  { name: 'T-Shirts', count: 18, icon: '👕' },
  { name: 'Night Pants', count: 10, icon: '👖' }
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
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-left">
          <span className="hero-label">NEW COLLECTION 2026</span>
          <h1 className="hero-title">Wear Bold.<br/>Live Alpha.</h1>
          <p className="hero-subtext">
            Step into the future of Indian fashion. Premium quality footwear and apparel crafted for those who lead the pack.
          </p>
          
          <div className="hero-ctas">
            <Link to="/products" className="btn-primary">Shop Now</Link>
            <Link to="/products" className="btn-secondary">View All</Link>
          </div>
          
          <div className="hero-features">
            <div className="feature">
              <FiTruck className="text-accent" />
              <span>Free Delivery ₹499+</span>
            </div>
            <div className="feature">
              <FiRefreshCw className="text-accent" />
              <span>Easy Returns</span>
            </div>
            <div className="feature">
              <FiStar className="text-accent" />
              <span>Premium Quality</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="bento-grid">
            <div className="bento-tile tile-large-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800)' }}>
            </div>
            <div className="bento-tile tile-stat">
              <FiStar size={32} className="text-accent mb-2" />
              <h3 className="stat-num">2000+</h3>
              <p className="stat-text">Happy Customers</p>
            </div>
            <div className="bento-tile tile-badge">
              <div className="badge-new">NEW ARRIVAL</div>
              <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400" alt="New Arrival" />
            </div>
            <div className="bento-tile tile-price">
              <span className="price-tag">₹299</span>
              <span className="price-sub">Onwards</span>
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
                <div className="category-icon">{cat.icon}</div>
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
