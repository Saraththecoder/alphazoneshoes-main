import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import ScrollToTop from './components/ScrollToTop';
import Toast from './components/Toast';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import InfoPage from './pages/InfoPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
          <ScrollToTop />
          <Toast />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<InfoPage type="about" />} />
              <Route path="/contact" element={<InfoPage type="contact" />} />
              <Route path="/privacy" element={<InfoPage type="privacy" />} />
              <Route path="/terms" element={<InfoPage type="terms" />} />
              <Route path="/refund" element={<InfoPage type="refund" />} />
              <Route path="/faq" element={<InfoPage type="faq" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
            <Footer />
            <BottomNav />
            <WhatsAppWidget />
          </div>
        </Router>
      </CartProvider>
    </WishlistProvider>
  </AuthProvider>
  );
}

export default App;
