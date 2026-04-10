import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@infrastructure/auth/jwt/jwt.provider.js";

import { AuthError } from "@shared/errors/auth.error.js";

type UserTokenPayload = {
  userId: string;
  email: string;
  role?: string;
};

export class TokenService {
  generateTokens(payload: UserTokenPayload) {
    const accessToken = signAccessToken({
      sub: payload.userId,
      email: payload.email,
      ...(payload.role && { role: payload.role }),
    });

    const refreshToken = signRefreshToken({
      sub: payload.userId,
      email: payload.email,
      ...(payload.role && { role: payload.role }),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  verifyRefreshToken(token: string) {
    const decoded = verifyRefreshToken(token);

    if (decoded.type !== "refresh") {
      throw new AuthError("Invalid token type");
    }

    return {
      userId: decoded.sub as string,
      email: decoded.email as string,
    };
  }
}
