import { NextResponse } from "next/server";
import { Resend } from "resend";

// Built per request rather than at module scope: the Resend constructor throws
// on a missing key, which would otherwise fail the whole build (and any deploy
// where the env var is not set) rather than just this one route.
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, company, role, runtime, services, message } = body;

    // Validate required fields
    if (!name || !email || !company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resend = getResend();
    if (!resend) {
      console.error("Demo form — RESEND_API_KEY is not set. Lead received but not emailed:", {
        name,
        email,
        company,
        message,
      });
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: "Double Diffusion <noreply@doublediffusion.co>",
      to: ["creative@doublediffusion.co"],
      replyTo: email,
      subject: `Demo Request from ${name} — ${company}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="border-bottom: 2px solid #000; padding-bottom: 12px;">New Demo Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: 600; width: 140px;">Name</td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Company</td><td>${company}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Role</td><td>${role || "—"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Runtime</td><td>${runtime || "—"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Services</td><td>${services?.length ? services.join(", ") : "—"}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <strong>Message:</strong>
            <p style="margin: 8px 0 0; white-space: pre-wrap;">${message || "No message provided."}</p>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: #999;">Sent from doublediffusion.co demo form</p>
        </div>
      `,
    });

    // resend.emails.send resolves with { data, error } — it does not throw on
    // API failures (quota, rate limit, unverified sender). Without this check a
    // failed send would still report success and the lead would be lost silently.
    if (error) {
      console.error("Demo form — Resend rejected the send:", {
        name: error.name,
        statusCode: error.statusCode,
        message: error.message,
        lead: { name, email, company },
      });
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Demo form error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
