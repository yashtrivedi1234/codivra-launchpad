import { Router } from "express";
import {
  handleContact,
  handleHealth,
  handleTestEmail,
  handleAdminDeleteContact,
  handleAdminListContacts,
  handleAdminToggleContactRead,
} from "../controllers/contact.controller.mjs";
import { requireAdmin } from "../middleware/auth.middleware.mjs";

const router = Router();

router.get("/health", handleHealth);
router.post("/api/contact", handleContact);
router.get("/test-email", handleTestEmail);

// Admin routes for managing contact submissions
router.get("/api/admin/contacts", requireAdmin, handleAdminListContacts);
router.delete(
  "/api/admin/contacts/:id",
  requireAdmin,
  handleAdminDeleteContact
);
router.put(
  "/api/admin/contacts/:id/toggle-read",
  requireAdmin,
  handleAdminToggleContactRead
);

export default router;
