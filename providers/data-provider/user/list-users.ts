import { Platform } from 'react-native';

import { getHttp } from '~/lib/http';
import { User } from '~/models/User';
import { ListResponse } from '~/types/list-response';

export type ListUsersResponse = ListResponse<User>;

export const listUsers = async (): Promise<ListUsersResponse> => {
  const http = await getHttp();
  const route = Platform.OS === 'web' ? 'users' : 'api/v1/users';
  const response = await http.get<ListUsersResponse>(route);
  return response.data;
};
