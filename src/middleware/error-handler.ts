import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { ApiError } from "../utils/api-error";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const mongoError = error as Error & { code?: number };

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
      details: error.details ?? null
    });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: "Database validation failed",
      details: error.errors
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "Invalid resource identifier",
      details: error.message
    });
  }

  if (mongoError.code === 11000) {
    return res.status(409).json({
      message: "Duplicate resource detected",
      details: mongoError
    });
  }

  return res.status(500).json({
    message: "Internal server error"
  });
};
