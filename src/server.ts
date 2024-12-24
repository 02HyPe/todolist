import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./modules/users/users.routes";
import listRoutes from "./modules/list/list.routes";
import { errorHandler } from "./util/errorHandler";

const app = express();

app.use(express.json());
app.use(cookieParser());

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();

app.use("/user", userRoutes);
app.use("/list", listRoutes);

app.use(errorHandler);
