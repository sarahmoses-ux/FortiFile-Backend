import { Router } from "express";
import multer from "multer";

import { getWalletNfts, mintNft } from "../controllers/nft.controller";
import { authenticateUser } from "../middleware/authenticate";
import { mintRateLimiter } from "../middleware/rate-limit";
import { validateBody } from "../middleware/validate";
import { asyncHandler } from "../utils/async-handler";
import { mintNftSchema } from "../validators/nft.validator";

const upload = multer({ storage: multer.memoryStorage(), limits: { files: 1 } });

export const nftRouter = Router();

nftRouter.post(
  "/mint",
  mintRateLimiter,
  authenticateUser,
  upload.single("file"),
  validateBody(mintNftSchema),
  asyncHandler(mintNft)
);
nftRouter.get("/wallet/:address", asyncHandler(getWalletNfts));