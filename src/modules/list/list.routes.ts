import express from "express";
import { createListHandler, getTaskHandler } from "./list.controller";
import { auth } from "../../middleware/auth";
import { validateData } from "../../middleware/validateData";
import { createListSchema, paginateListSchema } from "./list.schema";

const route = express.Router();

route.post("/", auth, validateData(createListSchema), createListHandler);
route.get("/tasks", auth, validateData(paginateListSchema), getTaskHandler);

export default route;
