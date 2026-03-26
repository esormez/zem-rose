import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function POST(req: NextRequest) {
  if (req.headers.get("x-eval-secret") !== process.env.EVAL_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const results = await req.json();
  fs.writeFileSync(path.join(process.cwd(), "data", "eval-results.json"), JSON.stringify(results, null, 2));
  return NextResponse.json({ success: true });
}
