export class LoginIdUnavailableError extends Error {
  constructor() {
    super();
    this.name = LoginIdUnavailableError.name;
  }
}
