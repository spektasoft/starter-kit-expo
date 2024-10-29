import axios from 'axios';

import { getAxios, getStrategy } from './utils';

export const logout = async (token?: string): Promise<boolean> => {
  try {
    const http = await getAxios(token);
    const strategy = getStrategy();

    const route = strategy === 'spa' ? 'logout' : 'api/v1/logout';

    const result = await http.post(route);

    return result.status === 200;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw Error(
        e.response?.data.message ||
          'Operation failed, please check you internet connection and try again'
      );
    } else {
      throw Error('An error occurred, please try again');
    }
  }
};
