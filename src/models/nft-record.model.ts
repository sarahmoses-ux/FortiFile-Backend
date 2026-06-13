import { HydratedDocument, Model, Schema, Types, model } from "mongoose";

export interface NftRecord {
  owner: Types.ObjectId;
  walletAddress: string;
  documentId: string;
  documentType: "image" | "pdf" | "docx" | "other";
  title: string;
  description?: string;
  documentHash?: string;
  metadataUri: string;
  tokenId: string;
  transactionHash: string;
  contractAddress?: string;
  status: "minted";
  attributes: Array<{ trait_type: string; value: string }>;
  createdAt: Date;
  updatedAt: Date;
}

export type NftRecordDocument = HydratedDocument<NftRecord>;
export type NftRecordModelType = Model<NftRecord>;

const nftRecordSchema = new Schema<NftRecord>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    walletAddress: {
      type: String,
      required: true,
      index: true
    },
    documentId: {
      type: String,
      required: true
    },
    documentType: {
      type: String,
      enum: ["image", "pdf", "docx", "other"],
      default: "other",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    documentHash: {
      type: String
    },
    metadataUri: {
      type: String,
      required: true
    },
    tokenId: {
      type: String,
      required: true
    },
    transactionHash: {
      type: String,
      required: true
    },
    contractAddress: {
      type: String
    },
    status: {
      type: String,
      enum: ["minted"],
      default: "minted"
    },
    attributes: {
      type: [
        {
          trait_type: { type: String, required: true },
          value: { type: String, required: true }
        }
      ],
      default: []
    }
  },
  {
    timestamps: true
  }
);

nftRecordSchema.index({ owner: 1, documentId: 1 }, { unique: true });
nftRecordSchema.index(
  { owner: 1, documentHash: 1 },
  { unique: true, partialFilterExpression: { documentHash: { $type: "string" } } }
);

export const NftRecordModel = model<NftRecord, NftRecordModelType>("NftRecord", nftRecordSchema);
