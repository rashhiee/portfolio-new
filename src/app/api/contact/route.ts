import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/ratelimit";
import { Resend } from "resend";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters long")
    .max(2000, "Message cannot exceed 2000 characters"),
  hp_company: z.string().optional(), // Honeypot field
});

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // 1. Zod Validation
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: "Validation failed",
          details: formattedErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message, hp_company } = validationResult.data;

    // 2. Honeypot check (anti-bot trap)
    if (hp_company && hp_company.trim().length > 0) {
      return NextResponse.json(
        { error: "Spam bot submission detected via honeypot." },
        { status: 400 }
      );
    }

    // 3. Extract Client IP
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : realIp || "127.0.0.1";

    // 4. Upstash Redis Sliding-Window Rate Limit (3 requests per 15 min per IP)
    const rateLimitResult = await checkRateLimit(clientIp);

    if (!rateLimitResult.success) {
      const waitSeconds = Math.max(1, Math.ceil((rateLimitResult.reset - Date.now()) / 1000));
      const waitMinutes = Math.ceil(waitSeconds / 60);

      return NextResponse.json(
        {
          error: `Rate limit reached: You've submitted 3 messages recently. Please wait approximately ${waitMinutes} minute${waitMinutes > 1 ? "s" : ""} before transmitting another inquiry.`,
          retryAfter: waitSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": waitSeconds.toString(),
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          },
        }
      );
    }

    // 5. Send Email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "contact@example.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    if (resendApiKey && !resendApiKey.includes("123456789")) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          replyTo: email,
          subject: `Portfolio Message from ${name}`,
          text: `You received a new inquiry from your portfolio:\n\nFrom: ${name} (${email})\nIP: ${clientIp}\n\nMessage:\n${message}`,
        });
      } catch (emailErr) {
        console.error("Resend API error:", emailErr);
        // Do not leak internal API credentials; return friendly message
        return NextResponse.json(
          { error: "Email delivery service encountered an issue. Please reach out directly." },
          { status: 502 }
        );
      }
    } else {
      // In dev or test mode when no real key is configured
      console.log(`[DEV EMAIL SIMULATION] To: ${toEmail} | From: ${name} <${email}> | Msg: ${message.slice(0, 50)}...`);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been securely transmitted.",
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Unhandled contact API exception:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred processing your request." },
      { status: 500 }
    );
  }
}
