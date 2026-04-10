import bcrypt from "bcrypt";
import { ApiError } from "@shared/errors/api.error.js";

const DEFAULT_SALT_ROUNDS = 12;

export class PasswordService {
  private readonly saltRounds: number;

  constructor(saltRounds = DEFAULT_SALT_ROUNDS) {
    if (saltRounds < 10) {
      throw new Error("Salt rounds must be >= 10 for security");
    }
    this.saltRounds = saltRounds;
  }

  /**
   * Hash plain password
   */
  async hashPassword(plainPassword: string): Promise<string> {
    this.validatePassword(plainPassword);

    return bcrypt.hash(plainPassword, this.saltRounds);
  }

  /**
   * Compare plain password with hashed password
   */
  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    if (!plainPassword || !hashedPassword) {
      throw new ApiError("Invalid credentials", 400);
    }

    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Basic password validation (extendable)
   */
  private validatePassword(password: string) {
    if (!password || password.length < 6) {
      throw new ApiError("Password must be at least 6 characters long", 400);
    }
  }
}
