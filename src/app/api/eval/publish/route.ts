import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function POST(req: NextRequest) {
  if (req.headers.get("x-eval-secret") !== process.env.EVAL_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const results = await req.json();
  await redis.set("eval-results", JSON.stringify(results));
  return NextResponse.json({ success: true });
}
