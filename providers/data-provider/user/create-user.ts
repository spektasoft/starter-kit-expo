import { Platform } from 'react-native';

import { getHttp } from '~/lib/http';
import { User } from '~/models/User';

export type CreateUserParams = {
  user: User;
};

export const createUser = async (params: CreateUserParams): Promise<void> => {
  const http = await getHttp();
  const route = Platform.OS === 'web' ? 'users' : 'api/v1/users';
  const response = await http.post(route, params.user);
  return response.data;
};
