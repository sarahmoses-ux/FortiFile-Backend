import { HydratedDocument, Model, Schema, model } from "mongoose";

export interface User {
  name?: string;
  email: string;
  providerUserId: string;
  walletAddress: string;
  provider: "mock" | "privy";
  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<User>;
export type UserModelType = Model<User>;

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    providerUserId: {
      type: String,
      required: true,
      unique: true
    },
    walletAddress: {
      type: String,
      required: true,
      unique: true
    },
    provider: {
      type: String,
      enum: ["mock", "privy"],
      default: "mock"
    }
  },
  {
    timestamps: true
  }
);

export const UserModel = model<User, UserModelType>("User", userSchema);
