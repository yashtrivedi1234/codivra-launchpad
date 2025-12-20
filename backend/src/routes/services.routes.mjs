import { Router } from "express";
import {
  handleCreateService,
  handleDeleteService,
  handleGetServices,
  handleGetAllServices,
  handleUpdateService,
} from "../controllers/services.controller.mjs";
import { requireAdmin } from "../middleware/auth.middleware.mjs";
import { uploadSingle } from "../middleware/upload.middleware.mjs";

const router = Router();

// Public: get all published services
router.get("/api/services", handleGetServices);

// Admin: get all services (including unpublished)
router.get("/api/admin/services", requireAdmin, handleGetAllServices);

// Admin: create, update, delete services
router.post(
  "/api/admin/services",
  requireAdmin,
  uploadSingle("icon", "codivra/services"),
  handleCreateService
);
router.put(
  "/api/admin/services/:id",
  requireAdmin,
  uploadSingle("icon", "codivra/services"),
  handleUpdateService
);
router.delete("/api/admin/services/:id", requireAdmin, handleDeleteService);

export default router;
