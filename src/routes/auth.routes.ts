import { Router } from "express";

import { signup } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/async-handler";
import { validateBody } from "../middleware/validate";
import { signupSchema } from "../validators/auth.validator";

export const authRouter = Router();

authRouter.post("/signup", validateBody(signupSchema), asyncHandler(signup));