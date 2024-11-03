import { login, LoginParams } from '../login';

import { getTestAccountEmail, getTestAccountPassword } from '~/config';

describe('Login', () => {
  test('should success', async () => {
    const params: LoginParams = {
      email: getTestAccountEmail(),
      password: getTestAccountPassword(),
    };
    await expect(login(params)).resolves.not.toThrow();
  });

  test('should fail', async () => {
    const params: LoginParams = {
      email: getTestAccountEmail(),
      password: 'wrong-password',
    };
    await expect(login(params)).rejects.toThrow();
  });
});
