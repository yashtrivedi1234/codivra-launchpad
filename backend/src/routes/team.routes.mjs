import { Router } from "express";
import {
  handleCreateTeamMember,
  handleDeleteTeamMember,
  handleGetTeam,
  handleUpdateTeamMember,
} from "../controllers/team.controller.mjs";
import { requireAdmin } from "../middleware/auth.middleware.mjs";
import { uploadSingle } from "../middleware/upload.middleware.mjs";

const router = Router();

// Public: get all team members
router.get("/api/team", handleGetTeam);

// Admin: create, update, delete team members
router.post(
  "/api/admin/team",
  requireAdmin,
  uploadSingle("image", "codivra/team"),
  handleCreateTeamMember
);
router.put(
  "/api/admin/team/:id",
  requireAdmin,
  uploadSingle("image", "codivra/team"),
  handleUpdateTeamMember
);
router.delete("/api/admin/team/:id", requireAdmin, handleDeleteTeamMember);

export default router;
