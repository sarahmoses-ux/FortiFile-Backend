import { UserModel } from "../models/user.model";
import { ApiError } from "../utils/api-error";
import { walletProvider } from "./providers";
import bcrypt from "bcryptjs";
import { CreateWallet } from "./wallet.create";

interface SignupInput {
  email: string;
  fullname: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export class AuthService {
  async signup(input: SignupInput) {
    const existingUser = await UserModel.findOne({ email: input.email.toLowerCase() });

    if (existingUser) {
      throw new ApiError(409, "A user with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(input.password, salt);

    const privy = await CreateWallet(input.email);

    const user = await UserModel.create({
      email: input.email.toLowerCase(),
      fullname: input.fullname,
      password: hashedPassword,
      privyUser: privy,
      walletAddress: privy?.wallet.address,
      userId: privy?.user.id,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.fullname,
      walletAddress: user.walletAddress,
      privyUser: user.privyUser
    };
  }


  async login(input: LoginInput) {
    const existingUser = await UserModel.findOne({ email: input.email.toLowerCase() });

    if (!existingUser) {
      throw new ApiError(404, "User not found");
    }

    if (!existingUser.password) {
      throw new ApiError(500, "User password is not set");
    }

    const isMatch = await bcrypt.compare(input.password, existingUser.password);

    if (!isMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    return {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.fullname,
      walletAddress: existingUser.walletAddress,
      privyUser: existingUser.privyUser
    };
  }
}
