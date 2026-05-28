import { Request, Response } from "express";

import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export const signup = async (req: Request, res: Response) => {
  const user = await authService.signup(req.body);

  res.status(201).json({
    message: "User created successfully",
    data: user
  });
};
