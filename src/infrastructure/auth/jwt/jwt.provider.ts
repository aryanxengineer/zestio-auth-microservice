import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "@config/env.config.js";

type TokenPayload = {
  sub: string; // userId
  role?: string;
  email?: string;
  type: "access" | "refresh";
};

export const signAccessToken = (payload: Omit<TokenPayload, "type">) => {
  return jwt.sign({ ...payload, type: "access" }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY,
  } as SignOptions);
};

export const signRefreshToken = (payload: Omit<TokenPayload, "type">) => {
  return jwt.sign({ ...payload, type: "refresh" }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRY,
  } as SignOptions);
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
};
