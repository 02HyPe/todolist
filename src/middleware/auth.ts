import { JwtPayload, verify } from "jsonwebtoken";
import { asyncHandler } from "../util/async_wrapper";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../util/errorHandler";

export const auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw next(new ErrorResponse(401, "login needed"));
    }
    const token = accessToken.split(" ")[1];
    const decoded = verify(token, process.env.JWT_KEY) as JwtPayload;
    req.userId = decoded.userId;
    req.userRole = decoded.userRole;
    next();
  }
);
