import { Platform } from 'react-native';

import { getHttp } from '~/lib/http';

export type UpdateUserParams = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
};

export const updateUser = async (params: UpdateUserParams): Promise<void> => {
  const http = await getHttp();
  const route = Platform.OS === 'web' ? `users/${params.id}` : `api/v1/users/${params.id}`;
  const response = await http.put(route, params);
  return response.data;
};
