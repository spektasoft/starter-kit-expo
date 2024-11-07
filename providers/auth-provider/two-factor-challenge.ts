import { Platform } from 'react-native';

import { getLoginIdKey, getTokenKey } from '~/config';
import { LoginIdUnavailableError } from '~/errors/LoginIdUnavailableError';
import { getDeviceName } from '~/lib/device';
import { getHttp } from '~/lib/http';
import { deleteItemAsync, getItemAsync, setItemAsync } from '~/lib/store';

export type TwoFactorChallengeParams = {
  code: string;
  recoveryCode: string;
};

export const twoFactorChallenge = async (params: TwoFactorChallengeParams): Promise<void> => {
  const deviceName = getDeviceName();
  const http = await getHttp();
  const loginIdKey = getLoginIdKey();
  const route = Platform.OS === 'web' ? 'two-factor-challenge' : 'api/v1/two-factor-challenge';

  let loginId;

  if (Platform.OS !== 'web') {
    loginId = (await getItemAsync(loginIdKey)) ?? undefined;

    if (!loginId) {
      throw new LoginIdUnavailableError();
    }
  }

  const response = await http.post(route, {
    code: params.code,
    recovery_code: params.recoveryCode,
    ...(Platform.OS !== 'web' && { login_id: loginId, device_name: deviceName }),
  });

  await setItemAsync(getTokenKey(), response.data['token']);
  await deleteItemAsync(loginIdKey);
};
