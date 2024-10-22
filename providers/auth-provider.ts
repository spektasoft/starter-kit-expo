import { AuthProvider } from '@refinedev/core';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { login, LoginParams } from './auth-provider/login';
import { logout } from './auth-provider/logout';
import { user } from './auth-provider/user';
const BASE_URL = 'http://${host}:${port}';
const TOKEN_KEY = 'access_token';

export const authProvider: AuthProvider = {
  logout: async () => {
    try {
      const token =
        Platform.OS !== 'web'
          ? ((await SecureStore.getItemAsync(TOKEN_KEY)) ?? undefined)
          : undefined;
      const status = await logout(token);
      if (Platform.OS !== 'web' && status) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
      return { success: status };
    } catch (e) {
      const error = e as Error;
      return { success: true, error };
    }
  },
  login: async (params: LoginParams) => {
    const result = await login(params);
    if (Platform.OS !== 'web' && result) {
      await SecureStore.setItemAsync(TOKEN_KEY, result.token);
    }
    return { success: true };
  },
  check: async () => {
    try {
      const token =
        Platform.OS !== 'web'
          ? ((await SecureStore.getItemAsync(TOKEN_KEY)) ?? undefined)
          : undefined;
      const status = await user(token);

      return { authenticated: status, logout: !status };
    } catch (e) {
      const error = e as Error;
      return { authenticated: false, logout: true, error };
    }
  },
  onError: async () => {
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
      throw error;
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
      throw error;
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
