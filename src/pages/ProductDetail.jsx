import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PiStar, PiCheck, PiMinus, PiPlus } from 'react-icons/pi';
import { getProductById } from '../api/products';
import { CartContext } from '../context/CartContext';
import { showToast } from '../components/Toast';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await getProductById(id);
      if (data) {
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize);
    }
    showToast(`Added ${quantity} ${product.name} to cart`, 'success');
  };

  if (loading) {
    return <div className="product-detail-page"><div className="loading-state">Loading product details...</div></div>;
  }

  if (!product) {
    return <div className="product-detail-page"><div className="error-state">Product not found</div></div>;
  }

  const images = [
    product.image,
    product.image + '&crop=entropy',
    product.image + '&crop=edges',
  ];

  return (
    <div className="product-detail-page page-enter">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <Link to="/products">Products</Link> &gt; <span>{product.category}</span> &gt; <span className="current">{product.name}</span>
      </div>

      <div className="detail-grid">
        <div className="detail-left">
          <div className="main-image-container">
            <img src={images[activeImage]} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnail-row">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`thumbnail ${activeImage === idx ? 'active' : ''}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="detail-right">
          <div className="category-badge">{product.category}</div>
          <h1 className="detail-title">{product.name}</h1>
          
          <div className="rating-row">
            <div className="stars">
              <PiStar weight="fill" className="filled" />
              <PiStar weight="fill" className="filled" />
              <PiStar weight="fill" className="filled" />
              <PiStar weight="fill" className="filled" />
              <PiStar weight="fill" className={product.rating >= 4.8 ? "filled" : ""} />
            </div>
            <span className="rating-count">({product.rating} / 5)</span>
          </div>
          
          <div className="detail-price-row">
            <span className="sale-price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>
          
          <hr className="divider" />
          
          <div className="size-selector">
            <label>Select Size</label>
            <div className="size-pills">
              {product.sizes.map((size) => (
                <button 
                  key={size}
                  className={`size-pill ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="quantity-selector">
            <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}><PiMinus /></button>
            <span className="qty-number">{quantity}</span>
            <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}><PiPlus /></button>
          </div>
          
          <div className="action-row">
            <button className="btn-primary full-width" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <Link to="/cart" className="btn-secondary dark-filled full-width" onClick={handleAddToCart}>
              Buy Now
            </Link>
          </div>
          
          <hr className="divider" />
          
          <div className="product-description">
            <p>{product.description}</p>
          </div>
          
          <ul className="features-list">
            {product.features.map((feature, idx) => (
              <li key={idx}>
                <PiCheck className="feature-icon" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
