import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiFilter, FiXCircle } from 'react-icons/fi';
import { getAllProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import CategoryPill from '../components/CategoryPill';
import './Products.css';

const categories = ['All', 'Shoes', 'Sandals', 'Flip Flops', 'T-Shirts', 'Night Pants'];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

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

  return (
    <div className="products-page page-enter">
      <div className="products-header">
        <h1 className="display-text">All Products</h1>
        <p className="text-muted">Discover our complete collection of premium fashion.</p>
      </div>

      <div className="filter-bar">
        <FiFilter className="text-muted" size={20} />
        <div className="pills-container">
          {categories.map((cat) => (
            <CategoryPill 
              key={cat} 
              name={cat} 
              isActive={activeCategory === cat} 
              onClick={() => setActiveCategory(cat)} 
            />
          ))}
        </div>
      </div>

      {loading ? (
        <div className="products-grid-masonry">
          {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="products-grid-masonry">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FiXCircle size={48} className="text-muted mb-4" />
          <h3>No products found</h3>
          <p className="text-muted">We couldn't find any products in this category.</p>
          <button className="btn-secondary mt-4" onClick={() => setActiveCategory('All')}>
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
