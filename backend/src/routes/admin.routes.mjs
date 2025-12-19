import { Router } from "express";
import {
  handleAdminLogin,
  handleAdminMe,
  handleDeleteJobApplication,
  handleListJobApplications,
  handleAdminSignup,
  handleAdminChangePassword,
} from "../controllers/admin.controller.mjs";
import { requireAdmin } from "../middleware/auth.middleware.mjs";

const router = Router();

// Auth routes
router.post("/api/admin/signup", handleAdminSignup);
router.post("/api/admin/login", handleAdminLogin);

// Protected routes
router.get("/api/admin/me", requireAdmin, handleAdminMe);
router.post(
  "/api/admin/change-password",
  requireAdmin,
  handleAdminChangePassword
);

// Job applications
router.get(
  "/api/admin/job-applications",
  requireAdmin,
  handleListJobApplications
);
router.delete(
  "/api/admin/job-applications/:id",
  requireAdmin,
  handleDeleteJobApplication
);

export default router;
