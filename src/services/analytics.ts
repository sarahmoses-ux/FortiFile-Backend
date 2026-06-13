import { Types } from "mongoose";

import { NftRecordModel } from "../models/nft-record.model";
import { UserModel } from "../models/user.model";
import { UserDocument } from "../models/user.model";

export interface MintHistoryItem {
  _id: string;
  documentId: string;
  title: string;
  tokenId?: string;
  documentType: string;
  transactionHash?: string;
  status: string;
  createdAt: Date;
}

export interface DocumentTypeBreakdownItem {
  documentType: string;
  count: number;
  percentage: number;
}

export interface UserAnalyticsResponse {
  ownerId: string;
  walletAddress: string;
  summary: {
    totalNftsMinted: number;
    firstMintedAt: Date | null;
    lastMintedAt: Date | null;
  };
  mintHistory: MintHistoryItem[];
  documentTypeBreakdown: DocumentTypeBreakdownItem[];
}

export class AnalyticsService {
  async getUserAnalytics(wallet: string): Promise<UserAnalyticsResponse> {
    const walletAddress = wallet;
    const user = await UserModel.findOne({ walletAddress }).lean();

    if (!user) {
      throw new Error("User not found");
    }

    const [summary, mintHistory, documentTypeBreakdown] = await Promise.all([
      NftRecordModel.aggregate([
        { $match: { walletAddress } },
        {
          $group: {
            _id: null,
            totalNftsMinted: { $sum: 1 },
            firstMintedAt: { $min: "$createdAt" },
            lastMintedAt: { $max: "$createdAt" }
          }
        },
        {
          $project: {
            _id: 0,
            totalNftsMinted: 1,
            firstMintedAt: 1,
            lastMintedAt: 1
          }
        }
      ]),
      NftRecordModel.aggregate([
        { $match: { walletAddress } },
        { $sort: { createdAt: -1 } },
        {
          $project: {
            _id: 1,
            documentId: 1,
            title: 1,
            tokenId: 1,
            documentType: { $ifNull: ["$documentType", "other"] },
            transactionHash: 1,
            status: 1,
            createdAt: 1
          }
        },
        { $limit: 10 }
      ]),
      NftRecordModel.aggregate([
        { $match: { walletAddress } },
        {
          $group: {
            _id: { $ifNull: ["$documentType", "other"] },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            documentType: "$_id",
            count: 1
          }
        },
        { $sort: { count: -1 } }
      ])
    ]);

    const summaryData = summary[0] ?? {
      totalNftsMinted: 0,
      firstMintedAt: null,
      lastMintedAt: null
    };

    const totalDocumentTypes = documentTypeBreakdown.reduce((sum, item) => sum + item.count, 0);

    return {
      ownerId: user.privyUser.user.id,
      walletAddress: user.walletAddress,
      summary: {
        totalNftsMinted: summaryData.totalNftsMinted ?? 0,
        firstMintedAt: summaryData.firstMintedAt ?? null,
        lastMintedAt: summaryData.lastMintedAt ?? null
      },
      mintHistory,
      documentTypeBreakdown: documentTypeBreakdown.map((item) => ({
        documentType: item.documentType ?? "other",
        count: item.count,
        percentage: totalDocumentTypes > 0 ? Number(((item.count / totalDocumentTypes) * 100).toFixed(1)) : 0
      }))
    };
  }
}
