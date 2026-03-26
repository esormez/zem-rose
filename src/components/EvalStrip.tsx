"use client";
import { useState, useEffect } from "react";

interface EvalData {
  lastRun: string | null;
  overall: { accuracy: number | null; completeness: number | null; tone: number | null };
  categories: Record<string, { accuracy: number | null; n: number; total: number }>;
  avgLatency: number | null;
  judge: string;
}

function gc(s: number) {
  if (s >= 88) return "#22c55e";
  if (s >= 72) return "#2563EB";
  if (s >= 55) return "#fb923c";
  return "#ef4444";
}

export default function EvalStrip() {
  const [data, setData] = useState<EvalData | null>(null);

  useEffect(() => {
    fetch("/api/eval/results").then(r => r.json()).then(setData).catch(() => {});
  }, []);

  if (!data?.lastRun || data.overall.accuracy == null) return null;

  const cats = ["FACTUAL", "REASONING", "EDGE", "TONE"];
  const catColors: Record<string, string> = { FACTUAL: "#2563EB", REASONING: "#22c55e", EDGE: "#fb923c", TONE: "#a855f7" };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 20px" }}>
      <div style={{
        border: "1px solid rgba(228,228,231,0.05)",
        background: "rgba(228,228,231,0.005)",
        padding: "18px 28px",
        display: "flex", alignItems: "center", gap: 0,
      }}>
        <div style={{
          fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
          fontSize: 8, color: "#2563EB", letterSpacing: "0.22em",
          paddingRight: 28, borderRight: "1px solid rgba(228,228,231,0.05)",
          marginRight: 28, whiteSpace: "nowrap",
        }}>
          EVAL SCORES
        </div>

        {/* Overall accuracy */}
        <div style={{ paddingRight: 28, borderRight: "1px solid rgba(228,228,231,0.05)", marginRight: 28 }}>
          <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: 7, color: "rgba(228,228,231,0.22)", letterSpacing: "0.16em", marginBottom: 4 }}>OVERALL</div>
          <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: 18, fontWeight: 500, color: gc(data.overall.accuracy!) }}>{data.overall.accuracy}</div>
        </div>

        {/* Category scores */}
        {cats.map((cat, i) => {
          const c = data.categories[cat];
          if (!c || c.accuracy == null) return null;
          return (
            <div key={cat} style={{
              paddingRight: 28,
              borderRight: i < cats.length - 1 ? "1px solid rgba(228,228,231,0.05)" : "none",
              marginRight: i < cats.length - 1 ? 28 : 0,
              flex: 1,
            }}>
              <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: 7, color: catColors[cat], letterSpacing: "0.16em", marginBottom: 4 }}>
                {cat === "EDGE" ? "EDGE CASE" : cat}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: 14, fontWeight: 500, color: gc(c.accuracy) }}>{c.accuracy}</div>
                <div style={{ flex: 1, height: 2, background: "rgba(228,228,231,0.06)" }}>
                  <div style={{ height: "100%", width: `${c.accuracy}%`, background: catColors[cat], opacity: 0.5 }} />
                </div>
              </div>
            </div>
          );
        })}

        {/* Meta */}
        <div style={{ paddingLeft: 28, borderLeft: "1px solid rgba(228,228,231,0.05)", whiteSpace: "nowrap" }}>
          <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: 7, color: "rgba(228,228,231,0.22)", letterSpacing: "0.16em", marginBottom: 4 }}>LATENCY</div>
          <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: 14, fontWeight: 500, color: "rgba(228,228,231,0.5)" }}>{data.avgLatency}ms</div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: 7, color: "rgba(228,228,231,0.12)", letterSpacing: "0.12em" }}>
        <span>LAST RUN: {new Date(data.lastRun).toLocaleDateString()}</span>
        <span>JUDGE: {data.judge}</span>
      </div>
    </div>
  );
}
