import crypto from "node:crypto";

import { WalletProvider, WalletProvisionInput, WalletProvisionResult } from "./wallet.provider";

export class MockWalletProvider implements WalletProvider {
  async provisionWallet(_input: WalletProvisionInput): Promise<WalletProvisionResult> {
    const seed = crypto.randomBytes(20).toString("hex");

    return {
      providerUserId: `mock-user-${crypto.randomUUID()}`,
      walletAddress: `0x${seed}`,
      provider: "mock"
    };
  }
}
