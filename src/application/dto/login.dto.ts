import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email().trim().lowercase(),
  password: z.string().trim().min(8),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
