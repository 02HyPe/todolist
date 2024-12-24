import { SessionModel } from "../../config/mongoose.models";
import mongoose from "mongoose";

export const createSession = async (
  refreshToken: string,
  session?: mongoose.mongo.ClientSession
) => {
  const createSession = new SessionModel({
    refreshToken: refreshToken,
  });
  session ? await createSession.save({ session }) : await createSession.save();
  return createSession;
};

export const getRefreshToken = async (refreshToken: string) => {
  const exists = await SessionModel.findOne({ refreshToken: refreshToken });
  if (!exists) {
    return false;
  }
  return exists;
};
