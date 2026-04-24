import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, company, role, budget, services, message } = body;

    // Validate required fields
    if (!name || !email || !company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Double Diffusion <noreply@doublediffusion.co>",
      to: ["doublediffusionstudios@gmail.com"],
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
            <tr><td style="padding: 8px 0; font-weight: 600;">Budget</td><td>${budget || "—"}</td></tr>
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Demo form error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
