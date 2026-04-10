import { z } from "zod";

export const UserIdSchema = z.object({
  id: z.string().trim().min(1),
});

export type UserIdDTO = z.infer<typeof UserIdSchema>;