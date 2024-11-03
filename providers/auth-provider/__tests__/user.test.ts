import { user } from '../user';

import { actingAsDefaultUser } from '~/tests/authentication';

describe('User', () => {
  test('should success', async () => {
    await actingAsDefaultUser();

    const result = await user();
    expect(result).not.toBeNull();
  });

  test('should fail', async () => {
    await expect(user()).rejects.toThrow();
  });
});
