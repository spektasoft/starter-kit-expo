import { can, CanParams } from '../can';

import { logout } from '~/providers/auth-provider/logout';
import { actingAsDefaultUser } from '~/tests/authentication';

describe('Can', () => {
  test('should success', async () => {
    await actingAsDefaultUser();
    const params: CanParams = {
      action: 'viewAny',
      resource: 'users',
    };
    await expect(can(params)).resolves.not.toThrow();
    await logout();
  });
});
