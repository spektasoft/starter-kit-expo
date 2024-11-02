import axios from 'axios';
import { Platform } from 'react-native';

import { getAxios, getDeviceName } from '../utils';

export type LoginParams = {
  type: 'login';
  email: string;
  password: string;
};

export type LoginResponse = {
  token?: string;
  twofactor?: boolean;
};

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  try {
    const deviceName = getDeviceName();
    const http = await getAxios();

    const route = Platform.OS === 'web' ? 'login' : 'api/v1/login';

    const result = await http.post(route, {
      email: params.email,
      password: params.password,
      ...(Platform.OS !== 'web' && { device_name: deviceName }),
    });

    if (result.data['two_factor']) {
      return { twofactor: true };
    }

    if (Platform.OS !== 'web') {
      return { token: result.data['token'] };
    }

    return {};
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw Error(
        e.response?.data.message ||
          'Login failed, please check you internet connection and try again'
      );
    } else {
      throw Error('An error occurred, please try again');
    }
  }
};
