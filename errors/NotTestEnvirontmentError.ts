export class NotTestEnvirontmentError extends Error {
  constructor() {
    super();
    this.name = NotTestEnvirontmentError.name;
  }
}
