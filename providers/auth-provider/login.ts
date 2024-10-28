import axios from 'axios';

import { getAxios, getDeviceName, getStrategy } from './utils';

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
    const strategy = getStrategy();
    const deviceName = getDeviceName();
    const http = await getAxios();

    const route = strategy === 'spa' ? 'login' : 'api/v1/login';

    const result = await http.post(route, {
      email: params.email,
      password: params.password,
      device_name: deviceName,
    });

    if (result.data['two_factor']) {
      return { twofactor: true };
    }

    if (strategy === 'native') {
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
