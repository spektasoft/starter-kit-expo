import { getItemAsync } from 'expo-secure-store';
import { authenticator } from 'otplib';

import { logout } from '../logout';
import { twoFactorChallenge } from '../two-factor-challenge';

import { getLoginIdKey, getTestAccount2faSecret } from '~/config';
import { TwoFactorChallengeError } from '~/errors/TwoFactorChallengeError';
import { actingAsDefaultUser } from '~/tests/authentication';

describe('Two factor challenge', () => {
  test('should return two factor status', async () => {
    await expect(actingAsDefaultUser()).rejects.toThrow(TwoFactorChallengeError);
    const loginId = getItemAsync(getLoginIdKey());
    expect(loginId).not.toBeNull();
  });

  test('should fail on wrong code', async () => {
    await expect(actingAsDefaultUser()).rejects.toThrow(TwoFactorChallengeError);
    await expect(
      twoFactorChallenge({
        code: 'wrong-code',
        recoveryCode: '',
      })
    ).rejects.toThrow();
  });

  test('should fail on wrong recovery code', async () => {
    await expect(actingAsDefaultUser()).rejects.toThrow(TwoFactorChallengeError);
    await expect(
      twoFactorChallenge({
        code: '',
        recoveryCode: 'wrong-code',
      })
    ).rejects.toThrow();
  });

  test('should success on correct code', async () => {
    await expect(actingAsDefaultUser()).rejects.toThrow(TwoFactorChallengeError);
    const code = authenticator.generate(getTestAccount2faSecret());

    await expect(
      twoFactorChallenge({
        code,
        recoveryCode: '',
      })
    ).resolves.not.toThrow();

    await logout();
  });
});
