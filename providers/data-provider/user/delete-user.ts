import { Platform } from 'react-native';

import { getHttp } from '~/lib/http';
import { User } from '~/models/User';

export type DeleteUserParams = {
  id: string;
};

export const deleteUser = async (params: DeleteUserParams): Promise<void> => {
  const http = await getHttp();
  const route = Platform.OS === 'web' ? `users/${params.id}` : `api/v1/users/${params.id}`;
  await http.delete<User>(route);
};
