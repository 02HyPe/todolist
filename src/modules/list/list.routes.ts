import express from "express";
import { createListHandler, getTaskHandler } from "./list.controller";
import { auth } from "../../middleware/auth";

const route = express.Router();

route.post("/", auth, createListHandler);
route.get("/tasks", auth, getTaskHandler);

export default route;
