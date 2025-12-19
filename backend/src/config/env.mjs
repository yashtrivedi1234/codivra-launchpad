export const PORT = process.env.PORT || 4000;

export const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/codivra";

export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "codivra";

export const EMAIL_FROM =
  process.env.EMAIL_FROM || process.env.SMTP_USER || "no-reply@example.com";

export const EMAIL_TO = process.env.EMAIL_TO || "codivrasolution@gmail.com";
