"use client";

import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
const AUTH_STORAGE_KEY = 'app_auth_user';
const AUTH_TOKEN_KEY = 'app_auth_token';
const AUTH_REQUIRED = process.env.NEXT_PUBLIC_AUTH_REQUIRED === 'true';
const AUTH_LOGIN_URL = process.env.NEXT_PUBLIC_AUTH_LOGIN_URL || '';

const getStoredUser = () => {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const setStoredUser = (user) => {
  if (!user) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    setIsLoadingAuth(true);
    setAuthError(null);

    try {
      const storedUser = getStoredUser();
      setUser(storedUser);

      if (AUTH_REQUIRED && !storedUser) {
        setIsAuthenticated(false);
        setAuthError({
          type: 'auth_required',
          message: 'Authentication required'
        });
      } else {
        setIsAuthenticated(Boolean(storedUser));
      }
    } catch (error) {
      console.error('Auth state check failed:', error);
      setAuthError({
        type: 'unknown',
        message: error.message || 'Failed to check auth state'
      });
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = (shouldRedirect = true) => {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    setStoredUser(null);
    setUser(null);
    setIsAuthenticated(false);
    
    if (shouldRedirect && AUTH_LOGIN_URL) {
      const loginUrl = new URL(AUTH_LOGIN_URL, window.location.origin);
      loginUrl.searchParams.set('from_url', window.location.href);
      window.location.href = loginUrl.toString();
    }
  };

  const navigateToLogin = () => {
    if (AUTH_LOGIN_URL) {
      const loginUrl = new URL(AUTH_LOGIN_URL, window.location.origin);
      loginUrl.searchParams.set('from_url', window.location.href);
      window.location.href = loginUrl.toString();
      return;
    }
    console.warn('VITE_AUTH_LOGIN_URL is not configured; cannot redirect to login.');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      logout,
      navigateToLogin,
      checkAppState
    }}>
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
