import { UserRepository } from "@domain/repositories/user.repository.js";
import { User } from "@domain/entities/user.entity.js";
import { UserModel } from "@infrastructure/database/models/user.model.js";

export class MongoUserRepository implements UserRepository {
  private toDomain(user: any): User {
    return new User(
      user._id.toString(),
      user.name,
      user.email,
      user.password,
      user.role,
      user.isVerified,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).select(
      "email password isVerified",
    );

    if (!user) return null;

    return this.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id).select(
      "email password isVerified",
    );

    if (!user) return null;

    return this.toDomain(user);
  }

  async create(user: User): Promise<User> {
    const newUser = await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return this.toDomain(newUser);
  }

  async findByIdAndUpdate(userId: string, role: string): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { role } },
      { returnDocument: "after" },
    );

    if (!updatedUser) return null;

    return this.toDomain(updatedUser);
  }
}
