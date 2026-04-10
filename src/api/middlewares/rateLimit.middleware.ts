import rateLimit from "express-rate-limit";
import { env } from "@config/env.config.js";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.NODE_ENV === "production" ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
});