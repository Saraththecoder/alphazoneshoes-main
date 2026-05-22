import React from 'react';
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
          <ul>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Shoes & Sandals</a></li>
            <li><a href="#">T-Shirts</a></li>
            <li><a href="#">Night Pants</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Contact Us</a></li>
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
