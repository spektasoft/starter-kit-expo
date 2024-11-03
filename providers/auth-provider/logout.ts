import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { getTokenKey } from '~/config';
import { getHttp, isSuccess } from '~/lib/http';

export const logout = async (): Promise<boolean> => {
  try {
    const http = await getHttp();

    const route = Platform.OS === 'web' ? 'logout' : 'api/v1/logout';

    const result = await http.post(route);

    const status = isSuccess(result);

    if (Platform.OS !== 'web' && status) {
      await SecureStore.deleteItemAsync(getTokenKey());
    }

    return status;
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
