import axios, { AxiosResponse } from 'axios';
import { Platform } from 'react-native';

import { getItemAsync } from './store';

import { getApiUrl, getTokenKey } from '~/config';

export const getHttp = async () => {
  const apiUrl = getApiUrl();

  let headers = {};
  if (Platform.OS === 'web') {
    headers = {
      'X-Requested-With': 'XMLHttpRequest',
    };
  } else {
    const token = await getItemAsync(getTokenKey());
    headers = {
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

export const setItemAsync = async (key: string, value: string) => {
  if (Platform.OS === 'web') return;
  await SecureStore.setItemAsync(key, value);
};
