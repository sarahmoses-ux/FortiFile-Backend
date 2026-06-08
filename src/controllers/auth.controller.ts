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

export const login = async (req: Request, res: Response) => {
  const user = await authService.login(req.body);
  res.status(200).json({
    message: "User logged in successfully",
    data: user
  });
};
