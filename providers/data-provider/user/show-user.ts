import { Platform } from 'react-native';

import { getHttp } from '~/lib/http';
import { User } from '~/models/User';

export type ShowUserParams = {
  id: string;
};

export const showUser = async (params: ShowUserParams): Promise<User> => {
  const http = await getHttp();
  const route = Platform.OS === 'web' ? `users/${params.id}` : `api/v1/users/${params.id}`;
  const response = await http.get<User>(route);
  return response.data;
};
