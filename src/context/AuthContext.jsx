import React, { createContext, useState, useEffect } from 'react';
import { showToast } from '../components/Toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const localData = localStorage.getItem('alphaUser');
      return localData ? JSON.parse(localData) : null;
    } catch (e) {
      return null;
    }
  });

  const isLoggedIn = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('alphaUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('alphaUser');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    showToast(`Welcome back, ${userData.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully');
  };

  const updateProfile = (data) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      showToast('Profile updated', 'success');
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
