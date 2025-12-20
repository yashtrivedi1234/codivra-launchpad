import { Router } from "express";
import {
  handleCreateBlogPost,
  handleDeleteBlogPost,
  handleGetBlog,
  handleUpdateBlogPost,
} from "../controllers/blog.controller.mjs";
import { requireAdmin } from "../middleware/auth.middleware.mjs";
import { uploadSingle } from "../middleware/upload.middleware.mjs";

const router = Router();

// Public: get all blog posts
router.get("/api/blog", handleGetBlog);

// Admin: create, update, delete blog posts
router.post(
  "/api/admin/blog",
  requireAdmin,
  uploadSingle("image", "codivra/blog"),
  handleCreateBlogPost
);
router.put(
  "/api/admin/blog/:id",
  requireAdmin,
  uploadSingle("image", "codivra/blog"),
  handleUpdateBlogPost
);
router.delete("/api/admin/blog/:id", requireAdmin, handleDeleteBlogPost);

export default router;
