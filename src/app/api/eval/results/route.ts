import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    const data = await redis.get("eval-results");
    if (data) return NextResponse.json(data);
    return NextResponse.json({ lastRun: null, overall: { accuracy: null } });
  } catch {
    return NextResponse.json({ lastRun: null, overall: { accuracy: null } });
  }
}
