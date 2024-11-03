import { AuthProvider } from '@refinedev/core';

import { login, LoginParams } from './auth-provider/login';
import { logout } from './auth-provider/logout';
import { twoFactorChallenge, TwoFactorChallengeParams } from './auth-provider/two-factor-challenge';
import { user } from './auth-provider/user';

import { InvalidTypeError } from '~/errors/InvalidTypeError';
const BASE_URL = 'http://${host}:${port}';

export const authProvider: AuthProvider = {
  logout: async () => {
    try {
      const status = await logout();
      return { success: status };
    } catch (e) {
      const error = e as Error;
      return { success: true, error };
    }
  },
  login: async (params: LoginParams | TwoFactorChallengeParams) => {
    if ('password' in params) {
      await login(params);
    } else if ('code' in params) {
      await twoFactorChallenge(params);
    } else {
      throw new InvalidTypeError();
    }

    return { success: true };
  },
  check: async () => {
    try {
      await user();
      return { authenticated: true };
    } catch (e) {
      const error = e as Error;
      return { authenticated: false, error };
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
  getIdentity: async () => {
    return await user();
  },
  getPermissions: async () => {
    throw new Error('Not implemented');
  },
};
