import express from "express";
import { createUserHandler, loginHandler } from "./users.controller";
import { validateData } from "../../middleware/validateData";
import { createUserBodySchema, loginUserBodySchema } from "./users.schema";

const route = express.Router();

route.post("/", validateData(createUserBodySchema), createUserHandler);
route.get("/login", validateData(loginUserBodySchema), loginHandler);

export default route;
