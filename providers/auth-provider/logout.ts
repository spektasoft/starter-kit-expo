import { Platform } from 'react-native';

import { getTokenKey } from '~/config';
import { getHttp, isSuccess } from '~/lib/http';
import { deleteItemAsync } from '~/lib/store';

export const logout = async (): Promise<boolean> => {
  const http = await getHttp();

  const route = Platform.OS === 'web' ? 'logout' : 'api/v1/logout';

  const result = await http.post(route);

  const status = isSuccess(result);

  if (status) {
    await deleteItemAsync(getTokenKey());
  }

  return status;
};
