import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { InterviewScheduler } from "../controllers/interview.controller.js";
import { getAllInterviews } from "../controllers/interview.controller.js";
import { getUserInterviews } from "../controllers/student.controller.js";

const router = express.Router();

// Protected Route - Login Route
router.get("/scheduled", verifyToken, getUserInterviews);
router.get("/interviews", verifyToken, getAllInterviews);

export default router;
