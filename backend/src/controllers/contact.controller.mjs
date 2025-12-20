import { ObjectId } from "mongodb";
import { contactSchema } from "../validation/contact.schema.mjs";
import {
  sendContactEmail,
  sendTestEmail,
  sendContactConfirmationEmail,
} from "../services/email.service.mjs";
import { getCollection } from "../db/mongo.mjs";

export async function handleHealth(req, res) {
  res.json({ status: "ok" });
}

export async function handleContact(req, res) {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid input",
      issues: parsed.error.flatten(),
    });
  }

  const payload = parsed.data;

  console.log("[contact]", {
    ...payload,
    receivedAt: new Date().toISOString(),
  });

  try {
    // Try to send email, but do not fail the whole request if email fails
    let emailError = null;
    try {
      await sendContactEmail(payload);
    } catch (err) {
      emailError = err;
      console.error("[contact] Email send failed, but saving anyway:", err);
    }

    const collection = await getCollection("contact_submissions");
    const doc = {
      ...payload,
      read: false,
      created_at: new Date().toISOString(),
      email_error: emailError
        ? emailError.message || String(emailError)
        : undefined,
    };
    await collection.insertOne(doc);

    // Send confirmation email to the user (do not block response)
    sendContactConfirmationEmail(payload).catch((err) => {
      console.error("[contact] Confirmation email to user failed:", err);
    });

    await new Promise((resolve) => setTimeout(resolve, 200));

    return res.json({
      status: "ok",
      message: emailError
        ? "Message received, but email notification failed. We'll still reach out."
        : "Message received. We'll reach out soon. A confirmation email has been sent to you.",
    });
  } catch (err) {
    console.error("Failed to process contact submission:", err);
    return res.status(500).json({
      status: "error",
      error: "Failed to save submission",
      details: err && err.message ? err.message : String(err),
    });
  }
}

export async function handleTestEmail(_req, res) {
  try {
    const result = await sendTestEmail();
    return res.json({ status: "ok", ...result });
  } catch (err) {
    console.error("/test-email error:", err);
    return res.status(500).json({
      status: "error",
      error: err && err.message ? err.message : String(err),
    });
  }
}

export async function handleAdminListContacts(_req, res) {
  try {
    const collection = await getCollection("contact_submissions");
    const items = await collection.find({}).sort({ created_at: -1 }).toArray();
    return res.json({ success: true, items });
  } catch (err) {
    console.error("[admin] list contacts error:", err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to list contacts" });
  }
}

export async function handleAdminDeleteContact(req, res) {
  const { id } = req.params;
  try {
    const collection = await getCollection("contact_submissions");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Contact not found" });
    }
    return res.json({ success: true, status: "ok" });
  } catch (err) {
    console.error("[admin] delete contact error:", err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete contact" });
  }
}

export async function handleAdminToggleContactRead(req, res) {
  const { id } = req.params;
  try {
    const collection = await getCollection("contact_submissions");
    const contact = await collection.findOne({ _id: new ObjectId(id) });
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, error: "Contact not found" });
    }
    const updated = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { read: !contact.read } },
      { returnDocument: "after" }
    );
    return res.json({ success: true, data: updated.value });
  } catch (err) {
    console.error("[admin] toggle contact read error:", err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update contact" });
  }
}
