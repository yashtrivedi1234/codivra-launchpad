import { subscriptionSchema } from "../validation/subscription.schema.mjs";
import { getCollection } from "../db/mongo.mjs";
import { sendWelcomeEmail } from "../services/email.service.mjs";

let ensured = false;
async function ensureIndexes() {
  if (ensured) return;
  const col = await getCollection("subscribers");
  try {
    await col.createIndex({ email: 1 }, { unique: true, name: "uniq_email" });
  } catch {}
  ensured = true;
}

export async function handleSubscribe(req, res) {
  const parsed = subscriptionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid input",
      issues: parsed.error.flatten(),
    });
  }

  const { email, source } = parsed.data;

  try {
    await ensureIndexes();
    const subscribers = await getCollection("subscribers");

    const now = new Date();
    const result = await subscribers.updateOne(
      { email: email.toLowerCase() },
      {
        $setOnInsert: {
          email: email.toLowerCase(),
          created_at: now,
        },
        $set: {
          last_source: source || null,
          updated_at: now,
          last_ip: (req.headers["x-forwarded-for"] || req.ip || "").toString(),
          user_agent: (req.headers["user-agent"] || "").toString(),
        },
      },
      { upsert: true }
    );

    const already = result.matchedCount === 1 && result.upsertedCount === 0;

    if (!already) {
      try {
        await sendWelcomeEmail(email);
      } catch (e) {
        console.warn(
          "[subscribe] welcome email failed:",
          e && e.message ? e.message : e
        );
      }
    }

    return res.json({
      status: "ok",
      message: already
        ? "You're already subscribed. Thanks for staying with us!"
        : "Thanks for subscribing! You'll hear from us soon.",
    });
  } catch (err) {
    console.error("[subscribe] error:", err);
    return res.status(500).json({
      status: "error",
      error: "Failed to subscribe",
      details: err && err.message ? err.message : String(err),
    });
  }
}
