import mongoose from "mongoose";

export interface Session {
  refreshToken: string;
  createdAt: Date;
}

export const SessionSchema = new mongoose.Schema<Session>({
  refreshToken: { type: String, require: true },
  createdAt: { type: Date, default: Date.now(), require: true },
});
