export interface MetadataAttribute {
  trait_type: string;
  value: string;
}

export interface MetadataUploadInput {
  walletAddress: string;
  documentId: string;
  title: string;
  description?: string;
  documentHash?: string;
  attributes: MetadataAttribute[];
  file?: Express.Multer.File;
}

export interface MetadataUploadResult {
  uri: string;
  cid: string;
}

export interface MetadataProvider {
  uploadDocumentMetadata(input: MetadataUploadInput): Promise<MetadataUploadResult>;
}
