import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, company, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Double Diffusion <noreply@doublediffusion.co>",
      to: ["creative@doublediffusion.co"],
      replyTo: email,
      subject: `Contact Form — ${name}${company ? ` (${company})` : ""}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="border-bottom: 2px solid #000; padding-bottom: 12px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: 600; width: 140px;">Name</td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Company</td><td>${company || "—"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Service</td><td>${service || "—"}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <strong>Message:</strong>
            <p style="margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: #999;">Sent from doublediffusion.co contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
