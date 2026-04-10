import { TokenService } from "@application/services/token.service";
import { UserRepository } from "@domain/repositories/user.repository.js";
import { ApiError } from "@shared/errors/api.error.js";

export class SetUserRoleUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
  ) {}

  async execute(userId: string, role: string) {
    const user = await this.userRepository.findByIdAndUpdate(userId, role);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    if (!user.role) {
      throw new ApiError("User role creation failed", 500);
    }

    const tokens = this.tokenService.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      role: user.role,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
