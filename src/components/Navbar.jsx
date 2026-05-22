import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { getTotalItems } = useContext(CartContext);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = getTotalItems();

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <Link to="/" className="brand-logo">
            The<span className="text-accent">Alpha</span>Zone
          </Link>
        </div>

        <div className="nav-center">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/products" className={`nav-link ${location.pathname.startsWith('/products') ? 'active' : ''}`}>Shop</Link>
          <span className="nav-link">About</span>
        </div>

        <div className="nav-right">
          <button className="icon-btn" aria-label="Search">
            <FiSearch size={20} />
          </button>
          <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart">
            <FiShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="cart-badge cart-pulse">{totalItems}</span>
            )}
          </Link>
          <button className="icon-btn mobile-menu" onClick={() => setDrawerOpen(true)}>
            <FiMenu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`drawer-overlay ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)}></div>
      <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span className="brand-logo">
            The<span className="text-accent">Alpha</span>Zone
          </span>
          <button className="icon-btn" onClick={() => setDrawerOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
        <div className="drawer-links">
          <Link to="/" onClick={() => setDrawerOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setDrawerOpen(false)}>Shop</Link>
          <span>About</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
