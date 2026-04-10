import { env } from "@config/env.config.js";
import { logger } from "./shared/log/logger.js";
import { connectDB } from "./config/db.config.js";
import { createApp } from "./app.js";

const startServer = async () => {
  await connectDB();

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
  });

  // Graceful shutdown
  const shutdown = (signal: string) => {
    logger.info(`${signal} received. Shutting down...`);

    server.close(() => {
      logger.info("Server closed");
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  process.on("uncaughtException", (err) => {
    logger.error(err.message, "Uncaught Exception");
    process.exit(1);
  });

  process.on("unhandledRejection", () => {
    logger.error("Unhandled Rejection");
    process.exit(1);
  });
};

startServer();
