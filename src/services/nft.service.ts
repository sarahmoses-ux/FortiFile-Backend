import crypto from "node:crypto";
import { FilterQuery } from "mongoose";

import { NftRecord, NftRecordModel } from "../models/nft-record.model";
import { UserDocument } from "../models/user.model";
import { ApiError } from "../utils/api-error";
import { isValidWalletAddress } from "../utils/address";
import { metadataProvider, nftProvider } from "./providers";

interface MintPayload {
  documentId: string;
  title: string;
  description?: string;
  documentHash?: string;
  attributes?: Array<{ trait_type: string; value: string }>;
}

interface MintDocumentInput {
  user: UserDocument;
  payload: MintPayload;
  file?: Express.Multer.File;
}

export class NftService {
  async mintDocument({ user, payload, file }: MintDocumentInput) {
    const documentHash =
      payload.documentHash || (file?.buffer ? crypto.createHash("sha256").update(file.buffer).digest("hex") : undefined);

    const duplicateQuery: FilterQuery<NftRecord> = documentHash
      ? {
          owner: user._id,
          $or: [{ documentId: payload.documentId }, { documentHash }]
        }
      : {
          owner: user._id,
          documentId: payload.documentId
        };

    const duplicate = await NftRecordModel.findOne(duplicateQuery);

    if (duplicate) {
      throw new ApiError(409, "This document already has an NFT for the authenticated user");
    }

    const metadataUpload = await metadataProvider.uploadDocumentMetadata({
      walletAddress: user.walletAddress,
      documentId: payload.documentId,
      title: payload.title,
      description: payload.description,
      documentHash,
      attributes: payload.attributes ?? [],
      file
    });

    if (!metadataUpload?.uri) {
      throw new ApiError(500, "Failed to upload document metadata");
    }

    const metadataUri = metadataUpload.uri;

    const mintedToken = await nftProvider.mintToken({
      to: user.walletAddress,
      metadataUri,
      documentId: payload.documentId,
      title: payload.title
    });

    const record = await NftRecordModel.create({
      owner: user._id,
      walletAddress: user.walletAddress,
      documentId: payload.documentId,
      title: payload.title,
      description: payload.description,
      documentHash,
      metadataUri,
      tokenId: mintedToken?.tokenId,
      transactionHash: mintedToken?.transactionHash,
      contractAddress: mintedToken?.contractAddress,
      status: "minted",
      attributes: payload.attributes ?? []
    });
    return {
      id: record.id,
      documentId: record.documentId,
      tokenId: record.tokenId,
      transactionHash: record.transactionHash,
      metadataUri: record.metadataUri,
      walletAddress: record.walletAddress,
      contractAddress: record.contractAddress
    };
  }

  async getWalletNfts(walletAddress: string) {
    // if (!isValidWalletAddress(walletAddress)) {
    //   throw new ApiError(400, "Invalid wallet address");
    // }

    const [walletTokens, persistedRecords] = await Promise.all([
      nftProvider.getTokensByWallet(walletAddress),
      NftRecordModel.find({ walletAddress }).sort({ createdAt: -1 }).lean()
    ]);

    return {
      walletAddress,
      providerTokens: walletTokens,
      persistedRecords
    };
  }
}
