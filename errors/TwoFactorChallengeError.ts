export class TwoFactorChallengeError extends Error {
  constructor() {
    super();
    this.name = TwoFactorChallengeError.name;
  }
}
