import { AuthProvider } from '@refinedev/core';

import config from '../../appconfig';
const host = process.env.EXPO_PUBLIC_HOSTS;
const port = process.env.EXPO_PUBLIC_PORT;
const BASE_URL = 'http://${host}:${port}';
const TOKEN_KEY = 'access_token';

export const authProvider: AuthProvider = {
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return { success: true };
  },
  login: async ({ username, password }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data.access_token);
    if (data.access_token) {
      localStorage.setItem(TOKEN_KEY, data.access_token);
      return { success: true };
    }

    return { success: false };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return { authenticated: Boolean(token) };
  },
  onError: async (error) => {
    throw new Error('Not implemented');
  },
  register: async ({ username, password, email, phone, streetaddress }) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
          phone,
          street_address: streetaddress,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        return {
          success: true,
          redirectTo: '/login',
          successNotification: {
            message: 'Registration Successful',
            description: 'You have successfully registered.',
          },
        };
      } else {
        return Promise.reject(data.message || 'Registration failed');
      }
    } catch (error) {
      return Promise.reject('Network error');
    }
  },
  forgotPassword: async (email: string) => {
    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          successNotification: {
            message: 'Password Reset Link Sent',
            description: 'A password reset link has been sent to your email.',
          },
        };
      } else {
        return Promise.reject(data.message || 'Error sending reset link');
      }
    } catch (error) {
      return Promise.reject('Network error');
    }
  },
  updatePassword: async (params) => {
    throw new Error('Not implemented');
  },
  getIdentity: async ({ username, password }) => {
    const identityObject = {
      name: 'misbah',
      age: 25,
      isAdmin: false,
    };
    console.log('ini');
    console.log(username);
    const jsonString = JSON.stringify(identityObject);
    return JSON.parse(jsonString);
  },
  getPermissions: async () => {
    throw new Error('Not implemented');
  },
};
