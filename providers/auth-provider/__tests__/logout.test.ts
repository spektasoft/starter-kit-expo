import { logout } from '../logout';

import { actingAsDefaultUser } from '~/tests/authentication';

describe('Logout', () => {
  test('should success', async () => {
    await actingAsDefaultUser();
    await expect(logout()).resolves.not.toThrow();
  });

  test('should fail', async () => {
    await expect(logout()).rejects.toThrow();
  });
});
