import express from "express";
import { createUserHandler, loginHandler } from "./users.controller";

const route = express.Router();

route.post("/", createUserHandler);
route.get("/login", loginHandler);

export default route;
