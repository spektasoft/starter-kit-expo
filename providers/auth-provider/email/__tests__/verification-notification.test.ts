import { emailVerificationNotification } from '../verification-notification';

import { actingAsDefaultUser } from '~/tests/authentication';

describe('Email verification notification', () => {
  test('should success', async () => {
    await actingAsDefaultUser();
    await expect(emailVerificationNotification()).resolves.not.toThrow();
  });

  test('should fail', async () => {
    await expect(emailVerificationNotification()).rejects.toThrow();
  });
});
