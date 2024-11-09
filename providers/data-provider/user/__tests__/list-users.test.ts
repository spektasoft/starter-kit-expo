import { listUsers } from '../list-users';

import { logout } from '~/providers/auth-provider/logout';
import { actingAsDefaultUser } from '~/tests/authentication';

describe('List users', () => {
  test('should success', async () => {
    await actingAsDefaultUser();

    const response = await listUsers();
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0].name).not.toBeNull();
    expect(response.data[0].email).not.toBeNull();

    await logout();
  });
});
