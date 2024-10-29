export class EmailVerificationNotificationError extends Error {
  constructor() {
    super();
    this.name = EmailVerificationNotificationError.name;
  }
}
