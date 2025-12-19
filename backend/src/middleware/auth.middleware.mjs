import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/auth.mjs";

export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized - Missing token",
    });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.admin = payload;
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token expired - Please login again",
      });
    }
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token",
    });
  }
}
