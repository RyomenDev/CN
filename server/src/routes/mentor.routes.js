import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

import {
  getAllInterviews,
  changeInterviewStatus,
} from "../controllers/mentor.controller.js";

router.get("/getAllInterviews", verifyToken, getAllInterviews);
router.patch("/interview-statusChange", verifyToken, changeInterviewStatus);

export default router;
