import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  fullname: z.string().trim().min(2).max(100).optional(),
  password: z.string().min(6).max(100)
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100)
});
   
    