import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "node:crypto";

/**
 * Resend delivery-failure webhook.
 *
 * The contact form dropped every submission for five months because a bounce
 * put the recipient on Resend's suppression list and nothing anywhere reported
 * it — the API kept returning 200. This endpoint exists so that the next
 * failure is noticed the moment it happens rather than months later.
 */

// Events that mean a lead did not reach the inbox, or is about to stop doing so.
const FAILURE_EVENTS = new Set([
  "email.bounced",
  "email.complained",
  "email.failed",
  "email.delivery_delayed",
]);

/** Svix signature: base64 HMAC-SHA256 over `${id}.${timestamp}.${body}`. */
function signatureIsValid(secret, id, timestamp, body, header) {
  if (!secret || !id || !timestamp || !header) return false;

  // Reject anything older than five minutes so a captured request can't be replayed.
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = crypto
    .createHmac("sha256", key)
    .update(`${id}.${timestamp}.${body}`)
    .digest("base64");

  // The header carries one or more space-separated `v1,<signature>` entries.
  return header.split(" ").some((part) => {
    const sig = part.split(",")[1];
    if (!sig || sig.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  });
}

async function sendAlert(event, payload) {
  const key = process.env.RESEND_API_KEY;
  const alertTo = process.env.ALERT_EMAIL;
  // Alerting by mail only works when the failure is specific to one recipient,
  // which is exactly the case that bit us. Nothing to do if it isn't configured.
  if (!key || !alertTo) return;

  const recipient = Array.isArray(payload?.to) ? payload.to.join(", ") : payload?.to;
  const reason =
    payload?.bounce?.message ||
    payload?.bounce?.subType ||
    payload?.reason ||
    "no reason given";

  try {
    await new Resend(key).emails.send({
      from: "Double Diffusion Alerts <noreply@doublediffusion.co>",
      to: [alertTo],
      subject: `Email delivery problem: ${event}`,
      html: `
        <p><strong>${event}</strong></p>
        <p>An email from the site did not reach its recipient.</p>
        <ul>
          <li>Recipient: ${recipient || "unknown"}</li>
          <li>Subject: ${payload?.subject || "unknown"}</li>
          <li>Reason: ${reason}</li>
          <li>Message id: ${payload?.email_id || "unknown"}</li>
        </ul>
        <p>A bounce or complaint can put the recipient on Resend's suppression
        list, after which every later message to that address is discarded
        silently. Check resend.com/settings/suppressions.</p>
      `,
    });
  } catch (err) {
    console.error("Resend webhook — could not send the alert email:", err);
  }
}

export async function POST(req) {
  const body = await req.text();

  const valid = signatureIsValid(
    process.env.RESEND_WEBHOOK_SECRET,
    req.headers.get("svix-id"),
    req.headers.get("svix-timestamp"),
    body,
    req.headers.get("svix-signature")
  );
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event;
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Malformed payload" }, { status: 400 });
  }

  if (FAILURE_EVENTS.has(event?.type)) {
    console.error(`Resend webhook — ${event.type}`, {
      to: event.data?.to,
      subject: event.data?.subject,
      email_id: event.data?.email_id,
      bounce: event.data?.bounce,
    });
    await sendAlert(event.type, event.data);
  }

  // Always 200 on a verified request; a non-2xx makes Resend retry.
  return NextResponse.json({ received: true });
}
