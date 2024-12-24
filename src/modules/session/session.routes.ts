import express from "express";
import { refreshAccessTokenhandler } from "./session.controller";

const route = express.Router();

route.get("/refreshtoken", refreshAccessTokenhandler);

export default route;
