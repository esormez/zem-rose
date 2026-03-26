"use client";
import { useState, useEffect } from "react";

interface KbData {
  documents: number;
  chunks: number | null;
  avgRetrievalScore: number | null;
  missRate: number | null;
  avgChunksPerQuery: number | null;
  queriesLogged: number;
}

export default function KbStrip() {
  const [data, setData] = useState<KbData | null>(null);

  useEffect(() => {
    fetch("/api/kb/metrics").then(r => r.json()).then(setData).catch(() => {});
  }, []);

  if (!data) return null;

  const scoreColor = !data.avgRetrievalScore ? "rgba(228,228,231,0.3)"
    : data.avgRetrievalScore >= 0.80 ? "#22c55e"
    : data.avgRetrievalScore >= 0.65 ? "#2563EB"
    : "#fb923c";

  const missColor = data.missRate === null ? "rgba(228,228,231,0.3)"
    : data.missRate <= 5 ? "#22c55e"
    : data.missRate <= 15 ? "#fb923c"
    : "#ef4444";

  const metrics = [
    { label: "DOCUMENTS", value: String(data.documents), color: "rgba(228,228,231,0.6)" },
    { label: "CHUNKS", value: data.chunks != null ? String(data.chunks) : "—", color: "rgba(228,228,231,0.6)" },
    { label: "AVG RETRIEVAL", value: data.avgRetrievalScore?.toFixed(2) ?? "—", color: scoreColor },
    { label: "MISS RATE", value: data.missRate !== null ? data.missRate + "%" : "—", color: missColor },
    { label: "AVG CHUNKS", value: data.avgChunksPerQuery?.toFixed(1) ?? "—", color: "rgba(228,228,231,0.6)" },
    { label: "QUERIES", value: String(data.queriesLogged), color: "rgba(228,228,231,0.6)" },
  ];

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
          KNOWLEDGE BASE
        </div>
        {metrics.map(({ label, value, color }, i) => (
          <div key={label} style={{
            paddingRight: 28,
            borderRight: i < metrics.length - 1 ? "1px solid rgba(228,228,231,0.05)" : "none",
            marginRight: i < metrics.length - 1 ? 28 : 0,
            flex: 1,
          }}>
            <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: 7, color: "rgba(228,228,231,0.22)", letterSpacing: "0.16em", marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace", fontSize: 14, fontWeight: 500, color }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
