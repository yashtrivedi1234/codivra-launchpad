import { Router } from "express";
import { handleSubscribe } from "../controllers/subscription.controller.mjs";

const router = Router();

router.post("/api/subscribe", handleSubscribe);

export default router;
