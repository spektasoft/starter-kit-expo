import { createUser, CreateUserParams } from '../create-user';
import { deleteUser } from '../delete-user';
import { listUsers } from '../list-users';
import { updateUser, UpdateUserParams } from '../update-user';

import { logout } from '~/providers/auth-provider/logout';
import { actingAsDefaultUser } from '~/tests/authentication';

describe('Update user', () => {
  test('should success creating, updating, and deleting', async () => {
    await actingAsDefaultUser();
    const createParams: CreateUserParams = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    };
    await createUser(createParams);

    const response = await listUsers();
    const user = response.data.find((user) => user.email === createParams.email);
    if (!user) {
      throw new Error('Id is undefined');
    }

    const updateParams: UpdateUserParams = {
      id: user.id,
      name: 'Edit Test User',
      email: 'testedit@example.com',
    };

    await updateUser(updateParams);

    const updateResponse = await listUsers();
    const updatedUser = updateResponse.data.find((user) => user.email === updateParams.email);
    if (!updatedUser) {
      throw new Error('Id is undefined');
    }

    expect(updatedUser.id).toEqual(user.id);
    expect(updatedUser.name).toEqual('Edit Test User');
    expect(updatedUser.email).toEqual('testedit@example.com');

    await deleteUser({ id: user.id });

    await logout();
  });
});
