export class EmailUnavailableError extends Error {
  constructor() {
    super();
    this.name = EmailUnavailableError.name;
  }
}
