"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Set client flag to true after hydration
    setIsClient(true);
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    // Only access localStorage on the client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData: User, tokens: { accessToken: string; refreshToken: string }) => {
    // Only access localStorage on the client side
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error saving login data:', error);
    }
  };

  const logout = () => {
    // Only access localStorage on the client side
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      
      setUser(null);
      setIsLoggedIn(false);
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const requireAuth = () => {
    if (!isLoggedIn && !isLoading) {
      router.push('/login');
      return false;
    }
    return isLoggedIn;
  };

  return {
    user,
    isLoggedIn,
    isLoading,
    isClient,
    login,
    logout,
    requireAuth,
    checkAuthStatus
  };
}
