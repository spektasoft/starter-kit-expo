import { Platform } from 'react-native';

import { getLoginIdKey, getTokenKey } from '~/config';
import { TwoFactorChallengeError } from '~/errors/TwoFactorChallengeError';
import { getDeviceName } from '~/lib/device';
import { getHttp } from '~/lib/http';
import { setItemAsync } from '~/lib/store';

export type LoginParams = {
  email: string;
  password: string;
};

export const login = async (params: LoginParams): Promise<void> => {
  const deviceName = getDeviceName();
  const http = await getHttp();

  const route = Platform.OS === 'web' ? 'login' : 'api/v1/login';

  const response = await http.post(route, {
    email: params.email,
    password: params.password,
    ...(Platform.OS !== 'web' && { device_name: deviceName }),
  });

  const loginId = response.data['login_id'];
  const twoFactor = response.data['two_factor'];

  if (loginId || twoFactor) {
    if (Platform.OS !== 'web') {
      await setItemAsync(getLoginIdKey(), loginId);
    }
    throw new TwoFactorChallengeError();
  }

  await setItemAsync(getTokenKey(), response.data['token']);
};
