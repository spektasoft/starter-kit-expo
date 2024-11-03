export class UnimplementedError extends Error {
  constructor() {
    super();
    this.name = UnimplementedError.name;
  }
}
