export interface MetadataAttribute {
  trait_type: string;
  value: string;
}

interface UploadedFile {
  buffer?: Buffer;
  mimetype?: string;
  originalname?: string;
  size?: number;
}

export interface MetadataUploadInput {
  walletAddress: string;
  documentId: string;
  title: string;
  description?: string;
  documentHash?: string;
  attributes: MetadataAttribute[];
  file?: UploadedFile;
}

export interface MetadataUploadResult {
  uri: string;
  cid: string;
}

export interface MetadataProvider {
  uploadDocumentMetadata(input: MetadataUploadInput): Promise<MetadataUploadResult>;
}
