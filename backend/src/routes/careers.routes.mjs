import { Router } from "express";
import {
  handleCreateApplication,
  handleCreateJob,
  handleDeleteJob,
  handleGetAllJobs,
  handleGetJobs,
  handleUpdateJob,
} from "../controllers/careers.controller.mjs";
import { requireAdmin } from "../middleware/auth.middleware.mjs";

const router = Router();

router.post("/api/careers/applications", handleCreateApplication);
router.get("/api/careers/jobs", handleGetJobs);

router.get("/api/admin/careers/jobs", requireAdmin, handleGetAllJobs);
router.post("/api/admin/careers/jobs", requireAdmin, handleCreateJob);
router.put("/api/admin/careers/jobs/:id", requireAdmin, handleUpdateJob);
router.delete("/api/admin/careers/jobs/:id", requireAdmin, handleDeleteJob);

export default router;
