import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: "*", // change in production
  credentials: true,
};