import jwt from "jsonwebtoken";

export const accessTokenGen = (userId: string, userRole: string) => {
  const accessToken = jwt.sign(
    {
      userId: userId,
      userRole: userRole,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
  return accessToken;
};

export const refreshTokenGen = (userId: string, userRole: string) => {
  const refreshToken = jwt.sign(
    {
      userId: userId,
      userRole: userRole,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1d",
    }
  );
  return refreshToken;
};
