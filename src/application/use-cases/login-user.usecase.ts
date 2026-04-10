import { PasswordService } from "@application/services/password.service";
import { TokenService } from "@application/services/token.service";
import { UserRepository } from "@domain/repositories/user.repository.js";
import { ApiError } from "@shared/errors/api.error";
import { AuthError } from "@shared/errors/auth.error";

export class LoginUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService,
  ) {}

  async execute(email: string, password: string) {
    const existingUser = await this.userRepo.findByEmail(email);
    if (!existingUser) {
      throw new ApiError("User not found", 404);
    }

    const isValidPassword = await this.passwordService.comparePassword(
      password,
      existingUser.password,
    );

    if (!isValidPassword) {
      throw new AuthError("Invalid email or password");
    }

    const tokens = this.tokenService.generateTokens({
      userId: existingUser.id,
      email: existingUser.email,
    });

    return {
      id: existingUser.id,
      email: existingUser.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
