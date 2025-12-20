import { Router } from "express";
import {
  handleUserLogin,
  handleGetUserProfile,
  handleChangePassword,
  handleGoogleLogin,
} from "../controllers/login.controller.mjs";
import { requireAuth } from "../middleware/auth.middleware.mjs";

const router = Router();

// Public routes
router.post("/api/auth/login", handleUserLogin);
router.post("/api/auth/google", handleGoogleLogin);

// Protected routes
router.get("/api/auth/profile", requireAuth, handleGetUserProfile);
router.post("/api/auth/change-password", requireAuth, handleChangePassword);

export default router;
