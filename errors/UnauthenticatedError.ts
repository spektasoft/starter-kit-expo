export class UnauthenticatedError extends Error {
  constructor() {
    super();
    this.name = UnauthenticatedError.name;
  }
}
