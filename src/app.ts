import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "@api/routes/auth.routes.js";
import usersRoutes from "@api/routes/user.routes.js";

import { errorMiddleware } from "@api/middlewares/error.middleware.js";
import { corsOptions } from "@config/cors.config.js";
import cookieParser from "cookie-parser";

export const createApp = () => {
  const app = express();

  // Security
  app.use(helmet());
  app.use(cors(corsOptions));

  // Body parsing
  app.use(cookieParser())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Routes (plug later)
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", usersRoutes);

  // Error handler (last)
  app.use(errorMiddleware);

  return app;
};