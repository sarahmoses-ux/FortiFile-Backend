export interface MintTokenInput {
  to: string;
  metadataUri: string;
  documentId: string;
  title: string;
}

export interface MintTokenResult {
  tokenId: string;
  transactionHash: string;
  contractAddress?: string;
}

export interface WalletToken {
  tokenId: string;
  title: string;
  contractAddress?: string;
  metadataUri?: string;
}

export interface NftProvider {
  mintToken(input: MintTokenInput): Promise<MintTokenResult>;
  getTokensByWallet(walletAddress: string): Promise<WalletToken[]>;
}
