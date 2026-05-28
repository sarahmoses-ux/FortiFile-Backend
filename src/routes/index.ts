import { Router } from "express";

import { authRouter } from "./auth.routes";
import { nftRouter } from "./nft.routes";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/nft", nftRouter);
