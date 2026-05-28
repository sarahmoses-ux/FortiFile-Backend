import { Request, Response } from "express";

import { NftService } from "../services/nft.service";

const nftService = new NftService();

export const mintNft = async (req: Request, res: Response) => {
  const nft = await nftService.mintDocument({
    user: req.user!,
    payload: req.body
  });

  res.status(201).json({
    message: "NFT minted successfully",
    data: nft
  });
};

export const getWalletNfts = async (req: Request, res: Response) => {
  const data = await nftService.getWalletNfts(req.params.address);

  res.status(200).json({
    message: "Wallet NFTs fetched successfully",
    data
  });
};
