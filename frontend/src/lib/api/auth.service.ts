/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { apiClient } from './client';
import { config } from '@/config';
import { LoginRequest, RegisterRequest, OAuthRequest, LoginResponse } from '../types';

export class AuthService {
  private readonly endpoint = '';

  /**
   * Login with email and password
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const data = await apiClient.post<LoginResponse>(`${this.endpoint}/login`, credentials);
    this.storeTokens(data);
    return data;
  }

  /**
   * Register a new user
   */
  async register(userData: RegisterRequest): Promise<void> {
    await apiClient.post(`${this.endpoint}/register`, userData);
  }

  /**
   * Login with Google OAuth
   */
  async googleOAuth(oauthData: OAuthRequest): Promise<LoginResponse> {
    const data = await apiClient.post<LoginResponse>(`${this.endpoint}/google-oauth`, oauthData);
    this.storeTokens(data);
    return data;
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<LoginResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const data = await apiClient.post<LoginResponse>(`${this.endpoint}/refresh`, {
      refreshToken,
    });
    this.storeTokens(data);
    return data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(`${this.endpoint}/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
    }
  }

  /**
   * Store tokens in localStorage
   */
  private storeTokens(data: LoginResponse): void {
    if (typeof window === 'undefined') return;

    if (data.accessToken) {
      localStorage.setItem(config.storage.accessToken, data.accessToken);
    }
    if (data.refreshToken) {
      localStorage.setItem(config.storage.refreshToken, data.refreshToken);
    }
  }

  /**
   * Get refresh token from localStorage
   */
  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(config.storage.refreshToken);
  }

  /**
   * Clear all tokens from localStorage
   */
  private clearTokens(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(config.storage.accessToken);
    localStorage.removeItem(config.storage.refreshToken);
    localStorage.removeItem(config.storage.userData);
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export legacy functions for backward compatibility
export const login = (credentials: LoginRequest) => authService.login(credentials);
export const register = (userData: RegisterRequest) => authService.register(userData);
export const googleOAuth = (oauthData: OAuthRequest) => authService.googleOAuth(oauthData);

