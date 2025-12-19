import nodemailer from "nodemailer";
import { EMAIL_FROM, EMAIL_TO } from "../config/env.mjs";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === "true" || false,
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
});

transporter
  .verify()
  .then(() => {
    console.log("[email] SMTP transporter verified");
  })
  .catch((err) => {
    console.warn(
      "[email] SMTP transporter not verified:",
      err && err.message ? err.message : err
    );
  });

export async function sendContactEmail(payload) {
  const mailOptions = {
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: `New contact request from ${payload.name} — ${payload.service}`,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${
      payload.phone || "N/A"
    }\nService: ${payload.service}\n\nMessage:\n${payload.message}`,
    html: `<p><strong>Name:</strong> ${payload.name}</p>
           <p><strong>Email:</strong> ${payload.email}</p>
           <p><strong>Phone:</strong> ${payload.phone || "N/A"}</p>
           <p><strong>Service:</strong> ${payload.service}</p>
           <p><strong>Message:</strong><br/>${payload.message.replace(
             /\n/g,
             "<br/>"
           )}</p>`,
  };

  if (transporter) {
    return transporter.sendMail(mailOptions);
  }
}

export async function sendTestEmail() {
  const mailOptions = {
    from: EMAIL_FROM,
    to: EMAIL_TO || process.env.SMTP_USER || "recipient@example.com",
    subject: "Test email from Codivra Backend",
    text: "This is a test message from the /test-email endpoint.",
    html: "<p>This is a <strong>test</strong> message from the /test-email endpoint.</p>",
  };

  const hasSmtp = !!(process.env.SMTP_HOST || process.env.SMTP_USER);

  if (hasSmtp) {
    const info = await transporter.sendMail(mailOptions);
    return { messageId: info.messageId };
  }

  const testAccount = await nodemailer.createTestAccount();
  const testTransporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await testTransporter.sendMail({
    ...mailOptions,
    from: testAccount.user,
    to: testAccount.user,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info) || null;

  return { messageId: info.messageId, previewUrl };
}


