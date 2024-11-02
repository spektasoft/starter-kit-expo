import axios from 'axios';
import { Platform } from 'react-native';

import { getAxios, getDeviceName } from '../utils';

export type TwoFactorChallengeParams = {
  type: 'two-factor-challenge';
  code: string;
  recoveryCode: string;
};

export type TwoFactorChallengeResponse = {
  token?: string;
};

export const twoFactorChallenge = async (
  params: TwoFactorChallengeParams,
  email?: string
): Promise<TwoFactorChallengeResponse> => {
  try {
    const deviceName = getDeviceName();
    const http = await getAxios();

    const route = Platform.OS === 'web' ? 'two-factor-challenge' : 'api/v1/two-factor-challenge';

    const result = await http.post(route, {
      code: params.code,
      recovery_code: params.recoveryCode,
      ...(Platform.OS !== 'web' && { email, device_name: deviceName }),
    });

    if (Platform.OS !== 'web') {
      return { token: result.data['token'] };
    }

    return {};
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw Error(
        e.response?.data.message ||
          'Login failed, please check you internet connection and try again'
      );
    } else {
      throw Error('An error occurred, please try again');
    }
  }
};
