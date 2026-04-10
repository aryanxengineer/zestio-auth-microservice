import { Request, Response, NextFunction } from "express";
import { AuthError } from "@shared/errors/auth.error.js";
import { verifyAccessToken } from "@infrastructure/auth/jwt/jwt.provider.js";

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new AuthError();
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch {
    next(new AuthError("Invalid or expired token"));
  }
};
