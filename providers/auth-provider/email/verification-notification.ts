import { Platform } from 'react-native';

import { getHttp, isSuccess } from '~/lib/http';

export const emailVerificationNotification = async (): Promise<boolean> => {
  const http = await getHttp();

  const route =
    Platform.OS === 'web'
      ? 'email/verification-notification'
      : 'api/v1/email/verification-notification';

  const result = await http.post(route);

  return isSuccess(result);
};
