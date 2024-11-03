export class InvalidTypeError extends Error {
  constructor() {
    super();
    this.name = InvalidTypeError.name;
  }
}
