import { HttpError } from '@refinedev/core';
import axios, { AxiosResponse } from 'axios';
import { Platform } from 'react-native';

import { getItemAsync } from './store';

import { getApiUrl, getTokenKey } from '~/config';
import { i18nProvider } from '~/providers/i18n-provider';

export const getHttp = async () => {
  const apiUrl = getApiUrl();

  let headers: { [key: string]: string } = {
    'Content-Language': i18nProvider.getLocale(),
  };
  if (Platform.OS === 'web') {
    headers = {
      ...headers,
      'X-Requested-With': 'XMLHttpRequest',
    };
  } else {
    const token = await getItemAsync(getTokenKey());
    headers = {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  const http = axios.create({
    baseURL: apiUrl,
    headers,
    withCredentials: true,
    withXSRFToken: true,
  });

  if (Platform.OS === 'web') {
    await http.get('sanctum/csrf-cookie');
  }

  return http;
};

export const isSuccess = (response: AxiosResponse) => {
  if (response.status >= 200 && response.status < 300) {
    return true;
  }
  return false;
};

export const convertToHttpError = (e: unknown): HttpError => {
  if (axios.isAxiosError(e)) {
    return {
      message: e.response?.data?.message ?? e.message,
      statusCode: e.status ?? 500,
    };
  }

  throw e;
};
