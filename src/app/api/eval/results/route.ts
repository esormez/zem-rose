import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "eval-results.json"), "utf-8"));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ lastRun: null, overall: { accuracy: null } });
  }
}
