import axios from 'axios';

import { getAxios, getDeviceName, getStrategy } from './utils';

export type LoginParams = {
  email: string;
  password: string;
};

export const login = async (params: LoginParams): Promise<{ token: string } | void> => {
  try {
    const strategy = getStrategy();
    const deviceName = getDeviceName();
    const http = getAxios();

    if (strategy === 'spa') {
      await http.get('sanctum/csrf-cookie');
    }

    const route = strategy === 'spa' ? 'login' : 'api/v1/login';

    const result = await http.post(route, {
      email: params.email,
      password: params.password,
      device_name: deviceName,
    });

    if (strategy === 'native') {
      return { token: result.data['token'] };
    }
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
