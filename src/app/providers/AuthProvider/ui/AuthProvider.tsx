import { type FC, type PropsWithChildren } from 'react';
import { useState, useEffect } from 'react';
import { AuthContext } from '../lib/AuthContext';
import { type User } from 'shared/types';

interface AuthResponse {
  isAuthenticated: boolean;
  user: User | null;
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/check', { credentials: 'include' });
      if (response.ok) {
        const data: AuthResponse = await response.json();

        if (data.isAuthenticated && data.user) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };

  const login = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:3000/auth/logout', { method: 'POST', credentials: 'include' });
      checkAuth();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
