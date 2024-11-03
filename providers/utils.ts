import axios, { AxiosResponse } from 'axios';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

import { getApiUrl, getTokenKey } from '~/config';
import { getItemAsync } from '~/lib/store';

export const getAxios = async () => {
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

export const getLoginId = () => 'login.id';

export const isSuccess = (response: AxiosResponse) => {
  if (response.status >= 200 && response.status < 300) {
    return true;
  }
  return false;
};
