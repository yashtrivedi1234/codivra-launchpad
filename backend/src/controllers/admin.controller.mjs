import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { adminLoginSchema } from "../validation/admin.schema.mjs";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  JWT_EXPIRES_IN,
  JWT_SECRET,
} from "../config/auth.mjs";
import { getCollection } from "../db/mongo.mjs";
import { ObjectId } from "mongodb";

const ADMIN_EMAIL_NORMALIZED = (ADMIN_EMAIL || "").toLowerCase();

async function createTokenForAdmin(admin) {
  const payload = {
    id: admin._id?.toString?.() ?? undefined,
    email: admin.email,
    role: "admin",
    name: admin.name ?? undefined,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    token,
    user: {
      id: admin._id?.toString?.() ?? undefined,
      email: admin.email,
      role: "admin",
      name: admin.name ?? null,
    },
  };
}

// Seed default admin if not exists
export async function seedDefaultAdmin() {
  try {
    const collection = await getCollection("admins");
    const existing = await collection.findOne({
      email: ADMIN_EMAIL_NORMALIZED,
    });

    if (!existing) {
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await collection.insertOne({
        email: ADMIN_EMAIL_NORMALIZED,
        name: "Admin",
        passwordHash,
        created_at: new Date().toISOString(),
        is_active: true,
      });
      console.log(
        `✅ [Admin] Default admin created: ${ADMIN_EMAIL_NORMALIZED}`
      );
    } else {
      if (existing.email !== ADMIN_EMAIL_NORMALIZED) {
        await collection.updateOne(
          { _id: existing._id },
          { $set: { email: ADMIN_EMAIL_NORMALIZED } }
        );
        console.log(
          `✅ [Admin] Normalized admin email to: ${ADMIN_EMAIL_NORMALIZED}`
        );
      } else {
        console.log(
          `✅ [Admin] Admin user already exists: ${ADMIN_EMAIL_NORMALIZED}`
        );
      }
    }
  } catch (err) {
    console.error("❌ [Admin] Failed to seed default admin:", err);
  }
}

export async function handleAdminLogin(req, res) {
  const parsed = adminLoginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid input",
      issues: parsed.error.flatten(),
    });
  }

  const { email, password } = parsed.data;

  try {
    const collection = await getCollection("admins");
    const admin = await collection.findOne({ email });

    // Check database admin first
    if (admin && admin.passwordHash) {
      // Check if admin is active
      if (admin.is_active === false) {
        return res.status(403).json({
          success: false,
          error: "This admin account has been deactivated",
        });
      }

      const valid = await bcrypt.compare(password, admin.passwordHash);
      if (!valid) {
        console.warn(`⚠️ [Admin] Failed login attempt for: ${email}`);
        return res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
      }

      // Update last login
      await collection.updateOne(
        { _id: admin._id },
        { $set: { last_login: new Date().toISOString() } }
      );

      const { token, user } = await createTokenForAdmin(admin);

      console.log(`✅ [Admin] Login successful: ${email}`);

      return res.json({
        token,
        user,
      });
    }

    // Fallback to env-based admin if no DB user exists
    if (email === ADMIN_EMAIL_NORMALIZED && password === ADMIN_PASSWORD) {
      const { token, user } = await createTokenForAdmin({
        _id: null,
        email: ADMIN_EMAIL_NORMALIZED,
        name: "Admin",
      });

      console.log(`✅ [Admin] Login successful (env fallback): ${email}`);

      return res.json({
        token,
        user,
      });
    }

    console.warn(`⚠️ [Admin] Invalid login attempt for: ${email}`);
    return res.status(401).json({
      success: false,
      error: "Invalid credentials",
    });
  } catch (err) {
    console.error("❌ [Admin] Login error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to login",
    });
  }
}

export async function handleAdminMe(req, res) {
  if (!req.admin) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized",
    });
  }

  try {
    const collection = await getCollection("admins");
    const admin = await collection.findOne({ email: req.admin.email });

    return res.json({
      success: true,
      user: {
        id: admin?._id?.toString?.() ?? req.admin.id,
        email: req.admin.email,
        role: req.admin.role,
        name: req.admin.name,
        last_login: admin?.last_login || null,
      },
    });
  } catch (err) {
    console.error("❌ [Admin] Error fetching admin info:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch admin info",
    });
  }
}

export async function handleAdminChangePassword(req, res) {
  if (!req.admin) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized",
    });
  }

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      error: "Old password and new password are required",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      error: "New password must be at least 6 characters",
    });
  }

  try {
    const collection = await getCollection("admins");
    const admin = await collection.findOne({ email: req.admin.email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: "Admin not found",
      });
    }

    // Verify old password
    const valid = await bcrypt.compare(oldPassword, admin.passwordHash);
    if (!valid) {
      return res.status(401).json({
        success: false,
        error: "Old password is incorrect",
      });
    }

    // Hash and update new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await collection.updateOne(
      { _id: admin._id },
      {
        $set: {
          passwordHash: newPasswordHash,
          updated_at: new Date().toISOString(),
        },
      }
    );

    console.log(`✅ [Admin] Password changed for: ${req.admin.email}`);

    return res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error("❌ [Admin] Change password error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to change password",
    });
  }
}

export async function handleListJobApplications(_req, res) {
  try {
    const collection = await getCollection("job_applications");
    const items = await collection.find({}).sort({ created_at: -1 }).toArray();

    return res.json({ success: true, items });
  } catch (err) {
    console.error("❌ [Admin] Error listing job applications:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to list job applications",
    });
  }
}

export async function handleDeleteJobApplication(req, res) {
  const { id } = req.params;

  try {
    const collection = await getCollection("job_applications");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Application not found",
      });
    }

    console.log(`✅ [Admin] Job application deleted: ${id}`);

    return res.json({ success: true, status: "ok" });
  } catch (err) {
    console.error("❌ [Admin] Error deleting job application:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to delete job application",
    });
  }
}
