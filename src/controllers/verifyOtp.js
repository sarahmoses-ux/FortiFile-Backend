import httpStatus from "http-status";
import User from "../models/user.model.ts";
import OTP from "../models/otp.js";

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1. Find OTP record
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Invalid OTP",
      });
    }

    // 2. Check expiration
    if (otpRecord.expiresAt < new Date()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "OTP expired",
      });
    }

    // 3. Find user
    const user = await User.findOne({ email });

    // 4. Generate JWT
    // const accessToken = jwt.sign(
    //   {
    //     id: user._id,
    //     email: user.email,
    //     role: user.role,
    //   },
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: process.env.JWT_EXPIRES_IN,
    //   },
    // );

    // 5. Delete OTP after successful verification
    await OTP.deleteMany({ email });

    // 6. Response
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "OTP verified successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
