import mongoose from "mongoose";

export interface User {
  userName: string;
  email: string;
  password: string;
  userRole: string;
}

export const UserSchema = new mongoose.Schema<User>({
  userName: { type: String, unique: true, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  userRole: { type: String, require: true, enum: ["Admin", "user"] },
});
