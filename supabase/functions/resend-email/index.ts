import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

/** Required when the browser calls the function from localhost / your domain */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SITE_NAME = Deno.env.get("SITE_NAME") ?? "StudyGlide";
/** brand-900 — footer / dark sections */
const BRAND_DARK_GREEN = "#0d2e30";
/** accent-300 — dest-card arrow hover, accents */
const BRAND_GOLD = "#e2c065";
const LOGO_URL =
  "https://cmlkhnucfoxvxcpiwbzi.supabase.co/storage/v1/object/public/images/logo.png";

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/** Body from `supabase.functions.invoke()` in src/services/formNotifications.js */
type InvokePayload = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: Record<string, unknown>;
  old_record: Record<string, unknown> | null;
};

type FormTable = "applications" | "contact_messages" | "newsletter_subscribers";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function row(label: string, value: unknown): string {
  if (value === null || value === undefined || value === "") return "";
  return `<tr>
    <td style="padding:12px 16px;border-bottom:1px solid #e4e7ec;background-color:#f9fafb;color:#717680;font-family:Inter,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:12px 16px;border-bottom:1px solid #e4e7ec;color:#181d27;font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.55;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

function buildDetailsTable(entries: [string, unknown][]): string {
  const rows = entries.map(([label, value]) => row(label, value)).filter(Boolean).join("");
  if (!rows) {
    return `<p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:15px;color:#535862;">No details provided.</p>`;
  }
  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;border:1px solid #e4e7ec;margin:24px 0 8px;border-collapse:collapse;">${rows}</table>`;
}

function getFormMeta(table: FormTable, record: Record<string, unknown>) {
  switch (table) {
    case "applications":
      return {
        userEmail: String(record.email ?? ""),
        userName: String(record.full_name ?? "there"),
        formLabel: "Application",
        adminSubject: `New application: ${record.full_name ?? "Unknown"} (${record.source ?? "web"})`,
        userSubject: `We received your application — ${SITE_NAME}`,
        details: buildDetailsTable([
          ["Submitted", record.created_at ? new Date(String(record.created_at)).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "Just now"],
          ["Form", record.source === "applicants" ? "Applicants page" : "Home page"],
          ["Full name", record.full_name],
          ["Email", record.email],
          ["Phone", record.phone_number],
          ["Age", record.age],
          ["Gender", record.gender],
          ["Preferred destination", record.preferred_study_destination],
          ["Other countries", record.other_countries_interested],
          ["Program", record.program_interested],
          ["Intake period", record.intake_period],
          ["Highest qualification", record.highest_qualification],
          ["Other qualification", record.other_qualification],
          ["Previous visa refusal", record.previous_visa_refusal],
          ["How they heard about us", record.referral_source],
        ]),
      };
    case "contact_messages":
      return {
        userEmail: String(record.email ?? ""),
        userName: String(record.first_name ?? "there"),
        formLabel: "Contact message",
        adminSubject: `New contact message: ${record.first_name ?? ""} ${record.last_name ?? ""}`.trim(),
        userSubject: `We received your message — ${SITE_NAME}`,
        details: buildDetailsTable([
          ["Submitted", record.created_at ? new Date(String(record.created_at)).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "Just now"],
          ["First name", record.first_name],
          ["Last name", record.last_name],
          ["Email", record.email],
          ["Phone", record.phone],
          ["Message", record.message],
        ]),
      };
    case "newsletter_subscribers":
      return {
        userEmail: String(record.email ?? ""),
        userName: "there",
        formLabel: "Newsletter subscription",
        adminSubject: `New newsletter subscriber: ${record.email ?? ""}`,
        userSubject: `You're subscribed — ${SITE_NAME}`,
        details: buildDetailsTable([
          ["Subscribed", record.subscribed_at ? new Date(String(record.subscribed_at)).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "Just now"],
          ["Email", record.email],
        ]),
      };
  }
}

function wrapEmailHtml(title: string, intro: string, detailsHtml: string): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
  <div style="max-width:560px;margin:24px auto;background:#fff;border:1px solid #e9eaeb;">
    <div style="background:${BRAND_DARK_GREEN};padding:24px;text-align:center;">
      <img src="${LOGO_URL}" width="180" alt="${escapeHtml(SITE_NAME)} Educational Consult" style="display:block;margin:0 auto 16px;max-width:180px;height:auto;border:0;" />
      <h1 style="margin:0;font-size:18px;font-weight:600;color:${BRAND_GOLD};">${escapeHtml(title)}</h1>
    </div>
    <div style="padding:24px;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#535862;">${intro}</p>
      ${detailsHtml}
      <p style="margin:24px 0 0;font-size:13px;color:#717680;">&mdash; ${escapeHtml(SITE_NAME)} Educational Consult</p>
    </div>
  </div>
</body>
</html>`;
}

function normalizeRecipient(email: unknown, label: string): string {
  const value = String(email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new Error(`Invalid ${label} email: ${email}`);
  }
  return value;
}

function createSmtpClient(): SMTPClient {
  const username = Deno.env.get("ZOHO_EMAIL");
  const password = Deno.env.get("ZOHO_APP_PASSWORD");

  if (!username || !password) {
    throw new Error("Missing ZOHO_EMAIL or ZOHO_APP_PASSWORD secrets.");
  }

  return new SMTPClient({
    connection: {
      hostname: Deno.env.get("ZOHO_SMTP_HOST") ?? "smtp.zoho.com",
      port: Number(Deno.env.get("ZOHO_SMTP_PORT") ?? "465"),
      tls: true,
      auth: { username, password },
    },
  });
}

function getFromAddress(): string {
  const from = (Deno.env.get("FROM_EMAIL") ?? Deno.env.get("ZOHO_EMAIL"))?.trim();
  if (!from) throw new Error("Missing FROM_EMAIL or ZOHO_EMAIL.");
  return from;
}

/**
 * Send one message. `to` can be a string or array (denomailer) — every recipient gets the
 * same subject and body, so we call this twice for admin vs user templates, not once with [a,b].
 */
async function sendMailMessage({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  const from = getFromAddress();
  const client = createSmtpClient();

  try {
    await client.send({
      from,
      to,
      replyTo: from,
      subject,
      html,
      content: "auto",
    });
  } finally {
    await client.close();
  }
}

async function sendRoleMail(
  role: "user" | "admin",
  slot: { status: string; to: string; error?: string },
  payload: { to: string; subject: string; html: string },
) {
  try {
    await sendMailMessage(payload);
    slot.status = "sent";
    console.log(`[resend-email] ${role} mail sent:`, payload.to);
  } catch (err) {
    slot.status = "failed";
    slot.error = err instanceof Error ? err.message : String(err);
    console.error(`[resend-email] ${role} mail failed:`, payload.to, err);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let payload: InvokePayload;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const table = payload.table as FormTable;
  const allowed: FormTable[] = ["applications", "contact_messages", "newsletter_subscribers"];

  if (!allowed.includes(table)) {
    return jsonResponse({ skipped: true, reason: "Unknown table" }, 200);
  }

  if (payload.type !== "INSERT") {
    return jsonResponse({ skipped: true, reason: "Not an insert" }, 200);
  }

  const meta = getFormMeta(table, payload.record);

  let adminEmail: string;
  let userEmail: string;

  try {
    adminEmail = normalizeRecipient(Deno.env.get("ADMIN_EMAIL"), "ADMIN_EMAIL");
    userEmail = normalizeRecipient(meta.userEmail, "user");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid email configuration";
    if (message.includes("ADMIN_EMAIL")) {
      return jsonResponse({ error: "Missing or invalid ADMIN_EMAIL secret" }, 500);
    }
    return jsonResponse({ error: message }, 400);
  }

  const adminHtml = wrapEmailHtml(
    `New ${meta.formLabel}`,
    `A new ${meta.formLabel.toLowerCase()} was submitted on your website.`,
    meta.details,
  );

  const userHtml = wrapEmailHtml(
    "Thank you",
    `Hi ${escapeHtml(meta.userName)},<br><br>Thank you for contacting ${escapeHtml(SITE_NAME)}. Here is a copy of what you submitted:`,
    meta.details,
  );

  const delivery: {
    user: { status: string; to: string; error?: string };
    admin: { status: string; to: string; error?: string };
  } = {
    user: { status: "pending", to: userEmail },
    admin: { status: "pending", to: adminEmail },
  };

  // Different subject/body per recipient → two sends (not one `to: [user, admin]`).
  // Parallel + separate SMTP sessions avoids "2nd message dropped" issues.
  if (adminEmail === userEmail) {
    await sendRoleMail("admin", delivery.admin, {
      to: adminEmail,
      subject: meta.adminSubject,
      html: adminHtml,
    });
    delivery.user.status = "skipped";
    delivery.user.error = "Same address as admin; one notification sent.";
  } else {
    await Promise.all([
      sendRoleMail("user", delivery.user, {
        to: userEmail,
        subject: meta.userSubject,
        html: userHtml,
      }),
      sendRoleMail("admin", delivery.admin, {
        to: adminEmail,
        subject: meta.adminSubject,
        html: adminHtml,
      }),
    ]);
  }

  if (delivery.user.status !== "sent" && delivery.admin.status !== "sent") {
    return jsonResponse({ error: "Failed to send any email", delivery }, 500);
  }

  const userOk = delivery.user.status === "sent" || delivery.user.status === "skipped";
  const adminOk = delivery.admin.status === "sent";

  return jsonResponse(
    {
      sent: userOk && adminOk,
      partial: !userOk || !adminOk,
      delivery,
      table,
    },
    userOk && adminOk ? 200 : 207,
  );
});
