import { Platform } from 'react-native';

import { getDeviceName, getLoginId } from '../utils';

import { getTokenKey } from '~/config';
import { EmailUnavailableError } from '~/errors/EmailUnavailableError';
import { getHttp } from '~/lib/http';
import { deleteItemAsync, getItemAsync, setItemAsync } from '~/lib/store';

export type TwoFactorChallengeParams = {
  code: string;
  recoveryCode: string;
};

export const twoFactorChallenge = async (params: TwoFactorChallengeParams): Promise<void> => {
  const deviceName = getDeviceName();
  const http = await getHttp();
  const loginId = getLoginId();
  const route = Platform.OS === 'web' ? 'two-factor-challenge' : 'api/v1/two-factor-challenge';

  let email;

  if (Platform.OS !== 'web') {
    email = (await getItemAsync(loginId)) ?? undefined;

    if (!email) {
      throw new EmailUnavailableError();
    }
  }

  const response = await http.post(route, {
    code: params.code,
    recovery_code: params.recoveryCode,
    ...(Platform.OS !== 'web' && { email, device_name: deviceName }),
  });

  await setItemAsync(getTokenKey(), response.data['token']);
  await deleteItemAsync(loginId);
};
