import { getTestAccountEmail, getTestAccountPassword } from '~/config';
import { login, LoginParams } from '~/providers/auth-provider/login';

export const actingAs = async (params: LoginParams) => {
  await login(params);
};

export const actingAsDefaultUser = async () => {
  const params: LoginParams = {
    email: getTestAccountEmail(),
    password: getTestAccountPassword(),
  };

  await login(params);
};
