import { createUser } from '../create-user';

import { User } from '~/models/User';
import { logout } from '~/providers/auth-provider/logout';
import { actingAsDefaultUser } from '~/tests/authentication';

describe('Create user', () => {
  test('should success', async () => {
    await actingAsDefaultUser();
    const newUser: User = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      created_at: '',
    };
    await expect(createUser({ user: newUser })).resolves.not.toThrow();
    await logout();
  });
});
