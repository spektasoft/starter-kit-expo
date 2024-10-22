import axios from 'axios';

import { Strategy } from '~/types/strategy';

export const getAxios = (strategy: Strategy) => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;

  const headers =
    strategy === 'spa'
      ? {
          'X-Requested-With': 'XMLHttpRequest',
        }
      : {
          'Content-Type': 'application/json',
        };

  const http = axios.create({
    baseURL: baseUrl,
    headers,
    withCredentials: true,
    withXSRFToken: true,
  });

  return http;
};
