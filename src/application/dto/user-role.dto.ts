import { z } from "zod";

export const userRoleSchema = z.object({
  role: z.enum(["customer", "seller", "rider"]),
});

export type UserRoleDTO = z.infer<typeof userRoleSchema>;
