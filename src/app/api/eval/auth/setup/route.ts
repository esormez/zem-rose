import { NextResponse } from "next/server";
import { generateSecret, generateURI } from "otplib";
import QRCode from "qrcode";

export async function GET() {
  if (process.env.EVAL_TOTP_SECRET) {
    return NextResponse.json({ error: "TOTP already configured" }, { status: 400 });
  }
  const secret = generateSecret();
  const otpauth = generateURI({
    secret,
    issuer: "zemrose.me/eval",
    label: "john@zemrose.me",
  });
  const qrCode = await QRCode.toDataURL(otpauth);
  return NextResponse.json({
    secret,
    qrCode,
    instructions: [
      "1. Scan the QR code with Google Authenticator or Authy",
      "2. Add EVAL_TOTP_SECRET=<secret> to .env.local and Vercel env vars",
      "3. Redeploy — this endpoint will then return 400",
    ],
  });
}
