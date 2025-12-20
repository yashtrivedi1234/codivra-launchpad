import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.routes.mjs";
import careersRoutes from "./routes/careers.routes.mjs";
import adminRoutes from "./routes/admin.routes.mjs";
import pageRoutes from "./routes/page.routes.mjs";
import servicesRoutes from "./routes/services.routes.mjs";
import teamRoutes from "./routes/team.routes.mjs";
import portfolioRoutes from "./routes/portfolio.routes.mjs";
import blogRoutes from "./routes/blog.routes.mjs";
import subscriptionRoutes from "./routes/subscription.routes.mjs";
import { ALLOWED_ORIGINS } from "./config/env.mjs";
import { seedDefaultAdmin } from "./controllers/admin.controller.mjs";

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS : "*",
  })
);
app.use(express.json());

// Middleware to parse JSON fields from FormData
app.use((req, res, next) => {
  if (req.body && typeof req.body === "object") {
    // Parse JSON string fields
    if (req.body.social_links && typeof req.body.social_links === "string") {
      try {
        req.body.social_links = JSON.parse(req.body.social_links);
      } catch (e) {
        // If parsing fails, leave as is
      }
    }
  }
  next();
});

// Seed default admin on startup
seedDefaultAdmin();

app.use(contactRoutes);
app.use(careersRoutes);
app.use(adminRoutes);
app.use(pageRoutes);
app.use(servicesRoutes);
app.use(teamRoutes);
app.use(portfolioRoutes);
app.use(blogRoutes);
app.use(subscriptionRoutes);

export default app;
