import { asyncHandler } from "../../util/async_wrapper";
import { Request, Response, NextFunction } from "express";
import { getRefreshToken } from "./session.service";
import { accessTokenGen } from "util/tokenGenerator";
import { verify, JwtPayload } from "jsonwebtoken";
import { ErrorResponse } from "util/errorHandler";

export const refreshAccessTokenhandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    const token = await getRefreshToken(refreshToken);
    if (!token) {
      throw next(new ErrorResponse(401, "login needed"));
    }
    const decoded = verify(
      refreshToken,
      process.env.REFRESH_JWT_KEY
    ) as JwtPayload;

    const accessToken = accessTokenGen(decoded.userId, decoded.userRole);
    res
      .cookie("accessToken", `Bearer ${accessToken}`)
      .json({ msg: "refreshed" });
  }
);
