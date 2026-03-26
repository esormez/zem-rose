import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    const raw = await redis.lrange("retrieval-log", 0, 49);
    const recent = raw.map(r => typeof r === "string" ? JSON.parse(r) : r);

    const evalRaw = await redis.get("eval-results");
    const evalData = evalRaw ? (typeof evalRaw === "string" ? JSON.parse(evalRaw) : evalRaw) as Record<string, unknown> : {};

    const totalLogged = await redis.llen("retrieval-log");

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
      queriesLogged: totalLogged,
      lastQuery: recent[0]?.timestamp ?? null,
    });
  } catch {
    return NextResponse.json({ documents: 26, chunks: null, avgRetrievalScore: null, missRate: null });
  }
}
