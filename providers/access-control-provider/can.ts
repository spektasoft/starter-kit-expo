import { Platform } from 'react-native';

import { getHttp } from '~/lib/http';

export type CanParams = {
  permission: string;
  resource: string;
  id?: string;
};

export const can = async (params: CanParams): Promise<boolean> => {
  const http = await getHttp();

  const route = Platform.OS === 'web' ? 'user/can' : 'api/v1/user/can';

  await http.post(route, params);

  return true;
};
