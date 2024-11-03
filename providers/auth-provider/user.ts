import { getItemAsync } from 'expo-secure-store';
import { Platform } from 'react-native';

import { getTokenKey } from '~/config';
import { UnauthenticatedError } from '~/errors/UnauthenticatedError';
import { getHttp } from '~/lib/http';
import { User } from '~/models/User';

export const user = async (): Promise<User> => {
  if (Platform.OS !== 'web') {
    const token = await getItemAsync(getTokenKey());
    if (!token) {
      throw new UnauthenticatedError();
    }
  }

  const http = await getHttp();

  const route = Platform.OS === 'web' ? 'user' : 'api/v1/user';

  const result = await http.get<User>(route);

  return result.data;
};
