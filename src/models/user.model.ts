import { HydratedDocument, Model, Schema, model } from "mongoose";

export interface User {
  fullname?: string;
  email: string;
  password?: string;
  privyUser: object;
  walletAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<User>;
export type UserModelType = Model<User>;

const userSchema = new Schema<User>(
  {
    fullname: {
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
    privyUser: {
      type: Object,
      required: true,
      unique: true
    },
    walletAddress: {
      type: String,
      required: true,
      unique: true
    },
  },
  {
    timestamps: true
  }
);

export const UserModel = model<User, UserModelType>("User", userSchema);
