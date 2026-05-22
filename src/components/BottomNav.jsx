import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PiHouse, PiStorefront, PiHandbag, PiUser } from 'react-icons/pi';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './BottomNav.css';

const BottomNav = () => {
  const { getTotalItems } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const totalItems = getTotalItems();

  const navItems = [
    { path: '/', icon: PiHouse, label: 'Home' },
    { path: '/products', icon: PiStorefront, label: 'Shop' },
    { path: '/cart', icon: PiHandbag, label: 'Cart', badge: totalItems },
    { path: isLoggedIn ? '/profile' : '/login', icon: PiUser, label: 'Account' },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path === '/products' && location.pathname.startsWith('/products'));
        const Icon = item.icon;
        
        return (
          <Link key={item.label} to={item.path} className={`bottom-nav-item ${isActive ? 'active' : ''}`}>
            <div className="icon-wrapper">
              <Icon size={24} weight={isActive ? 'fill' : 'regular'} />
              {item.badge > 0 && <span className="bottom-badge">{item.badge}</span>}
            </div>
            <span className="bottom-label">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
