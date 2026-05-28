import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  name: z.string().trim().min(2).max(100).optional()
});
