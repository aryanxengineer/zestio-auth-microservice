import winston from "winston";
import { env } from "@config/env.config.js";

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return stack
    ? `${timestamp} [${level}]: ${message} - ${stack}`
    : `${timestamp} [${level}]: ${message}`;
});

const baseFormat = combine(timestamp(), errors({ stack: true }));
const devFormat = combine(colorize(), baseFormat, logFormat);
const prodFormat = combine(baseFormat, winston.format.json());

export const logger = winston.createLogger({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  format: env.NODE_ENV === "production" ? prodFormat : devFormat,
  transports: [new winston.transports.Console()],
});
