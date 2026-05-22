import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (e) {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, size, quantity) => {
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
      return [...prev, { ...product, size, quantity: Math.min(quantity, 5) }];
    });
  };

  const removeFromCart = (id, size) => {
    setItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, change) => {
    setItems((prev) => {
      return prev.map(item => {
        if (item.id === id && item.size === size) {
          const newQty = item.quantity + change;
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
