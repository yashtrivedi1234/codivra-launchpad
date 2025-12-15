import express from "express";
import cors from "cors";
import { z } from "zod";

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : "*",
  })
);
app.use(express.json());

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email"),
  service: z.string().min(2, "Service is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  phone: z.string().optional(),
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid input",
      issues: parsed.error.flatten(),
    });
  }

  const payload = parsed.data;

  // Replace with email/SMS/CRM integration as needed.
  console.log("[contact]", {
    ...payload,
    receivedAt: new Date().toISOString(),
  });

  await new Promise((resolve) => setTimeout(resolve, 300));

  res.json({
    status: "ok",
    message: "Message received. We'll reach out soon.",
  });
});

app.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}`);
});
