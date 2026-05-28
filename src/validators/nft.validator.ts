import { z } from "zod";

export const mintNftSchema = z.object({
  documentId: z.string().trim().min(1).max(120),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(1000).optional(),
  documentHash: z.string().trim().max(255).optional(),
  attributes: z
    .array(
      z.object({
        trait_type: z.string().trim().min(1).max(100),
        value: z.string().trim().min(1).max(255)
      })
    )
    .max(20)
    .optional()
});
