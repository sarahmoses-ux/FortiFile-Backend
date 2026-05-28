import crypto from "node:crypto";

import { MetadataProvider, MetadataUploadInput, MetadataUploadResult } from "./metadata.provider";

export class MockMetadataProvider implements MetadataProvider {
  async uploadDocumentMetadata(input: MetadataUploadInput): Promise<MetadataUploadResult> {
    const cid = crypto.createHash("sha256").update(JSON.stringify(input)).digest("hex").slice(0, 46);

    return {
      cid,
      uri: `ipfs://${cid}`
    };
  }
}
