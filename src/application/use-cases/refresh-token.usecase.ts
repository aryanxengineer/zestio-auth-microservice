import { TokenService } from "@application/services/token.service";

export class RefreshTokenUseCase {
  constructor(private tokenService: TokenService) {}

  async execute(refreshToken: string) {

    const validUser = this.tokenService.verifyRefreshToken(refreshToken);


    const tokens = this.tokenService.generateTokens({
      userId: validUser.userId,
      email: validUser.email,
    });

    return {
      id: validUser.userId,
      email: validUser.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
