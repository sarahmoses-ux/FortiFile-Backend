import crypto from "node:crypto";

import { MintTokenInput, MintTokenResult, NftProvider, WalletToken } from "./nft.provider";

export class MockNftProvider implements NftProvider {
  private readonly tokensByWallet = new Map<string, WalletToken[]>();

  async mintToken(input: MintTokenInput): Promise<MintTokenResult> {
    const tokenId = BigInt(`0x${crypto.randomBytes(8).toString("hex")}`).toString();
    const transactionHash = `0x${crypto.randomBytes(32).toString("hex")}`;

    const currentTokens = this.tokensByWallet.get(input.to) ?? [];
    currentTokens.push({
      tokenId,
      title: input.title,
      contractAddress: "mock-contract",
      metadataUri: input.metadataUri
    });
    this.tokensByWallet.set(input.to, currentTokens);

    return {
      tokenId,
      transactionHash,
      contractAddress: "mock-contract"
    };
  }

  async getTokensByWallet(walletAddress: string): Promise<WalletToken[]> {
    return this.tokensByWallet.get(walletAddress) ?? [];
  }
}
