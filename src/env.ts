declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URL: string;
    PORT: string;
    JWT_KEY: string;
    REFRESH_JWT_KEY: string;
  }
}
declare namespace Express {
  interface Request {
    userId: string;
    userRole: string;
  }
}
