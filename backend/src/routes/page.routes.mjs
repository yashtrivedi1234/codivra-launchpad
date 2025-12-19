import { Router } from "express";
import {
  handleAdminDeletePageSection,
  handleAdminListPages,
  handleAdminUpsertPageSection,
  handleGetPage,
} from "../controllers/page.controller.mjs";
import { requireAdmin } from "../middleware/auth.middleware.mjs";

const router = Router();

// Public: fetch content for a page
router.get("/api/pages/:page", handleGetPage);

// Admin: list / upsert / delete sections
router.get("/api/admin/pages", requireAdmin, handleAdminListPages);
router.post("/api/admin/pages", requireAdmin, handleAdminUpsertPageSection);
router.delete(
  "/api/admin/pages/:id",
  requireAdmin,
  handleAdminDeletePageSection
);

export default router;


