import { PasswordService } from "@application/services/password.service.js";
import { UserRepository } from "@domain/repositories/user.repository.js";
import { generateId } from "@shared/utils/generateId.js";
import { ApiError } from "@shared/errors/api.error.js";
import { User } from "@domain/entities/user.entity.js";
import { TokenService } from "@application/services/token.service";

export class RegisterUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService,
  ) {}

  async execute(name: string, email: string, password: string) {
    // 1. check existing user
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new ApiError("User already exists", 400);
    }

    // 2. hash password
    const hashedPassword = await this.passwordService.hashPassword(password);

    // 3. create entity
    const user = User.create({
      id: generateId(),
      name,
      email,
      password: hashedPassword,
    });

    // 4. save user
    const savedUser = await this.userRepo.create(user);

    const tokens = this.tokenService.generateTokens({
      userId: savedUser.id,
      email: savedUser.email,
    });

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
