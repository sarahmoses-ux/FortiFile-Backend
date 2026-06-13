import crypto from "node:crypto";

import { MetadataProvider, MetadataUploadInput, MetadataUploadResult } from "./metadata.provider";

export class MockMetadataProvider implements MetadataProvider {
  async uploadDocumentMetadata(input: MetadataUploadInput): Promise<MetadataUploadResult> {
    const sanitizedInput = {
      ...input,
      file: input.file
        ? {
            originalname: input.file.originalname,
            mimetype: input.file.mimetype,
            size: input.file.size
          }
        : undefined
    };

    const cid = crypto.createHash("sha256").update(JSON.stringify(sanitizedInput)).digest("hex").slice(0, 46);

    return {
      cid,
      uri: `ipfs://${cid}`
    };
  }
}
