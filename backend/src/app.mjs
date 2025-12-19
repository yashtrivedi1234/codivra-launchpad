import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.routes.mjs";
import careersRoutes from "./routes/careers.routes.mjs";
import adminRoutes from "./routes/admin.routes.mjs";
import pageRoutes from "./routes/page.routes.mjs";
import { ALLOWED_ORIGINS } from "./config/env.mjs";
import { seedDefaultAdmin } from "./controllers/admin.controller.mjs";

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS : "*",
  })
);
app.use(express.json());

// Seed default admin on startup
seedDefaultAdmin();

app.use(contactRoutes);
app.use(careersRoutes);
app.use(adminRoutes);
app.use(pageRoutes);

export default app;
