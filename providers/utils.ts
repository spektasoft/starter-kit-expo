import axios, { AxiosResponse } from 'axios';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

import { getApiUrl } from '~/config';
import { Strategy } from '~/types/strategy';

export const getAxios = async (token?: string) => {
  const apiUrl = getApiUrl();
  const strategy = getStrategy();

  const headers =
    strategy === 'spa'
      ? {
          'X-Requested-With': 'XMLHttpRequest',
        }
      : {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        };

  const http = axios.create({
    baseURL: apiUrl,
    headers,
    withCredentials: true,
    withXSRFToken: true,
  });

  if (strategy === 'spa') {
    await http.get('sanctum/csrf-cookie');
  }

  return http;
};

export const getDeviceName = () => {
  if (Device.modelName) {
    return Device.modelName;
  } else if (Device.deviceName) {
    return Device.deviceName;
  } else {
    if (Platform.OS === 'web') {
      return 'Web';
    } else if (Platform.OS === 'android') {
      return 'Android';
    } else if (Platform.OS === 'ios') {
      return 'iOS';
    } else {
      return 'Unknown Device';
    }
  }
};

export const getStrategy = (): Strategy => {
  if (Platform.OS === 'web') {
    return 'spa';
  } else {
    return 'native';
  }
};

export const isSuccess = (response: AxiosResponse) => {
  if (response.status >= 200 && response.status < 300) {
    return true;
  }
  return false;
};
