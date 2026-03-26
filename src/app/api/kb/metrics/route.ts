import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function GET() {
  try {
    const logPath = path.join(process.cwd(), "data", "retrieval-log.json");
    let log: Record<string, unknown>[] = [];
    try { log = JSON.parse(fs.readFileSync(logPath, "utf-8")); } catch {}

    const evalPath = path.join(process.cwd(), "data", "eval-results.json");
    let evalData: Record<string, unknown> = {};
    try { evalData = JSON.parse(fs.readFileSync(evalPath, "utf-8")); } catch {}

    const recent = log.slice(0, 50);
    const avgTopScore = recent.length
      ? Number((recent.reduce((a, r) => a + (r.topScore as number), 0) / recent.length).toFixed(2))
      : null;
    const missRate = recent.length
      ? Number(((recent.filter(r => r.miss).length / recent.length) * 100).toFixed(1))
      : null;
    const avgChunks = recent.length
      ? Number((recent.reduce((a, r) => a + (r.aboveThreshold as number), 0) / recent.length).toFixed(1))
      : null;

    const kb = evalData.kb as Record<string, unknown> | undefined;

    return NextResponse.json({
      documents: 26,
      chunks: kb?.totalVectors ?? null,
      avgRetrievalScore: avgTopScore,
      missRate,
      avgChunksPerQuery: avgChunks,
      queriesLogged: log.length,
      lastQuery: (log[0] as Record<string, unknown>)?.timestamp ?? null,
    });
  } catch {
    return NextResponse.json({ documents: 26, chunks: null, avgRetrievalScore: null, missRate: null });
  }
}
