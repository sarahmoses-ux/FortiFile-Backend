import { env } from "../../config/env";
import { ApiError } from "../../utils/api-error";
import { MockMetadataProvider } from "./mock-metadata.provider";
import { MockNftProvider } from "./mock-nft.provider";
import { MockWalletProvider } from "./mock-wallet.provider";
import { MetadataProvider, MetadataUploadInput } from "./metadata.provider";
import { MintTokenInput, NftProvider } from "./nft.provider";
import { WalletProvider, WalletProvisionInput } from "./wallet.provider";

class ExternalWalletProvider implements WalletProvider {
  async provisionWallet(_input: WalletProvisionInput) {
    throw new ApiError(501, "External wallet provider is not implemented yet");
  }
}

class ExternalMetadataProvider implements MetadataProvider {
  async uploadDocumentMetadata(_input: MetadataUploadInput) {
    throw new ApiError(501, "External metadata provider is not implemented yet");
  }
}

class ExternalNftProvider implements NftProvider {
  async mintToken(_input: MintTokenInput) {
    throw new ApiError(501, "External NFT provider is not implemented yet");
  }

  async getTokensByWallet(_walletAddress: string) {
    throw new ApiError(501, "External NFT provider is not implemented yet");
  }
}

const mockWalletProvider = new MockWalletProvider();
const mockMetadataProvider = new MockMetadataProvider();
const mockNftProvider = new MockNftProvider();

const externalWalletProvider = new ExternalWalletProvider();
const externalMetadataProvider = new ExternalMetadataProvider();
const externalNftProvider = new ExternalNftProvider();

export const walletProvider = env.PROVIDER_MODE === "external" ? externalWalletProvider : mockWalletProvider;
export const metadataProvider =
  env.PROVIDER_MODE === "external" ? externalMetadataProvider : mockMetadataProvider;
export const nftProvider = env.PROVIDER_MODE === "external" ? externalNftProvider : mockNftProvider;
