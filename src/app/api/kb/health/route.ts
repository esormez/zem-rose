import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getPineconeStats } from "@/lib/pineconeStats";

export async function GET(req: NextRequest) {
  if (req.headers.get("x-eval-secret") !== process.env.EVAL_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const range = req.nextUrl.searchParams.get("range") || "all"; // 1h, 24h, 7d, 30d, all

  const raw = await redis.lrange("retrieval-log", 0, 199);
  const allLog = raw.map(r => typeof r === "string" ? JSON.parse(r) : r);

  // Time-filter
  const now = Date.now();
  const cutoffs: Record<string, number> = {
    "1h": now - 3600_000,
    "24h": now - 86400_000,
    "7d": now - 604800_000,
    "30d": now - 2592000_000,
  };
  const cutoff = cutoffs[range] ?? 0;
  const log = cutoff ? allLog.filter(r => new Date(r.timestamp).getTime() >= cutoff) : allLog;

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

  // Judge stats from inline judge scores in retrieval-log entries
  const judged = log.filter(r => r.judge);
  const judgeStats = judged.length ? {
    count: judged.length,
    avgAccuracy: Number((judged.reduce((a, r) => a + (r.judge.accuracy as number), 0) / judged.length).toFixed(1)),
    avgTone: Number((judged.reduce((a, r) => a + (r.judge.tone as number), 0) / judged.length).toFixed(1)),
    warnings: judged.filter(r => r.judge.flag === "warning").length,
    critical: judged.filter(r => r.judge.flag === "critical").length,
  } : null;

  let indexStats = null;
  try { indexStats = await getPineconeStats(); } catch {}

  // Fetch last eval run results
  let evalResults = null;
  try {
    const evalRaw = await redis.get("eval-results");
    evalResults = evalRaw ? (typeof evalRaw === "string" ? JSON.parse(evalRaw) : evalRaw) : null;
  } catch {}

  return NextResponse.json({
    index: indexStats,
    documents: 48,
    queriesLogged: totalLogged,
    queriesInRange: log.length,
    range,
    avgTopScore,
    avgScore,
    missRate,
    avgChunksPerQuery: avgChunks,
    distribution,
    topSources,
    recentQueries: log.map(r => ({
      query: r.query,
      topScore: r.topScore,
      chunks: r.aboveThreshold,
      miss: r.miss,
      timestamp: r.timestamp,
      response: r.response ?? null,
      judge: r.judge ?? null,
    })),
    judgeStats,
    evalResults,
  });
}
