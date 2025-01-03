// auth.routes.js
import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  InterviewScheduler,
  getUserInterviews,
  getAvailableTimeSlots,
} from "../controllers/student.controller.js"; // Import the loginUser controller

const router = express.Router();

// Protected Route - Login Route
router.post("/interview-schedule", verifyToken, InterviewScheduler);
router.get("/user-interviews", verifyToken, getUserInterviews);
router.get("/getAvailableTimeSlots", verifyToken, getAvailableTimeSlots);

export default router;
