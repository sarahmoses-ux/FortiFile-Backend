import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export const signup = async (req: Request, res: Response) => {
  const user = await authService.signup(req.body);

  if (!user.success) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  res.status(201).json({
    message: "User created successfully",
    data: user,
  });
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await authService.login(req.body);

    if (!user.success) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // const { email } = req.body;
    // const otp = generateOtp();

    // await OTP.deleteMany({ email });
    // await OTP.create({
    //   email,
    //   otp,
    //   expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    // });

    // await sendEmail(
    //   email,
    //   "Login OTP Code",
    //   `
    //    <div style="font-family: Arial;">
    //      <h2>OTP Verification</h2>
    //      <p>Your OTP code is:</p>
    //      <h1>${otp}</h1>
    //      <p>This OTP expires in 5 minutes.</p>
    //    </div>
    //  `
    // );

    return res.status(200).json({
      message: "User logged in successfully",
      data: user,
      otpSent: true,
    });

  } catch (error: any) {
    return res.status(500).json({
      message: "An error occurred during login",
      error: error?.message ?? "Unknown error",
    });
  }
};
