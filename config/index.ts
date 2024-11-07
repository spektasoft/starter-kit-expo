import { Platform } from 'react-native';

import { NotTestEnvirontmentError } from '~/errors/NotTestEnvirontmentError';

export const getApiUrl = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) {
    return 'http://localhost';
  }
  return apiUrl;
};

export const getLoginIdKey = () => 'login_id';

export const getTokenKey = () => {
  const tokenKey = process.env.EXPO_PUBLIC_TOKEN_KEY;
  if (!tokenKey) {
    return 'access_key';
  }
  return tokenKey;
};

export const getTestAccountEmail = (): string => {
  if (!Platform.isTesting) throw new NotTestEnvirontmentError();
  return process.env.TEST_ACCOUNT_EMAIL!;
};

export const getTestAccountPassword = (): string => {
  if (!Platform.isTesting) throw new NotTestEnvirontmentError();
  return process.env.TEST_ACCOUNT_PASSWORD!;
};

export const getTestAccount2faSecret = (): string => {
  if (!Platform.isTesting) throw new NotTestEnvirontmentError();
  return process.env.TEST_ACCOUNT_2FA_SECRET!;
};
