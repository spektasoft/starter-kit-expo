import axios from 'axios';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

import { Strategy } from '~/types/strategy';

export const getAxios = (token?: string) => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
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
    baseURL: baseUrl,
    headers,
    withCredentials: true,
    withXSRFToken: true,
  });

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
