import { contactSchema } from "../validation/contact.schema.mjs";
import { sendContactEmail, sendTestEmail } from "../services/email.service.mjs";

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
    await sendContactEmail(payload);

    await new Promise((resolve) => setTimeout(resolve, 200));

    return res.json({
      status: "ok",
      message: "Message received and emailed. We'll reach out soon.",
    });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return res.status(500).json({
      status: "error",
      error: "Failed to send email",
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


