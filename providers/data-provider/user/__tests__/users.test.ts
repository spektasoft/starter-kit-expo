import { createUser, CreateUserParams } from '../create-user';
import { deleteUser } from '../delete-user';
import { listUsers } from '../list-users';

import { logout } from '~/providers/auth-provider/logout';
import { actingAsDefaultUser } from '~/tests/authentication';

describe('User', () => {
  test('should success creating, listing, and deleting', async () => {
    await actingAsDefaultUser();
    const params: CreateUserParams = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    };
    await createUser(params);

    const response = await listUsers();
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0].name).not.toBeNull();
    expect(response.data[0].email).not.toBeNull();
    const user = response.data.find((user) => user.email === params.email);
    if (!user) {
      throw new Error('Id is undefined');
    }

    await deleteUser({ id: user.id });

    await logout();
  });
});
