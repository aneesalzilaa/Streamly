import express from "express";
import { protectRoute } from "../Middleware/authmiddleware.js";
import { getStreamToken } from "../controller/chatcontroller.js";

const router = express.Router();

router.get("/token", protectRoute, getStreamToken);

export default router;