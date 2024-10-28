import axios from 'axios';

import { getAxios, getDeviceName, getStrategy } from './utils';

export type TwoFactorChallengeParams = {
  type: 'two-factor-challenge';
  code: string;
  recoveryCode: string;
};

export type TwoFactorChallengeResponse = {
  token?: string;
};

export const twoFactorChallenge = async (
  email: string,
  params: TwoFactorChallengeParams
): Promise<TwoFactorChallengeResponse> => {
  try {
    const strategy = getStrategy();
    const deviceName = getDeviceName();
    const http = getAxios();

    if (strategy === 'spa') {
      await http.get('sanctum/csrf-cookie');
    }

    const route = strategy === 'spa' ? 'two-factor-challenge' : 'api/v1/two-factor-challenge';

    const result = await http.post(route, {
      email,
      code: params.code,
      recovery_code: params.recoveryCode,
      device_name: deviceName,
    });

    if (strategy === 'native') {
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
