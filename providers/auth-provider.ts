import { AuthProvider } from '@refinedev/core';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { login, LoginParams, LoginResponse } from './auth-provider/login';
import { logout } from './auth-provider/logout';
import {
  twoFactorChallenge,
  TwoFactorChallengeParams,
  TwoFactorChallengeResponse,
} from './auth-provider/two-factor-challenge';
import { user } from './auth-provider/user';
import { getStrategy } from './auth-provider/utils';
const BASE_URL = 'http://${host}:${port}';
const TOKEN_KEY = 'access_token';

export class EmailUnavailableError extends Error {
  constructor() {
    super();
    this.name = EmailUnavailableError.name;
  }
}

export class TwoFactorChallengeError extends Error {
  constructor() {
    super();
    this.name = TwoFactorChallengeError.name;
  }
}

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
  login: async (params: LoginParams | TwoFactorChallengeParams) => {
    const loginId = 'login.id';
    const strategy = getStrategy();
    let result: LoginResponse | TwoFactorChallengeResponse;

    if (params.type === 'login') {
      const loginResponse = await login(params);

      if (loginResponse.twofactor) {
        if (strategy === 'spa') {
          localStorage.setItem(loginId, params.email);
        } else {
          await SecureStore.setItemAsync(loginId, params.email);
        }
        throw new TwoFactorChallengeError();
      }

      result = loginResponse;
    } else {
      const email =
        strategy === 'spa'
          ? localStorage.getItem(loginId)
          : await SecureStore.getItemAsync(loginId);

      if (email === null) {
        throw new EmailUnavailableError();
      }

      result = await twoFactorChallenge(email, params);
    }
    if (Platform.OS !== 'web' && result.token) {
      await SecureStore.setItemAsync(TOKEN_KEY, result.token);
    }

    if (strategy === 'spa') {
      localStorage.removeItem(loginId);
    } else {
      await SecureStore.deleteItemAsync(loginId);
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
