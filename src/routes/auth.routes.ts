import { Router } from "express";

import { signup } from "../controllers/auth.controller";
import { login } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/async-handler";
import { validateBody } from "../middleware/validate";
import { signupSchema } from "../validators/auth.validator";
import { loginSchema } from "../validators/auth.validator"

export const authRouter = Router();

authRouter.post("/signup", validateBody(signupSchema), asyncHandler(signup));
authRouter.post("/login", validateBody(loginSchema), asyncHandler(login));