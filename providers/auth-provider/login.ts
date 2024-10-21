import axios from 'axios';

export type Strategy = 'spa' | 'native';

export type LoginParams = {
  email: string;
  password: string;
  deviceName: string;
  strategy: Strategy;
};

export const login = async (params: LoginParams): Promise<{ token: string }> => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;

  let csrfCookieRoute = undefined;
  let headers = {};
  let route = '';
  if (params.strategy === 'spa') {
    csrfCookieRoute = 'sanctum/csrf-cookie';
    headers = {
      'X-Requested-With': 'XMLHttpRequest',
    };
    route = 'login';
  } else {
    headers = {
      'Content-Type': 'application/json',
    };
    route = 'api/v1/login';
  }

  const http = axios.create({
    baseURL: baseUrl,
    headers,
    withCredentials: true,
    withXSRFToken: true,
  });

  try {
    if (csrfCookieRoute) {
      await http.get(csrfCookieRoute);
    }

    console.log(params);

    const result = await http.post(route, {
      email: params.email,
      password: params.password,
      device_name: params.deviceName,
    });

    if (params.strategy === 'spa') {
      return { token: 'token' };
    } else {
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
