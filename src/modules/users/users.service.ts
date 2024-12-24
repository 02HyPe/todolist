import { UserModel } from "../../config/mongoose.models";
import { User } from "./users.model";
import mongoose from "mongoose";

export const getUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email: email });
  if (user) {
    return true;
  }
  return false;
};

export const createUser = async (
  userName: string,
  email: string,
  password: string,
  session?: mongoose.mongo.ClientSession
) => {
  const user = new UserModel<User>({
    userName: userName,
    email: email,
    password: password,
    userRole: "user",
  });
  session ? await user.save({ session }) : await user.save();
  return user;
};

export const getUserByUserName = async (userName: string) => {
  const user = await UserModel.findOne({ userName: userName });
  return user;
};
