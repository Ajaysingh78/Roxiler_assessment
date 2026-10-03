import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('roxiler_token'));
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('roxiler_theme') || 'light');

  // Sync theme with html root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('roxiler_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Verify token on initial load
  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('roxiler_token');
      if (!storedToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        if (res.success && res.data.user) {
          setUser(res.data.user);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Session verification failed, logging out:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.success && res.data.token) {
      localStorage.setItem('roxiler_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data.user;
    }
    throw new Error(res.message || 'Login failed');
  };

  const signup = async (formData) => {
    const res = await api.post('/auth/signup', formData);
    if (res.success && res.data.token) {
      localStorage.setItem('roxiler_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data.user;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const logout = useCallback(() => {
    localStorage.removeItem('roxiler_token');
    setToken(null);
    setUser(null);
  }, []);

  const changePassword = async (currentPassword, newPassword) => {
    const res = await api.put('/auth/change-password', {
      currentPassword,
      newPassword
    });
    return res;
  };

  const isAdmin = user?.role === 'ADMIN';
  const isOwner = user?.role === 'STORE_OWNER';
  const isUser = user?.role === 'USER';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        theme,
        toggleTheme,
        login,
        signup,
        logout,
        changePassword,
        isAdmin,
        isOwner,
        isUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
