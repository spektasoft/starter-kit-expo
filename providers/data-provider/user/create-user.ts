import { Platform } from 'react-native';

import { getHttp } from '~/lib/http';

export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

export const createUser = async (params: CreateUserParams): Promise<void> => {
  const http = await getHttp();
  const route = Platform.OS === 'web' ? 'users' : 'api/v1/users';
  const response = await http.post(route, params);
  return response.data;
};
