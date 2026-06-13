import { z } from "zod";

const metadataAttributeSchema = z.object({
  trait_type: z.string().trim().min(1).max(100),
  value: z.string().trim().min(1).max(255)
});

export const mintNftSchema = z
  .object({
    documentId: z.string().trim().min(1).max(120).optional(),
    title: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().max(1000).optional(),
    documentHash: z.string().trim().max(255).optional(),
    attributes: z.array(metadataAttributeSchema).max(20).optional(),

    docName: z.string().trim().max(200).optional(),
    institution: z.string().trim().max(200).optional(),
    docType: z.string().trim().max(100).optional(),
    docId: z.string().trim().max(120).optional(),
    fileCategory: z.string().trim().max(100).optional(),
    thumbnail: z.string().trim().max(5000).optional(),
    thumbnailDataUri: z.string().trim().max(5000).optional()
  })
  .catchall(z.any());
