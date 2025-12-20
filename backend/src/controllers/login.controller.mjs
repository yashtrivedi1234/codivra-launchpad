import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { loginSchema } from "../validation/login.schema.mjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/auth.mjs";
import { getCollection } from "../db/mongo.mjs";
import { ObjectId } from "mongodb";

// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Create JWT token for user
async function createTokenForUser(user) {
  const payload = {
    id: user._id?.toString?.() ?? undefined,
    email: user.email,
    role: user.role || "user",
    name: user.name ?? undefined,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    token,
    user: {
      id: user._id?.toString?.() ?? undefined,
      email: user.email,
      role: user.role || "user",
      name: user.name ?? null,
    },
  };
}

// User Login
export async function handleUserLogin(req, res) {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: "Invalid input",
        details: validation.error.errors,
      });
    }

    const { email, password } = validation.data;
    const collection = await getCollection("users");

    const user = await collection.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const result = await createTokenForUser(user);
    res.json(result);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get current user profile
export async function handleGetUserProfile(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const collection = await getCollection("users");
    const user = await collection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Change password
export async function handleChangePassword(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Current password and new password are required" });
    }

    const collection = await getCollection("users");
    const user = await collection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { passwordHash: newPasswordHash } }
    );

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Google OAuth Login
export async function handleGoogleLogin(req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Google token is required" });
    }

    // Verify the Google token
    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (error) {
      console.error("Google token verification failed:", error);
      return res.status(401).json({ error: "Invalid Google token" });
    }

    const { email, name, picture } = payload;
    const collection = await getCollection("users");

    // Find or create user
    let user = await collection.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Create new user from Google OAuth
      const result = await collection.insertOne({
        email: email.toLowerCase(),
        name: name || "User",
        picture: picture || null,
        role: "user",
        authProvider: "google",
        createdAt: new Date(),
        passwordHash: null, // No password for Google OAuth users
      });

      user = {
        _id: result.insertedId,
        email: email.toLowerCase(),
        name: name || "User",
        role: "user",
      };
    } else if (!user.authProvider && !user.passwordHash) {
      // Update user to mark as Google OAuth if they were created via Google but not marked
      await collection.updateOne(
        { _id: user._id },
        {
          $set: {
            authProvider: "google",
            picture: picture || null,
          },
        }
      );
    }

    const result = await createTokenForUser(user);
    res.json(result);
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
