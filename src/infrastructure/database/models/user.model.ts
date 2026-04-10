import mongoose, { Document, Model } from "mongoose";

type UserRoleType = "customer" | "seller" | "rider";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: UserRoleType;
  isVerified: boolean;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: { type: String, trim: true, min: 2, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: null },
    avatar: { type: String, trim: true, unique: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema,
);
