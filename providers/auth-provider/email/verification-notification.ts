import axios from 'axios';
import { Platform } from 'react-native';

import { getHttp, isSuccess } from '~/lib/http';

export type EmailVerificationNotificationParams = {
  type: 'email-verification-notification';
};

export const emailVerificationNotification = async (
  params: EmailVerificationNotificationParams
): Promise<boolean> => {
  try {
    const http = await getHttp();

    const route =
      Platform.OS === 'web'
        ? 'email/verification-notification'
        : 'api/v1/email/verification-notification';

    const result = await http.post(route);

    return isSuccess(result);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw Error(
        e.response?.data.message ||
          'Operation failed, please check you internet connection and try again'
      );
    } else {
      throw Error('An error occurred, please try again');
    }
  }
};
