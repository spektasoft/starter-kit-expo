import axios from 'axios';
import { Platform } from 'react-native';

import { getAxios, getStrategy } from './utils';

export type User = {
  email_verified_at?: Date;
};

export const user = async (token?: string): Promise<User | undefined> => {
  if (Platform.OS !== 'web' && !token) {
    return undefined;
  }

  try {
    const http = await getAxios(token);
    const strategy = getStrategy();

    const route = strategy === 'spa' ? 'user' : 'api/v1/user';

    const result = await http.get<User>(route);

    return result.data;
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
