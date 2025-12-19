import { Router } from "express";
import { handleCreateApplication } from "../controllers/careers.controller.mjs";

const router = Router();

router.post("/api/careers/applications", handleCreateApplication);

export default router;


