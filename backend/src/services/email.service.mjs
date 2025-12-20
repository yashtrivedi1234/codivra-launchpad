import nodemailer from "nodemailer";
import { EMAIL_FROM, EMAIL_TO } from "../config/env.mjs";

let transporter = null;
let isEmailConfigured = false;

// Basic brand configuration (optional via env)
const BRAND = {
  name: process.env.BRAND_NAME || "Codivra",
  logo: process.env.BRAND_LOGO_URL || "",
  primary: process.env.BRAND_PRIMARY_COLOR || "#4f46e5", // indigo-600
  website: process.env.BRAND_WEBSITE_URL || process.env.SITE_URL || "",
};

function renderBaseEmail({
  preheader = "",
  title = "",
  bodyHtml = "",
  cta = null, // { label, url }
}) {
  const safePre = String(preheader || "");
  const hasLogo = !!BRAND.logo;
  const btn =
    cta && cta.url && cta.label
      ? `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 24px 0 0 0"><tr><td align="center" bgcolor="${BRAND.primary}" style="border-radius:8px"><a href="${cta.url}" style="display:inline-block;padding:12px 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#ffffff;text-decoration:none;border-radius:8px" target="_blank" rel="noopener noreferrer">${cta.label}</a></td></tr></table>`
      : "";

  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${BRAND.name}</title>
      <style>img{border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}a{color:${
        BRAND.primary
      }}</style>
    </head>
    <body style="margin:0;padding:0;background-color:#f3f4f6;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${safePre}</div>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6;padding:24px 12px">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb">
              <tr>
                <td style="padding:20px 24px;background:#ffffff;border-bottom:1px solid #f3f4f6" align="left">
                  ${
                    hasLogo
                      ? `<a href="${
                          BRAND.website || "#"
                        }" target="_blank" style="display:inline-block"><img src="${
                          BRAND.logo
                        }" alt="${
                          BRAND.name
                        }" height="32" style="height:32px;display:block"/></a>`
                      : `<div style="font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:18px;color:#111827">${BRAND.name}</div>`
                  }
                </td>
              </tr>
              <tr>
                <td style="padding:24px 24px 8px 24px" align="left">
                  ${
                    title
                      ? `<h1 style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:28px;color:#111827">${title}</h1>`
                      : ""
                  }
                  <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#374151">
                    ${bodyHtml}
                    ${btn}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 24px;background:#f9fafb;border-top:1px solid #f3f4f6" align="left">
                  <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6b7280">
                    You’re receiving this email because you interacted with ${
                      BRAND.name
                    }. If this wasn’t you, you can safely ignore this email.
                  </div>
                  ${
                    BRAND.website
                      ? `<div style="margin-top:6px"><a href="${BRAND.website}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${BRAND.primary};text-decoration:none" target="_blank" rel="noopener noreferrer">Visit ${BRAND.name}</a></div>`
                      : ""
                  }
                </td>
              </tr>
            </table>
            <div style="height:16px"></div>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

// Only create transporter if SMTP credentials are provided
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: process.env.SMTP_SECURE === "true" || false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  transporter
    .verify()
    .then(() => {
      console.log("✅ [email] SMTP transporter verified");
      isEmailConfigured = true;
    })
    .catch((err) => {
      console.warn(
        "⚠️ [email] SMTP transporter not verified:",
        err && err.message ? err.message : err
      );
      console.log("[email] Email notifications will be disabled");
      isEmailConfigured = false;
    });
} else {
  console.log(
    "ℹ️ [email] SMTP credentials not configured. Email notifications disabled."
  );
  console.log("   To enable emails, set SMTP_USER and SMTP_PASS in .env file");
}

export async function sendContactEmail(payload) {
  if (!isEmailConfigured) {
    console.log(
      `📧 [email] Would send contact email (email not configured): ${payload.email}`
    );
    return { success: true, message: "Email queued (service not configured)" };
  }

  const mailOptions = {
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: `New contact request from ${payload.name} — ${payload.service}`,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${
      payload.phone || "N/A"
    }\nService: ${payload.service}\n\nMessage:\n${payload.message}`,
    html: renderBaseEmail({
      preheader: `New contact request via website`.concat(
        payload.service ? ` — ${payload.service}` : ""
      ),
      title: `New contact request`.concat(
        payload.service ? ` — ${payload.service}` : ""
      ),
      bodyHtml: `
        <p style="margin:0 0 8px 0"><strong>Name:</strong> ${payload.name}</p>
        <p style="margin:0 0 8px 0"><strong>Email:</strong> ${payload.email}</p>
        <p style="margin:0 0 8px 0"><strong>Phone:</strong> ${
          payload.phone || "N/A"
        }</p>
        <p style="margin:0 0 8px 0"><strong>Service:</strong> ${
          payload.service
        }</p>
        <p style="margin:12px 0 0 0"><strong>Message:</strong></p>
        <div>${payload.message.replace(/\n/g, "<br/>")}</div>
      `,
      cta: BRAND.website
        ? { label: "Open Dashboard", url: BRAND.website }
        : null,
    }),
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
    html: renderBaseEmail({
      preheader: "Testing your email configuration",
      title: "Email Test Successful",
      bodyHtml: `<p>This is a <strong>test</strong> message from the <code>/test-email</code> endpoint.</p>
                 <p>If you can see this, SMTP is working correctly.</p>`,
      cta: BRAND.website
        ? { label: "Visit Website", url: BRAND.website }
        : null,
    }),
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

export async function sendWelcomeEmail(toEmail) {
  if (!toEmail) return { success: false, message: "Missing recipient" };

  const mailOptions = {
    from: EMAIL_FROM,
    to: toEmail,
    subject: `Welcome to ${BRAND.name} Newsletter`,
    text: `Thanks for subscribing to ${BRAND.name}! You'll receive helpful insights, tips, and updates. If this wasn't you, ignore this message.`,
    html: renderBaseEmail({
      preheader: `Thanks for subscribing to ${BRAND.name}!`,
      title: `Welcome to ${BRAND.name} 🎉`,
      bodyHtml: `
        <p style="margin:0 0 12px 0">Thanks for subscribing to our newsletter! You'll receive helpful insights, tips, and product updates.</p>
        <p style="margin:0">If you have any questions, just reply to this email — we're here to help.</p>
      `,
      cta: BRAND.website
        ? { label: `Explore ${BRAND.name}`, url: BRAND.website }
        : null,
    }),
  };

  if (!isEmailConfigured) {
    console.log(
      `📧 [email] Would send welcome email to ${toEmail} (email not configured)`
    );
    return { success: true, message: "Email queued (service not configured)" };
  }

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
}
