import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PiFaders, PiXCircle } from 'react-icons/pi';
import { getAllProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import CategoryPill from '../components/CategoryPill';
import './Products.css';

const categories = ['All', 'Shoes', 'Sandals', 'Flip Flops', 'T-Shirts', 'Night Pants'];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const activeCategory = queryParams.get('category') || 'All';
  
  const [sortBy, setSortBy] = useState('featured');

  const handleCategoryClick = (cat) => {
    if (cat === 'All') {
      navigate('/products');
    } else {
      navigate(`/products?category=${encodeURIComponent(cat)}`);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await getAllProducts();
      if (data) {
        const sorted = data.sort((a, b) => b.isNew - a.isNew);
        setProducts(sorted);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return (b.isNew === true) - (a.isNew === true);
    return 0;
  });

  return (
    <div className="products-page page-enter">
      <div className="products-header">
        <h1 className="display-text">All Products</h1>
        <p className="text-muted">Discover our complete collection of premium fashion.</p>
      </div>

      <div className="filter-bar">
        <PiFaders className="text-muted" size={20} />
        <div className="pills-container">
          {categories.map((cat) => (
            <CategoryPill 
              key={cat} 
              name={cat} 
              isActive={activeCategory === cat} 
              onClick={() => handleCategoryClick(cat)}
            />
          ))}
        </div>
        <div className="sort-dropdown" style={{ marginLeft: 'auto' }}>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--ivory)', padding: '8px 16px', borderRadius: 'var(--radius-sm)', outline: 'none' }}
          >
            <option value="featured">Featured</option>
            <option value="newest">New Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="products-grid-masonry">
          {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : sortedProducts.length > 0 ? (
        <div className="products-grid-masonry">
          {sortedProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <PiXCircle size={48} className="text-muted mb-4" />
          <h3>No products found</h3>
          <p className="text-muted">We couldn't find any products in this category.</p>
          <button className="btn-secondary mt-4" onClick={() => handleCategoryClick('All')}>
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
