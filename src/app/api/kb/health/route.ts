import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getPineconeStats } from "@/lib/pineconeStats";

export async function GET(req: NextRequest) {
  if (req.headers.get("x-eval-secret") !== process.env.EVAL_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raw = await redis.lrange("retrieval-log", 0, 99);
  const log = raw.map(r => typeof r === "string" ? JSON.parse(r) : r);
  const totalLogged = await redis.llen("retrieval-log");

  const avgTopScore = log.length
    ? Number((log.reduce((a, r) => a + (r.topScore as number), 0) / log.length).toFixed(3))
    : null;
  const avgScore = log.length
    ? Number((log.reduce((a, r) => a + (r.avgScore as number), 0) / log.length).toFixed(3))
    : null;
  const missRate = log.length
    ? Number(((log.filter(r => r.miss).length / log.length) * 100).toFixed(1))
    : null;
  const avgChunks = log.length
    ? Number((log.reduce((a, r) => a + (r.aboveThreshold as number), 0) / log.length).toFixed(1))
    : null;

  const distribution = { excellent: 0, good: 0, fair: 0, poor: 0 };
  log.forEach(r => {
    const score = r.topScore as number;
    if (score >= 0.85) distribution.excellent++;
    else if (score >= 0.70) distribution.good++;
    else if (score >= 0.55) distribution.fair++;
    else distribution.poor++;
  });

  const sourceFreq: Record<string, number> = {};
  log.forEach(r => {
    const sources = r.sources as { source: string; score: number }[] | undefined;
    sources?.forEach(s => {
      sourceFreq[s.source] = (sourceFreq[s.source] ?? 0) + 1;
    });
  });
  const topSources = Object.entries(sourceFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([source, count]) => ({ source, count }));

  let indexStats = null;
  try { indexStats = await getPineconeStats(); } catch {}

  return NextResponse.json({
    index: indexStats,
    documents: 48,
    queriesLogged: totalLogged,
    avgTopScore,
    avgScore,
    missRate,
    avgChunksPerQuery: avgChunks,
    distribution,
    topSources,
    recentQueries: log.slice(0, 10).map(r => ({
      query: r.query,
      topScore: r.topScore,
      chunks: r.aboveThreshold,
      miss: r.miss,
      timestamp: r.timestamp,
    })),
  });
}
