export interface WalletProvisionInput {
  email: string;
  name?: string;
}

export interface WalletProvisionResult {
  providerUserId: string;
  walletAddress: string;
  provider: "mock" | "privy";
}

export interface WalletProvider {
  provisionWallet(input: WalletProvisionInput): Promise<WalletProvisionResult>;
}
