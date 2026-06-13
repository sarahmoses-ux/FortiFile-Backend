import { Request, Response } from "express";

import { ApiError } from "../utils/api-error";
import { NftService } from "../services/nft.service";
import { AnalyticsService } from "../services/analytics";

const nftService = new NftService();
const analyticsService = new AnalyticsService();

const buildMetadataAttributes = (body: Record<string, any>) => {
  const attributes = [...(Array.isArray(body.attributes) ? body.attributes : [])];

  if (body.docType) {
    attributes.push({ trait_type: "docType", value: String(body.docType) });
  }

  if (body.institution) {
    attributes.push({ trait_type: "institution", value: String(body.institution) });
  }

  if (body.fileCategory) {
    attributes.push({ trait_type: "fileCategory", value: String(body.fileCategory) });
  }

  if (body.thumbnail) {
    attributes.push({ trait_type: "thumbnail", value: String(body.thumbnail) });
  }

  if (body.thumbnailDataUri) {
    attributes.push({ trait_type: "thumbnailDataUri", value: String(body.thumbnailDataUri) });
  }

  return attributes;
};

export const mintNft = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ApiError(400, "Missing uploaded document file. Please include a multipart/form-data file field named 'file'.");
  }

  const body = (req.body ?? {}) as Record<string, any>;
  const normalizedPayload = {
    documentId: body.documentId || body.docId || `doc-${Date.now()}`,
    title: body.title || body.docName || "Untitled document",
    description: body.description || (body.institution ? `Institution: ${body.institution}` : undefined),
    documentHash: body.documentHash,
    attributes: buildMetadataAttributes(body),
    ...body
  };

  const nft = await nftService.mintDocument({
    user: req.user!,
    payload: normalizedPayload,
    file: req.file
  });

  res.status(201).json({
    message: "NFT minted successfully",
    data: nft
  });
};

export const getUserAnalytics = async (req: Request, res: Response) => {
  const data = await analyticsService.getUserAnalytics(req.user!);

  res.status(200).json({
    message: "User analytics fetched successfully",
    data
  });
};

export const getWalletNfts = async (req: Request, res: Response) => {
  const data = await nftService.getWalletNfts(req.params.address);

  res.status(200).json({
    message: "Wallet NFTs fetched successfully",
    data
  });
};
