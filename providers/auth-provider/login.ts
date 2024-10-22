import axios from 'axios';

import { getAxios } from './utils';

import { Strategy } from '~/types/strategy';

export type LoginParams = {
  email: string;
  password: string;
  deviceName: string;
  strategy: Strategy;
};

export const login = async (params: LoginParams): Promise<{ token: string } | void> => {
  try {
    const http = getAxios(params.strategy);

    if (params.strategy === 'spa') {
      await http.get('sanctum/csrf-cookie');
    }

    const route = params.strategy === 'spa' ? 'login' : 'api/v1/login';

    const result = await http.post(route, {
      email: params.email,
      password: params.password,
      device_name: params.deviceName,
    });

    if (params.strategy === 'native') {
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
