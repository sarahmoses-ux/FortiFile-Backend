import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateBody =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const body = typeof req.body === "object" && req.body !== null ? req.body : {};
    const result = schema.safeParse(body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid upload metadata",
        details: result.error.flatten()
      });
    }

    req.body = result.data;
    next();
  };
