export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role?: string,
    public avatar?: string,
    public isVerified: boolean = false,
    public createdAt: Date = new Date(),
  ) {}

  static create(data: {
    id: string;
    name: string;
    email: string;
    password: string;
  }) {
    if (!data.name) {
      throw new Error("Name is required");
    }

    if (!data.email) {
      throw new Error("Email is required");
    }

    if (!data.password) {
      throw new Error("Password is required");
    }

    return new User(data.id, data.name, data.email, data.password);
  }
}
