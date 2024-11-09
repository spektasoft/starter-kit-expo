import { listUsers } from '../list-users';
import { showUser } from '../show-user';

import { logout } from '~/providers/auth-provider/logout';
import { actingAsDefaultUser } from '~/tests/authentication';

describe('Show user', () => {
  test('should success', async () => {
    await actingAsDefaultUser();

    const response = await listUsers();
    const user = response.data[0];
    if (!user) {
      throw new Error('User is undefined');
    }

    const fetchedUser = await showUser({
      id: user.id,
    });

    expect(fetchedUser.email).toEqual(user.email);

    await logout();
  });
});
