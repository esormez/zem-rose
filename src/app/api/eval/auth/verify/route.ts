import { NextRequest, NextResponse } from "next/server";
import { verifySync } from "otplib";

export async function POST(req: NextRequest) {
  const { password, token } = await req.json();
  if (password !== process.env.EVAL_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  if (!process.env.EVAL_TOTP_SECRET) {
    return NextResponse.json({ error: "TOTP not configured" }, { status: 500 });
  }
  const isValid = verifySync({ token, secret: process.env.EVAL_TOTP_SECRET });
  if (!isValid) {
    return NextResponse.json({ error: "Invalid TOTP token" }, { status: 401 });
  }
  return NextResponse.json({
    secret: process.env.EVAL_SECRET,
    expiresAt: Date.now() + 8 * 60 * 60 * 1000,
  });
}
