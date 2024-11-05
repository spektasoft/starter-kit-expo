import { createUser } from '../create-user';
import { deleteUser } from '../delete-user';
import { listUsers } from '../list-users';

import { User } from '~/models/User';
import { logout } from '~/providers/auth-provider/logout';
import { actingAsDefaultUser } from '~/tests/authentication';

describe('User', () => {
  test('should success creating, listing, and deleting', async () => {
    await actingAsDefaultUser();
    const newUser: User = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      created_at: '',
    };
    await createUser({ user: newUser });

    const response = await listUsers();
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0].name).not.toBeNull();
    expect(response.data[0].email).not.toBeNull();
    const user = response.data.find((user) => user.email === newUser.email);
    if (!user) {
      throw new Error('Id is undefined');
    }

    await deleteUser({ id: user.id });

    await logout();
  });
});
