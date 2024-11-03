import { Platform } from 'react-native';

import { getHttp } from '~/lib/http';
import { User } from '~/models/User';

export const user = async (): Promise<User> => {
  const http = await getHttp();

  const route = Platform.OS === 'web' ? 'user' : 'api/v1/user';

  const result = await http.get<User>(route);

  return result.data;
};
