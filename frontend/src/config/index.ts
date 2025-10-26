/**
 * Application configuration
 * Centralizes all configurable values and environment variables
 */

export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7788/api/external/v1',
    timeout: 30000, // 30 seconds
  },

  // OAuth Configuration
  oauth: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '501383933187-ettll7g5se489t5k2562cdr744upc0lr.apps.googleusercontent.com',
    },
  },

  // Storage Keys
  storage: {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    userData: 'userData',
  },

  // Notification Configuration
  notification: {
    defaultDuration: 5000, // 5 seconds
  },

  // Default Values
  defaults: {
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  },
} as const;

export type Config = typeof config;

