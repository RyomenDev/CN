import express from "express";
const router = express.Router();
import { verifyToken } from "../middlewares/auth.middleware.js";

// import {
//   UserViewProfileController,
//   UserUpdateProfileController,
// } from "../controllers/user.controller.js";
// import { UserSubscription } from "../controllers/subscription.controller.js";

// router.get("/profile", verifyToken, UserViewProfileController);
// router.put("/update-profile", verifyToken, UserUpdateProfileController);
// router.put("/subscription", verifyToken, UserSubscription);

export default router;
