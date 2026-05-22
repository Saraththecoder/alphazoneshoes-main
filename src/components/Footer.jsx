import React from 'react';
import { Link } from 'react-router-dom';
import { PiInstagramLogo, PiTwitterLogo, PiFacebookLogo } from 'react-icons/pi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col brand-col">
          <h2 className="footer-brand">
            The<span className="text-accent">Alpha</span>Zone
          </h2>
          <p className="text-muted">Wear Bold. Live Alpha. Premium Indian Fashion designed for the modern trendsetter.</p>
          <div className="social-icons">
            <a href="#" className="icon-btn"><PiInstagramLogo size={20} weight="fill" /></a>
            <a href="#" className="icon-btn"><PiTwitterLogo size={20} weight="fill" /></a>
            <a href="#" className="icon-btn"><PiFacebookLogo size={20} weight="fill" /></a>
          </div>
        </div>
        
        <div className="footer-col">
          <h3>Shop</h3>
          <ul className="footer-links">
            <li><Link to="/products">Shop All</Link></li>
            <li><Link to="/products?category=Sandals">Sandals</Link></li>
            <li><Link to="/products?category=Shoes">Shoes</Link></li>
            <li><Link to="/products?category=T-Shirts">Apparel</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/refund">Returns</Link></li>
            <li><Link to="/faq">Track Order</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="text-muted">© 2026 TheAlphaZone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
