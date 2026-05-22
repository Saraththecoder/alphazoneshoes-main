import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiList, PiX, PiHandbag, PiHeart, PiMagnifyingGlass, PiUser } from 'react-icons/pi';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { AuthContext } from '../context/AuthContext';
import SearchBar from './SearchBar';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { items: cartItems } = useContext(CartContext);
  const { items: wishlistItems } = useContext(WishlistContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand-logo" onClick={() => setIsOpen(false)}>
          The<span className="text-accent">Alpha</span>Zone
        </Link>
        
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <button className="mobile-close" onClick={toggleMenu}>
            <PiX size={24} />
          </button>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/products" onClick={toggleMenu}>Shop</Link>
          <Link to="/products?category=Sandals" onClick={toggleMenu}>Sandals</Link>
          <Link to="/products?category=Shoes" onClick={toggleMenu}>Shoes</Link>
          <Link to="/about" onClick={toggleMenu}>About</Link>
          <Link to="/contact" onClick={toggleMenu}>Contact</Link>
          
          <div className="mobile-auth-links" style={{ display: isOpen ? 'flex' : 'none', flexDirection: 'column', marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '24px', gap: '16px' }}>
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={toggleMenu}>My Profile</Link>
                <Link to="/orders" onClick={toggleMenu}>My Orders</Link>
                <Link to="/wishlist" onClick={toggleMenu}>Wishlist</Link>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--accent)', textAlign: 'left', fontSize: '16px', padding: 0 }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu} className="btn-secondary" style={{ textAlign: 'center' }}>Login</Link>
                <Link to="/signup" onClick={toggleMenu} className="btn-primary" style={{ textAlign: 'center' }}>Sign Up</Link>
              </>
            )}
          </div>
        </div>

        <div className="nav-actions">
          <button className="icon-btn" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
            <PiMagnifyingGlass size={24} />
          </button>
          
          <Link to="/wishlist" className="icon-btn hide-mobile" aria-label="Wishlist" style={{ position: 'relative' }}>
            <PiHeart size={24} />
            {wishlistItems.length > 0 && <span className="cart-badge">{wishlistItems.length}</span>}
          </Link>

          {!isLoggedIn ? (
            <Link to="/login" className="hide-mobile" style={{ margin: '0 12px', fontWeight: 600, color: 'var(--text-primary)' }}>Login</Link>
          ) : (
            <div className="hide-mobile" style={{ position: 'relative', margin: '0 12px' }}>
              <button 
                className="user-avatar" 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {user?.name?.charAt(0) || 'U'}
              </button>
              
              {isProfileOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', width: '200px', display: 'flex', flexDirection: 'column', zIndex: 100, overflow: 'hidden' }}>
                  <Link to="/profile" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }} onClick={() => setIsProfileOpen(false)}>My Profile</Link>
                  <Link to="/orders" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }} onClick={() => setIsProfileOpen(false)}>My Orders</Link>
                  <Link to="/wishlist" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }} onClick={() => setIsProfileOpen(false)}>Wishlist</Link>
                  <button onClick={handleLogout} style={{ padding: '12px 16px', background: 'none', border: 'none', color: 'var(--accent)', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>Logout</button>
                </div>
              )}
            </div>
          )}

          <Link to="/cart" className="icon-btn cart-icon-wrapper" aria-label="Cart">
            <PiHandbag size={24} />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
            )}
          </Link>
          
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
            <PiList size={28} />
          </button>
        </div>
      </div>
      
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
