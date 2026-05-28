import { Router } from "express";

import { getWalletNfts, mintNft } from "../controllers/nft.controller";
import { authenticateUser } from "../middleware/authenticate";
import { mintRateLimiter } from "../middleware/rate-limit";
import { validateBody } from "../middleware/validate";
import { asyncHandler } from "../utils/async-handler";
import { mintNftSchema } from "../validators/nft.validator";

export const nftRouter = Router();

nftRouter.post("/mint", mintRateLimiter, authenticateUser, validateBody(mintNftSchema), asyncHandler(mintNft));
nftRouter.get("/wallet/:address", asyncHandler(getWalletNfts));
