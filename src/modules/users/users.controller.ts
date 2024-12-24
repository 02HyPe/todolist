import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../util/async_wrapper";
import { CreateUserBodyType, LoginUserBodyType } from "./users.schema";
import { getUserByEmail, createUser, getUserByUserName } from "./users.service";
import { ErrorResponse } from "../../util/errorHandler";
import { hash, genSalt, compare } from "bcryptjs";
import { accessTokenGen, refreshTokenGen } from "../../util/tokenGenerator";
import mongoose from "mongoose";
import { createSession } from "../session/session.service";

export const createUserHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateUserBodyType>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password, userName } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
      throw next(new ErrorResponse(409, "email already exist"));
    }
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);
    let accessToken;
    let refreshToken;
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const user = await createUser(userName, email, hashedPassword, session);
      accessToken = accessTokenGen(user._id.toString(), user.userRole);
      refreshToken = refreshTokenGen(user._id.toString(), user.userRole);
      await createSession(refreshToken, session);
    });

    res
      .cookie("accessToken", `Bearer ${accessToken}`)
      .cookie("refreshToken", `Bearer ${refreshToken}`)
      .json({ msg: "user created" });
  }
);

export const loginHandler = asyncHandler(
  async (
    req: Request<{}, {}, LoginUserBodyType>,
    res: Response,
    next: NextFunction
  ) => {
    const { userName, password } = req.body;
    const user = await getUserByUserName(userName);
    if (!user) {
      throw next(new ErrorResponse(404, "invalid userName or Password"));
    }
    const match = await compare(password, user.password);
    console.log(match, password);
    if (!match) {
      throw next(new ErrorResponse(404, "invalid userName or Password"));
    }
    const accessToken = accessTokenGen(user._id.toString(), user.userRole);
    const refreshToken = refreshTokenGen(user._id.toString(), user.userRole);

    res
      .cookie("accessToken", `Bearer ${accessToken}`)
      .cookie("refreshToken", `Bearer ${refreshToken}`)
      .json({ msg: "login successfull" });
  }
);
