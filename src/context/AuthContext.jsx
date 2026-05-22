import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const localData = localStorage.getItem('authUser');
      return localData ? JSON.parse(localData) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [user]);

  const login = async (email, password) => {
    // Mocking an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          setUser({ name: email.split('@')[0], email, id: 'user_' + Date.now() });
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  };

  const signup = async (name, email, password) => {
    // Mocking an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          setUser({ name, email, id: 'user_' + Date.now() });
          resolve();
        } else {
          reject(new Error('Please fill all fields'));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
