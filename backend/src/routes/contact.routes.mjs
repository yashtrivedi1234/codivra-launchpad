import { Router } from "express";
import {
  handleContact,
  handleHealth,
  handleTestEmail,
} from "../controllers/contact.controller.mjs";

const router = Router();

router.get("/health", handleHealth);
router.post("/api/contact", handleContact);
router.get("/test-email", handleTestEmail);

export default router;


