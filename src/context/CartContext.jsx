import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      const parsed = localData ? JSON.parse(localData) : [];
      // Sanitize old corrupted data
      return parsed.filter(item => item && !isNaN(item.quantity) && item.quantity > 0 && item.cartItemId);
    } catch (e) {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, size, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        if (existing.quantity + quantity > 5) {
          return prev;
        }
        return prev.map(item => 
          item.id === product.id && item.size === size 
            ? { ...item, quantity: Math.min(item.quantity + quantity, 5) }
            : item
        );
      }
      return [...prev, { ...product, size, quantity: Math.min(quantity, 5), cartItemId: `${product.id}-${size}` }];
    });
  };

  const removeFromCart = (cartItemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    setItems((prev) => {
      return prev.map(item => {
        if (item.cartItemId === cartItemId) {
          if (newQty > 5 || newQty < 1) return item;
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const clearCart = () => setItems([]);

  const getTotalItems = () => items.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () => items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
