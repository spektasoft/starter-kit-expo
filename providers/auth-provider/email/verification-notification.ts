import axios from 'axios';

import { getAxios, getStrategy, isSuccess } from '../../utils';

export type EmailVerificationNotificationParams = {
  type: 'email-verification-notification';
  token?: string;
};

export const emailVerificationNotification = async (
  params: EmailVerificationNotificationParams
): Promise<boolean> => {
  try {
    const http = await getAxios(params.token);
    const strategy = getStrategy();

    const route =
      strategy === 'spa'
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
