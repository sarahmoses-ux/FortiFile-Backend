import { Types } from "mongoose";
import { NextFunction, Request, Response } from "express";

import { UserModel } from "../models/user.model";
import { ApiError } from "../utils/api-error";

export const authenticateUser = async (req: Request, _res: Response, next: NextFunction) => {
  const userId = req.header("x-user-id");

  if (!userId) {
    return next(new ApiError(401, "Missing x-user-id header"));
  }

  if (!Types.ObjectId.isValid(userId)) {
    return next(new ApiError(401, "Invalid x-user-id header"));
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    return next(new ApiError(401, "Authenticated user was not found"));
  }

  req.user = user;
  next();
};
