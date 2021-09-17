export class UserNotFound extends Error {
  constructor(m?: string) {
    super(m);
    this.name = "UserNotFound";
  }
}

export class UserFailedToCreate extends Error {
  constructor(m?: string) {
    super(m);
    this.name = "UserFailedToCreate";
  }
}
