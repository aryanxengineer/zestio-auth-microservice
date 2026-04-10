import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().email().trim().toLowerCase(),
  password: z.string().trim().min(8),
});

export type RegisterDTO = z.infer<typeof RegisterSchema>;