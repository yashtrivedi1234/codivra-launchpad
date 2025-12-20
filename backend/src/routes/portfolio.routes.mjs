import { Router } from "express";
import {
  handleCreatePortfolioItem,
  handleDeletePortfolioItem,
  handleGetPortfolio,
  handleUpdatePortfolioItem,
} from "../controllers/portfolio.controller.mjs";
import { requireAdmin } from "../middleware/auth.middleware.mjs";
import { uploadSingle } from "../middleware/upload.middleware.mjs";

const router = Router();

// Public: get all portfolio items
router.get("/api/portfolio", handleGetPortfolio);

// Admin: create, update, delete portfolio items
router.post(
  "/api/admin/portfolio",
  requireAdmin,
  uploadSingle("image", "codivra/portfolio"),
  handleCreatePortfolioItem
);
router.put(
  "/api/admin/portfolio/:id",
  requireAdmin,
  uploadSingle("image", "codivra/portfolio"),
  handleUpdatePortfolioItem
);
router.delete(
  "/api/admin/portfolio/:id",
  requireAdmin,
  handleDeletePortfolioItem
);

export default router;
