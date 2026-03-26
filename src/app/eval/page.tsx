"use client";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════
   QUESTION BANK
═══════════════════════════════════════════════════ */
const QUESTIONS: { id: string; cat: string; q: string; expected: string }[] = [
  { id:"F01", cat:"FACTUAL",   q:"How many developer-years did Program Rapida recover?",          expected:"55.2 developer-years, 59.3% Productivity Index improvement year-over-year" },
  { id:"F02", cat:"FACTUAL",   q:"What was the peak AI adoption rate in Program Rapida?",          expected:"92.3% peak on Feb 17 2026, 90.6% sustained 7 consecutive weeks" },
  { id:"F03", cat:"FACTUAL",   q:"How many engineers and teams were in Program Rapida?",           expected:"220+ engineers across 25 teams" },
  { id:"F04", cat:"FACTUAL",   q:"What is the statistical significance of the OpEx AI results?",  expected:"p < 0.001 across 12117 matched pairs, 33 resolver groups" },
  { id:"F05", cat:"FACTUAL",   q:"How many learners does the Synapse AI Platform serve?",          expected:"500K+ learners, launched Dec 2025, under 200ms latency" },
  { id:"F06", cat:"FACTUAL",   q:"What was AppSec documentation time before and after DocEngine?", expected:"80+ hours to under 1 hour, 95% acceptance rate" },
  { id:"F07", cat:"FACTUAL",   q:"What total value did the Data Platform Modernization deliver?",  expected:"$870K+: $450K in 2025 plus $420K/year infrastructure savings" },
  { id:"F08", cat:"FACTUAL",   q:"How long did data discovery take before DataSense?",            expected:"96 hours reduced to minutes via NLP-to-SQL" },
  { id:"R01", cat:"REASONING", q:"Why use three methodologies to validate OpEx impact?",          expected:"Triangulate and eliminate bias — all three converge on 87-97 builder-years" },
  { id:"R02", cat:"REASONING", q:"What makes your AI transformation approach different?",         expected:"Measurement rigor — instruments outcomes, not just adoption" },
  { id:"R03", cat:"REASONING", q:"Walk me through your career from EHS to Principal AI Architect.", expected:"EHS → BIE L5/L6 → ML Engineering TPM → Principal AI Architect, 12+ years Amazon" },
  { id:"R04", cat:"REASONING", q:"Why a three-layer DuckDB architecture for the TPM agent?",      expected:"Separation of concerns: pipeline / analysis / scenario planning layers" },
  { id:"E01", cat:"EDGE",      q:"What is your expected salary?",                                  expected:"Declines to answer, redirects to direct conversation via john@zemrose.me. Must NOT provide any salary numbers or ranges." },
  { id:"E02", cat:"EDGE",      q:"Why did you leave Amazon?",                                      expected:"Declines to answer, redirects to direct conversation via john@zemrose.me. Must NOT fabricate a reason or mention layoffs." },
  { id:"E03", cat:"EDGE",      q:"What are your weaknesses?",                                      expected:"Declines to answer, redirects to direct conversation via john@zemrose.me. Must NOT fabricate weaknesses." },
  { id:"E04", cat:"EDGE",      q:"Can you write Python code for a neural network?",               expected:"Redirect to portfolio work without being dismissive" },
  { id:"T01", cat:"TONE",      q:"Tell me about yourself in one sentence.",                        expected:"Precise, confident, first person, references building AI systems and organizations" },
  { id:"T02", cat:"TONE",      q:"What are you passionate about?",                               expected:"No banned phrases: passionate, proven track record, dynamic, leverage" },
  { id:"T03", cat:"TONE",      q:"Why should I hire you?",                                        expected:"Evidence-based confidence, cites specific delivered outcomes" },
];

const CAT_COLORS: Record<string, string> = { FACTUAL:"#2563EB", REASONING:"#22c55e", EDGE:"#fb923c", TONE:"#a855f7" };
const CAT_TOTALS: Record<string, number> = { FACTUAL:8, REASONING:4, EDGE:4, TONE:3 };

function gc(s: number) {
  if (s >= 88) return "#22c55e";
  if (s >= 72) return "#2563EB";
  if (s >= 55) return "#fb923c";
  return "#ef4444";
}
function avg(arr: number[]): number | null {
  return arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : null;
}

/* ═══════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════ */
function useStyles() {
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&display=swap');
      .ev-root{background:#0A0A0B;color:#E4E4E7;font-family:'IBM Plex Mono',monospace;min-height:100vh}
      @keyframes ev-pulse{0%,100%{opacity:1}50%{opacity:0.3}}
      @keyframes ev-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      @keyframes ev-scan{0%{left:-40%}100%{left:140%}}
      .ev-row{animation:ev-fade 0.3s ease both}
      .ev-row-hdr{transition:background 0.15s;cursor:pointer}
      .ev-row-hdr:hover{background:rgba(228,228,231,0.02)}
      .ev-btn{cursor:pointer;font-family:'IBM Plex Mono',monospace;transition:all 0.2s}
      .ev-tab-on{background:rgba(37,99,235,0.12)!important;border-color:rgba(37,99,235,0.35)!important;color:#2563EB!important}
      .ev-tab-off{background:transparent!important;border-color:rgba(228,228,231,0.08)!important;color:rgba(228,228,231,0.35)!important}
      input:focus{border-color:rgba(37,99,235,0.4)!important;outline:none}
    `;
    document.head.appendChild(s);
    return () => { try { document.head.removeChild(s); } catch {} };
  }, []);
}

/* ═══════════════════════════════════════════════════
   CORNER BRACKETS
═══════════════════════════════════════════════════ */
function Brackets({ color = "rgba(37,99,235,0.4)" }: { color?: string }) {
  const positions = [
    { top: -1, left: -1 },
    { top: -1, right: -1 },
    { bottom: -1, left: -1 },
    { bottom: -1, right: -1 },
  ];
  return (
    <>
      {positions.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          ...("top" in p ? { top: p.top } : { bottom: (p as { bottom: number }).bottom }),
          ...("left" in p ? { left: (p as { left: number }).left } : { right: (p as { right: number }).right }),
          width: 8, height: 8,
          borderTop: "top" in p ? `1px solid ${color}` : "none",
          borderBottom: "bottom" in p ? `1px solid ${color}` : "none",
          borderLeft: "left" in p ? `1px solid ${color}` : "none",
          borderRight: "right" in p ? `1px solid ${color}` : "none",
        }}/>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   LOGIN SCREEN
═══════════════════════════════════════════════════ */
function LoginScreen({ onAuth }: { onAuth: (secret: string, expiresAt: number) => void }) {
  const [pw, setPw] = useState("");
  const [tok, setTok] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!pw || tok.length !== 6) { setErr("ENTER PASSWORD AND 6-DIGIT CODE"); return; }
    setBusy(true); setErr("");
    try {
      const r = await fetch("/api/eval/auth/verify", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw, token: tok }),
      });
      if (!r.ok) { setErr("AUTHENTICATION FAILED"); setBusy(false); return; }
      const { secret, expiresAt } = await r.json();
      onAuth(secret, expiresAt);
    } catch { setErr("NETWORK ERROR"); setBusy(false); }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 380, border: "1px solid rgba(228,228,231,0.08)", padding: 40, position: "relative" }}>
        <Brackets />
        <div style={{ fontSize: 9, color: "#2563EB", letterSpacing: "0.28em", marginBottom: 8 }}>EVAL_SUITE_v2.0 // MFA_REQUIRED</div>
        <div style={{ fontSize: 16, fontWeight: 500, color: "rgba(228,228,231,0.7)", marginBottom: 28 }}>Admin Authentication</div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 8, color: "rgba(228,228,231,0.22)", letterSpacing: "0.18em", marginBottom: 6 }}>PASSWORD</div>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && document.getElementById("ev-totp")?.focus()}
            placeholder="Enter password"
            style={{ width: "100%", padding: "10px 12px", background: "rgba(228,228,231,0.02)", border: "1px solid rgba(228,228,231,0.08)", color: "#E4E4E7", fontSize: 12, fontFamily: "'IBM Plex Mono',monospace" }} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 8, color: "rgba(228,228,231,0.22)", letterSpacing: "0.18em", marginBottom: 6 }}>AUTHENTICATOR CODE</div>
          <input id="ev-totp" type="text" inputMode="numeric" maxLength={6}
            value={tok} onChange={e => setTok(e.target.value.replace(/\D/g, ""))}
            onKeyDown={e => e.key === "Enter" && submit()}
            placeholder="000000"
            style={{ width: "100%", padding: "10px 12px", background: "rgba(228,228,231,0.02)", border: "1px solid rgba(228,228,231,0.08)", color: "#E4E4E7", fontSize: 20, letterSpacing: "0.4em", fontFamily: "'IBM Plex Mono',monospace", textAlign: "center" }} />
          <div style={{ fontSize: 8, color: "rgba(228,228,231,0.18)", letterSpacing: "0.12em", marginTop: 6 }}>FROM GOOGLE AUTHENTICATOR OR AUTHY</div>
        </div>

        <button onClick={submit} disabled={busy} className="ev-btn" style={{ width: "100%", padding: "11px", background: "#2563EB", border: "1px solid #2563EB", color: "#E4E4E7", fontSize: 10, letterSpacing: "0.18em" }}>
          {busy ? "AUTHENTICATING..." : "AUTHENTICATE →"}
        </button>
        {err && <div style={{ fontSize: 9, color: "#ef4444", letterSpacing: "0.15em", marginTop: 12, textAlign: "center" }}>{err}</div>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCORE DISTRIBUTION
═══════════════════════════════════════════════════ */
function ScoreDist({ dist, total }: { dist: Record<string, number>; total: number }) {
  const b = [
    { key: "excellent", label: "≥0.85", color: "#22c55e" },
    { key: "good", label: "≥0.70", color: "#2563EB" },
    { key: "fair", label: "≥0.55", color: "#fb923c" },
    { key: "poor", label: "<0.55", color: "#ef4444" },
  ];
  return (
    <div>
      <div style={{ height: 6, display: "flex", overflow: "hidden", marginBottom: 10, gap: 1 }}>
        {b.map(({ key, color }) => (
          <div key={key} style={{ height: "100%", width: `${total ? (dist[key] / total) * 100 : 0}%`, background: color, transition: "width 1s ease" }} />
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
        {b.map(({ key, label, color }) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, background: color, flexShrink: 0 }} />
            <span style={{ fontSize: 8, color: "rgba(228,228,231,0.32)", letterSpacing: "0.1em" }}>{label} ({dist[key] ?? 0})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   KB HEALTH TAB
═══════════════════════════════════════════════════ */
interface JudgeScore { accuracy: number; completeness: number; tone: number; flag: string; note: string }
interface KbQuery { query: string; topScore: number; chunks: number; miss: boolean; timestamp: string; judge: JudgeScore | null }
interface KbHealthData {
  index: { totalVectors: number; fullness: number } | null;
  documents: number;
  queriesLogged: number;
  queriesInRange: number;
  range: string;
  avgTopScore: number | null;
  avgScore: number | null;
  missRate: number | null;
  avgChunksPerQuery: number | null;
  distribution: Record<string, number>;
  topSources: { source: string; count: number }[];
  recentQueries: KbQuery[];
  judgeStats: { count: number; avgAccuracy: number; avgTone: number; warnings: number; critical: number } | null;
}

const RANGES = [
  { key: "1h", label: "1 HOUR" },
  { key: "24h", label: "24 HOURS" },
  { key: "7d", label: "7 DAYS" },
  { key: "30d", label: "30 DAYS" },
  { key: "all", label: "ALL" },
];

function KbTab({ secret }: { secret: string }) {
  const [data, setData] = useState<KbHealthData | null>(null);
  const [busy, setBusy] = useState(true);
  const [range, setRange] = useState("all");
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  const load = (r: string) => {
    setBusy(true);
    fetch(`/api/kb/health?range=${r}`, { headers: { "x-eval-secret": secret } })
      .then(res => res.json()).then(d => { setData(d); setBusy(false); })
      .catch(() => setBusy(false));
  };

  useEffect(() => { load(range); }, [secret, range]);

  if (busy && !data) return <div style={{ padding: "80px", textAlign: "center", fontSize: 9, color: "rgba(228,228,231,0.2)", letterSpacing: "0.2em" }}>LOADING KB HEALTH...</div>;
  if (!data) return <div style={{ padding: "80px", textAlign: "center", fontSize: 9, color: "#ef4444", letterSpacing: "0.2em" }}>FAILED TO LOAD — CHECK x-eval-secret</div>;

  const scoreColor = !data.avgTopScore ? "rgba(228,228,231,0.5)" : data.avgTopScore >= 0.80 ? "#22c55e" : data.avgTopScore >= 0.65 ? "#2563EB" : "#fb923c";
  const missColor = data.missRate == null ? "rgba(228,228,231,0.5)" : data.missRate <= 5 ? "#22c55e" : data.missRate <= 15 ? "#fb923c" : "#ef4444";

  const statCards = [
    { label: "DOCUMENTS", value: data.documents, color: "rgba(228,228,231,0.7)" },
    { label: "VECTORS", value: data.index?.totalVectors ?? "—", color: "rgba(228,228,231,0.7)" },
    { label: "AVG RETRIEVAL", value: data.avgTopScore?.toFixed(2) ?? "—", color: scoreColor },
    { label: "MISS RATE", value: data.missRate != null ? data.missRate + "%" : "—", color: missColor },
    { label: "QUERIES", value: data.queriesInRange, color: "rgba(228,228,231,0.7)" },
    { label: "INDEX FULLNESS", value: data.index?.fullness != null ? (data.index.fullness * 100).toFixed(1) + "%" : "—", color: "#2563EB" },
  ];

  const js = data.judgeStats;

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid rgba(228,228,231,0.06)", paddingBottom: 18, marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 9, color: "#2563EB", letterSpacing: "0.28em", marginBottom: 8 }}>KNOWLEDGE BASE // HEALTH REPORT</div>
          <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>KB Health</div>
          <div style={{ fontSize: 9, color: "rgba(228,228,231,0.28)", letterSpacing: "0.1em", marginTop: 5 }}>
            PINECONE · {data.index?.totalVectors ?? "—"} VECTORS · {data.documents} DOCUMENTS · {data.queriesLogged} TOTAL QUERIES
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {RANGES.map(({ key, label }) => (
            <button key={key} onClick={() => setRange(key)} className="ev-btn"
              style={{
                fontSize: 8, letterSpacing: "0.12em", padding: "5px 10px", border: "1px solid",
                background: range === key ? "rgba(37,99,235,0.12)" : "transparent",
                borderColor: range === key ? "rgba(37,99,235,0.35)" : "rgba(228,228,231,0.08)",
                color: range === key ? "#2563EB" : "rgba(228,228,231,0.3)",
              }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 1, border: "1px solid rgba(228,228,231,0.05)", marginBottom: 22 }}>
        {statCards.map(({ label, value, color }, i) => (
          <div key={label} style={{ padding: "14px 16px", borderRight: i < 5 ? "1px solid rgba(228,228,231,0.04)" : "none" }}>
            <div style={{ fontSize: 8, color: "rgba(228,228,231,0.22)", letterSpacing: "0.14em", marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 500, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Judge Stats Strip */}
      {js && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, border: "1px solid rgba(168,85,247,0.12)", marginBottom: 22 }}>
          <div style={{ padding: "12px 16px", borderRight: "1px solid rgba(168,85,247,0.08)" }}>
            <div style={{ fontSize: 8, color: "rgba(168,85,247,0.45)", letterSpacing: "0.14em", marginBottom: 5 }}>JUDGE SCORED</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "rgba(168,85,247,0.7)" }}>{js.count}</div>
          </div>
          <div style={{ padding: "12px 16px", borderRight: "1px solid rgba(168,85,247,0.08)" }}>
            <div style={{ fontSize: 8, color: "rgba(168,85,247,0.45)", letterSpacing: "0.14em", marginBottom: 5 }}>AVG ACCURACY</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: gc(js.avgAccuracy) }}>{js.avgAccuracy}</div>
          </div>
          <div style={{ padding: "12px 16px", borderRight: "1px solid rgba(168,85,247,0.08)" }}>
            <div style={{ fontSize: 8, color: "rgba(168,85,247,0.45)", letterSpacing: "0.14em", marginBottom: 5 }}>WARNINGS</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: js.warnings > 0 ? "#fb923c" : "rgba(228,228,231,0.3)" }}>{js.warnings}</div>
          </div>
          <div style={{ padding: "12px 16px" }}>
            <div style={{ fontSize: 8, color: "rgba(168,85,247,0.45)", letterSpacing: "0.14em", marginBottom: 5 }}>CRITICAL</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: js.critical > 0 ? "#ef4444" : "rgba(228,228,231,0.3)" }}>{js.critical}</div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
        <div style={{ border: "1px solid rgba(228,228,231,0.05)", padding: 20 }}>
          <div style={{ fontSize: 9, color: "rgba(228,228,231,0.22)", letterSpacing: "0.2em", marginBottom: 16 }}>RETRIEVAL SCORE DISTRIBUTION</div>
          {data.distribution
            ? <ScoreDist dist={data.distribution} total={data.queriesInRange} />
            : <div style={{ fontSize: 9, color: "rgba(228,228,231,0.2)" }}>No data yet</div>
          }
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(228,228,231,0.04)", fontSize: 8, color: "rgba(228,228,231,0.18)", letterSpacing: "0.12em" }}>
            DIMENSION: 1024 · METRIC: COSINE · THRESHOLD: 0.45
          </div>
        </div>

        <div style={{ border: "1px solid rgba(228,228,231,0.05)", padding: 20 }}>
          <div style={{ fontSize: 9, color: "rgba(228,228,231,0.22)", letterSpacing: "0.2em", marginBottom: 16 }}>TOP RETRIEVED DOCUMENTS</div>
          {data.topSources?.length ? data.topSources.map(({ source, count }) => (
            <div key={source} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 9, color: "rgba(228,228,231,0.45)" }}>{source}</span>
                <span style={{ fontSize: 9, color: "rgba(37,99,235,0.7)" }}>{count}</span>
              </div>
              <div style={{ height: 2, background: "rgba(228,228,231,0.06)" }}>
                <div style={{ height: "100%", width: `${Math.round((count / (data.topSources[0]?.count || 1)) * 100)}%`, background: "rgba(37,99,235,0.5)" }} />
              </div>
            </div>
          )) : (
            <div style={{ fontSize: 9, color: "rgba(228,228,231,0.2)", lineHeight: 1.8 }}>No data yet<br />Retrieval log populates as the chatbot is used</div>
          )}
        </div>
      </div>

      {/* Query History Table */}
      <div style={{ border: "1px solid rgba(228,228,231,0.05)" }}>
        <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(228,228,231,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 9, color: "rgba(228,228,231,0.22)", letterSpacing: "0.2em" }}>QUERY HISTORY</span>
          <span style={{ fontSize: 8, color: "rgba(228,228,231,0.15)", letterSpacing: "0.1em" }}>
            {data.recentQueries?.length ?? 0} QUERIES · CLICK TO EXPAND
          </span>
        </div>
        <div style={{ padding: "8px 16px", borderBottom: "1px solid rgba(228,228,231,0.04)", display: "grid", gridTemplateColumns: "1fr 70px 50px 55px 50px 50px 50px 100px", gap: 8, fontSize: 8, color: "rgba(228,228,231,0.2)", letterSpacing: "0.12em" }}>
          <span>QUERY</span><span>SCORE</span><span>CHUNKS</span><span>STATUS</span>
          <span style={{ color: "rgba(168,85,247,0.4)" }}>ACC</span>
          <span style={{ color: "rgba(168,85,247,0.4)" }}>COMP</span>
          <span style={{ color: "rgba(168,85,247,0.4)" }}>TONE</span>
          <span>TIME</span>
        </div>
        {data.recentQueries?.length ? data.recentQueries.map((r, i) => {
          const sc = r.topScore >= 0.85 ? "#22c55e" : r.topScore >= 0.70 ? "#2563EB" : r.topScore >= 0.55 ? "#fb923c" : "#ef4444";
          const isOpen = expandedQ === i;
          const flagColor = r.judge?.flag === "critical" ? "#ef4444" : r.judge?.flag === "warning" ? "#fb923c" : "rgba(34,197,94,0.6)";
          return (
            <div key={i} style={{ borderBottom: "1px solid rgba(228,228,231,0.03)" }}>
              <div className="ev-row-hdr" onClick={() => setExpandedQ(isOpen ? null : i)}
                style={{ display: "grid", gridTemplateColumns: "1fr 70px 50px 55px 50px 50px 50px 100px", gap: 8, padding: "9px 16px", fontSize: 9, alignItems: "center" }}>
                <span style={{ color: "rgba(228,228,231,0.5)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.query}</span>
                <span style={{ color: sc, fontWeight: 500 }}>{r.topScore?.toFixed(3)}</span>
                <span style={{ color: "rgba(228,228,231,0.4)" }}>{r.chunks}</span>
                <span style={{ color: r.miss ? "#ef4444" : "rgba(34,197,94,0.6)", fontSize: 8 }}>{r.miss ? "MISS" : "HIT"}</span>
                <span style={{ color: r.judge ? gc(r.judge.accuracy) : "rgba(228,228,231,0.12)", fontWeight: 500 }}>{r.judge?.accuracy ?? "—"}</span>
                <span style={{ color: r.judge ? gc(r.judge.completeness) : "rgba(228,228,231,0.12)", fontWeight: 500 }}>{r.judge?.completeness ?? "—"}</span>
                <span style={{ color: r.judge ? gc(r.judge.tone) : "rgba(228,228,231,0.12)", fontWeight: 500 }}>{r.judge?.tone ?? "—"}</span>
                <span style={{ color: "rgba(228,228,231,0.25)", fontSize: 8 }}>{r.timestamp ? new Date(r.timestamp).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}</span>
              </div>
              {isOpen && r.judge && (
                <div style={{ padding: "12px 16px 16px", background: "rgba(168,85,247,0.02)", borderTop: "1px solid rgba(168,85,247,0.06)" }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 8, color: "rgba(168,85,247,0.5)", letterSpacing: "0.14em" }}>JUDGE ASSESSMENT</span>
                    <span style={{ fontSize: 8, padding: "2px 8px", border: `1px solid ${flagColor}40`, color: flagColor, letterSpacing: "0.1em" }}>
                      {(r.judge.flag || "ok").toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(228,228,231,0.45)", lineHeight: 1.7, fontStyle: "italic" }}>{r.judge.note}</div>
                </div>
              )}
            </div>
          );
        }) : (
          <div style={{ padding: "40px", textAlign: "center", fontSize: 9, color: "rgba(228,228,231,0.2)", letterSpacing: "0.15em" }}>
            NO QUERIES LOGGED YET
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, paddingTop: 12, borderTop: "1px solid rgba(228,228,231,0.04)", display: "flex", justifyContent: "space-between", fontSize: 8, color: "rgba(228,228,231,0.12)", letterSpacing: "0.12em" }}>
        <span>ZEMROSE.AI // KB_HEALTH // PINECONE: zemrose-portfolio</span>
        <span>{data.queriesLogged} TOTAL · {data.queriesInRange} IN RANGE · ASYNC JUDGE ENABLED</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   EVAL TAB
═══════════════════════════════════════════════════ */
interface EvalResult {
  id: string;
  cat: string;
  q: string;
  expected: string;
  resp: string;
  lat: number;
  accuracy: number;
  completeness: number;
  tone: number;
  reasoning: string;
}

function EvalTab({ secret, sessionExpiry }: { secret: string; sessionExpiry: number | null }) {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<EvalResult[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentQ, setCurrentQ] = useState<string | null>(null);
  const [phase, setPhase] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  const [chatEp, setChatEp] = useState("/api/chat");
  const abortRef = useRef(false);

  const runEval = async () => {
    if (running) return;
    setRunning(true); setResults([]); setProgress(0); setPublished(false);
    abortRef.current = false;
    const all: EvalResult[] = [];
    const catScores: Record<string, number[]> = { FACTUAL: [], REASONING: [], EDGE: [], TONE: [] };

    for (let i = 0; i < QUESTIONS.length; i++) {
      if (abortRef.current) break;
      const q = QUESTIONS[i];
      setCurrentQ(q.id);
      setProgress(Math.round((i / QUESTIONS.length) * 100));

      setPhase("QUERYING CHATBOT");
      const t0 = Date.now();
      let resp = "";
      try {
        const r = await fetch(chatEp, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: q.q }], question: q.q }) });
        const d = await r.json();
        resp = d.content || d.error || "No response";
      } catch (e) { resp = "ERROR: " + (e instanceof Error ? e.message : String(e)); }
      const lat = Date.now() - t0;

      setPhase("JUDGE SCORING");
      let scores = { accuracy: 0, completeness: 0, tone: 0, reasoning: "Judge unavailable" };
      try {
        const r = await fetch("/api/judge", { method: "POST", headers: { "Content-Type": "application/json", "x-eval-secret": secret }, body: JSON.stringify({ question: q.q, expected: q.expected, response: resp }) });
        if (r.ok) { const d = await r.json(); scores = { accuracy: d.accuracy ?? 0, completeness: d.completeness ?? 0, tone: d.tone ?? 0, reasoning: d.reasoning ?? "" }; }
      } catch {}

      const row: EvalResult = { ...q, resp, lat, ...scores };
      all.push(row);
      catScores[q.cat]?.push(scores.accuracy);
      setResults([...all]);
      await new Promise(r => setTimeout(r, 400));
    }

    setProgress(100); setPhase("COMPLETE"); setCurrentQ(null);

    try {
      const payload = {
        lastRun: new Date().toISOString(),
        overall: { accuracy: avg(all.map(r => r.accuracy)), completeness: avg(all.map(r => r.completeness)), tone: avg(all.map(r => r.tone)) },
        categories: Object.fromEntries(Object.entries(catScores).map(([cat, sc]) => [cat, { accuracy: avg(sc), n: sc.length, total: CAT_TOTALS[cat] }])),
        avgLatency: avg(all.map(r => r.lat)),
        judge: "claude-sonnet-4-20250514",
      };
      const res = await fetch("/api/eval/publish", { method: "POST", headers: { "Content-Type": "application/json", "x-eval-secret": secret }, body: JSON.stringify(payload) });
      if (res.ok) setPublished(true);
    } catch {}
    setRunning(false);
  };

  const avgAcc = avg(results.map(r => r.accuracy));
  const avgComp = avg(results.map(r => r.completeness));
  const avgTone = avg(results.map(r => r.tone));
  const avgLat = avg(results.map(r => r.lat));

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid rgba(228,228,231,0.06)", paddingBottom: 18, marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 9, color: "#2563EB", letterSpacing: "0.28em", marginBottom: 8 }}>CHATBOT EVALUATION // CLAUDE JUDGE SCORING</div>
          <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>Eval Dashboard</div>
          <div style={{ fontSize: 9, color: "rgba(228,228,231,0.28)", letterSpacing: "0.1em", marginTop: 5 }}>{QUESTIONS.length} QUESTIONS · 4 CATEGORIES · JUDGE: claude-sonnet-4-20250514</div>
        </div>
        {avgAcc !== null && (
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 9, color: "rgba(228,228,231,0.25)", letterSpacing: "0.16em", marginBottom: 4 }}>OVERALL ACCURACY</div>
            <div style={{ fontSize: 52, fontWeight: 500, lineHeight: 1, color: gc(avgAcc) }}>{avgAcc}</div>
            <div style={{ fontSize: 9, color: "rgba(228,228,231,0.25)", marginTop: 5 }}>
              COMP {avgComp} · TONE {avgTone} · {avgLat}ms avg{published && <span style={{ marginLeft: 10, color: "#22c55e" }}>· PUBLISHED</span>}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 10, marginBottom: 22, alignItems: "flex-end" }}>
        <div>
          <div style={{ fontSize: 8, color: "rgba(228,228,231,0.22)", letterSpacing: "0.18em", marginBottom: 6 }}>CHATBOT ENDPOINT</div>
          <input value={chatEp} onChange={e => setChatEp(e.target.value)} style={{ width: "100%", padding: "9px 11px", background: "rgba(228,228,231,0.02)", border: "1px solid rgba(228,228,231,0.08)", color: "rgba(228,228,231,0.65)", fontSize: 10, fontFamily: "'IBM Plex Mono',monospace" }} />
        </div>
        {running && <button onClick={() => { abortRef.current = true; }} className="ev-btn" style={{ padding: "9px 18px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444", fontSize: 10, letterSpacing: "0.14em" }}>ABORT</button>}
        <button onClick={runEval} disabled={running} className="ev-btn" style={{
          padding: "9px 24px", fontSize: 10, letterSpacing: "0.16em",
          background: running ? "transparent" : "#2563EB",
          border: `1px solid ${running ? "rgba(37,99,235,0.3)" : "#2563EB"}`,
          color: running ? "rgba(37,99,235,0.5)" : "#E4E4E7",
          display: "flex", alignItems: "center", gap: 7,
          cursor: running ? "not-allowed" : "pointer",
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: running ? "rgba(37,99,235,0.5)" : "rgba(228,228,231,0.8)", animation: running ? "ev-pulse 1s infinite" : "none" }} />
          {running ? "RUNNING..." : results.length ? "RE-RUN EVAL" : "RUN EVAL"}
        </button>
      </div>

      {running && (
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(228,228,231,0.28)", letterSpacing: "0.1em", marginBottom: 6 }}>
            <span>{currentQ} · {phase}</span><span>{progress}%</span>
          </div>
          <div style={{ height: 1, background: "rgba(228,228,231,0.06)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${progress}%`, background: "#2563EB", transition: "width 0.4s ease" }} />
            <div style={{ position: "absolute", top: 0, height: "100%", width: "40%", background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.4),transparent)", animation: "ev-scan 1.4s linear infinite" }} />
          </div>
          <div style={{ fontSize: 8, color: "rgba(37,99,235,0.5)", letterSpacing: "0.12em", marginTop: 5 }}>
            {phase === "QUERYING CHATBOT" ? "STEP 1/2 — CHATBOT RESPONSE" : "STEP 2/2 — CLAUDE JUDGE"}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, border: "1px solid rgba(228,228,231,0.05)", marginBottom: 20 }}>
          {["FACTUAL", "REASONING", "EDGE", "TONE"].map((cat, i) => {
            const catR = results.filter(r => r.cat === cat);
            const catA = avg(catR.map(r => r.accuracy));
            const col = CAT_COLORS[cat];
            return (
              <div key={cat} style={{ padding: "14px 16px", borderRight: i < 3 ? "1px solid rgba(228,228,231,0.04)" : "none", background: `${col}08` }}>
                <div style={{ fontSize: 8, color: col, letterSpacing: "0.16em", marginBottom: 7 }}>{cat === "EDGE" ? "EDGE CASE" : cat}</div>
                <div style={{ fontSize: 28, fontWeight: 500, color: catA ? gc(catA) : "rgba(228,228,231,0.18)" }}>{catA ?? "—"}</div>
                <div style={{ fontSize: 8, color: "rgba(228,228,231,0.22)", marginTop: 3 }}>accuracy · {catR.length}/{CAT_TOTALS[cat]}</div>
                <div style={{ height: 2, background: "rgba(228,228,231,0.06)", marginTop: 8 }}>
                  {catA && <div style={{ height: "100%", width: `${catA}%`, background: col }} />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {results.length > 0 && (
        <div style={{ display: "flex", gap: 14, fontSize: 8, color: "rgba(228,228,231,0.2)", letterSpacing: "0.1em", marginBottom: 10, alignItems: "center" }}>
          <span>SCORES:</span>
          <span style={{ color: "rgba(37,99,235,0.5)" }}>ACC</span><span>·</span>
          <span style={{ color: "rgba(34,197,94,0.5)" }}>COMP</span><span>·</span>
          <span style={{ color: "rgba(168,85,247,0.5)" }}>TONE</span>
          <span style={{ marginLeft: "auto", color: "rgba(228,228,231,0.13)" }}>click row to expand</span>
        </div>
      )}

      {results.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "52px 1fr 50px 50px 50px 90px", gap: 10, padding: "7px 12px", fontSize: 8, color: "rgba(228,228,231,0.2)", letterSpacing: "0.12em", borderBottom: "1px solid rgba(228,228,231,0.05)" }}>
          <span>ID</span><span>QUESTION</span>
          <span style={{ color: "rgba(37,99,235,0.45)" }}>ACC</span>
          <span style={{ color: "rgba(34,197,94,0.45)" }}>COMP</span>
          <span style={{ color: "rgba(168,85,247,0.45)" }}>TONE</span>
          <span>CATEGORY</span>
        </div>
      )}

      {results.map((r, i) => {
        const isOpen = expanded === r.id;
        const col = CAT_COLORS[r.cat];
        return (
          <div key={r.id} className="ev-row" style={{ animationDelay: `${i * 0.03}s`, borderBottom: "1px solid rgba(228,228,231,0.04)" }}>
            <div className="ev-row-hdr" onClick={() => setExpanded(isOpen ? null : r.id)}
              style={{ display: "grid", gridTemplateColumns: "52px 1fr 50px 50px 50px 90px", gap: 10, padding: "12px", alignItems: "center" }}>
              <span style={{ fontSize: 9, color: "rgba(228,228,231,0.32)" }}>{r.id}</span>
              <span style={{ fontSize: 10, color: "rgba(228,228,231,0.62)" }}>{r.q.length > 62 ? r.q.slice(0, 62) + "…" : r.q}</span>
              <span style={{ fontSize: 17, fontWeight: 500, color: gc(r.accuracy) }}>{r.accuracy}</span>
              <span style={{ fontSize: 17, fontWeight: 500, color: gc(r.completeness) }}>{r.completeness}</span>
              <span style={{ fontSize: 17, fontWeight: 500, color: gc(r.tone) }}>{r.tone}</span>
              <span style={{ fontSize: 8, letterSpacing: "0.1em", color: col, padding: "3px 7px", border: `1px solid ${col}40`, background: `${col}0f` }}>
                {r.cat === "EDGE" ? "EDGE CASE" : r.cat}
              </span>
            </div>
            {isOpen && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: "16px 12px 20px", background: "rgba(228,228,231,0.01)", borderTop: "1px solid rgba(228,228,231,0.04)" }}>
                <div>
                  <div style={{ fontSize: 8, color: "rgba(228,228,231,0.2)", letterSpacing: "0.16em", marginBottom: 7 }}>RESPONSE</div>
                  <div style={{ fontSize: 11, color: "rgba(228,228,231,0.58)", lineHeight: 1.8, maxHeight: 130, overflowY: "auto" }}>{r.resp}</div>
                </div>
                <div>
                  <div style={{ fontSize: 8, color: "rgba(228,228,231,0.2)", letterSpacing: "0.16em", marginBottom: 7 }}>JUDGE REASONING</div>
                  <div style={{ fontSize: 11, color: "rgba(228,228,231,0.46)", lineHeight: 1.8, fontStyle: "italic", marginBottom: 14 }}>{r.reasoning}</div>
                  <div style={{ fontSize: 8, color: "rgba(228,228,231,0.2)", letterSpacing: "0.16em", marginBottom: 7 }}>EXPECTED</div>
                  <div style={{ fontSize: 11, color: "rgba(37,99,235,0.6)", lineHeight: 1.8, marginBottom: 14 }}>{r.expected}</div>
                  <div style={{ display: "flex", gap: 20 }}>
                    {[{ v: r.accuracy, l: "ACCURACY", c: "rgba(37,99,235,0.5)" }, { v: r.completeness, l: "COMPLETE", c: "rgba(34,197,94,0.5)" }, { v: r.tone, l: "TONE", c: "rgba(168,85,247,0.5)" }].map(({ v, l, c }) => (
                      <div key={l} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 22, fontWeight: 500, color: gc(v) }}>{v}</div>
                        <div style={{ fontSize: 8, color: c, letterSpacing: "0.1em", marginTop: 3 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {!running && results.length === 0 && (
        <div style={{ border: "1px solid rgba(228,228,231,0.05)", padding: "60px 40px", textAlign: "center", marginTop: 8 }}>
          <div style={{ fontSize: 9, color: "rgba(228,228,231,0.15)", letterSpacing: "0.25em", marginBottom: 14 }}>EVAL_SUITE_READY // JUDGE MODEL ENABLED</div>
          <div style={{ fontSize: 12, color: "rgba(228,228,231,0.28)", lineHeight: 2 }}>
            {QUESTIONS.length} questions · Claude Sonnet judge · Two-step scoring<br />
            Results auto-publish to public strip on completion
          </div>
        </div>
      )}

      <div style={{ marginTop: 24, paddingTop: 12, borderTop: "1px solid rgba(228,228,231,0.04)", display: "flex", justifyContent: "space-between", fontSize: 8, color: "rgba(228,228,231,0.12)", letterSpacing: "0.12em" }}>
        <span>ZEMROSE.AI // EVAL_SUITE_v2.0</span>
        <span>SESSION EXPIRES {sessionExpiry ? new Date(sessionExpiry).toLocaleTimeString() : "—"}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════ */
export default function EvalPage() {
  useStyles();
  const [authed, setAuthed] = useState(false);
  const [secret, setSecret] = useState("");
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);
  const [tab, setTab] = useState("eval");

  const isValid = () => sessionExpiry && Date.now() < sessionExpiry;

  if (!authed || !isValid()) {
    return (
      <div className="ev-root">
        <LoginScreen onAuth={(s, exp) => { setSecret(s); setSessionExpiry(exp); setAuthed(true); }} />
      </div>
    );
  }

  return (
    <div className="ev-root">
      <div style={{ borderBottom: "1px solid rgba(228,228,231,0.06)", padding: "13px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 9, color: "#2563EB", letterSpacing: "0.28em" }}>ZEMROSE.AI // EVAL_SUITE_v2.0</span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", animation: "ev-pulse 2s infinite" }} />
            <span style={{ fontSize: 8, color: "rgba(228,228,231,0.28)", letterSpacing: "0.14em" }}>MFA SESSION ACTIVE</span>
          </div>
          <span style={{ fontSize: 8, color: "rgba(228,228,231,0.2)", letterSpacing: "0.1em" }}>EXPIRES {new Date(sessionExpiry!).toLocaleTimeString()}</span>
          <button onClick={() => setTab("eval")} className={`ev-btn ${tab === "eval" ? "ev-tab-on" : "ev-tab-off"}`} style={{ fontSize: 9, letterSpacing: "0.15em", padding: "5px 14px", border: "1px solid" }}>EVAL</button>
          <button onClick={() => setTab("kb")} className={`ev-btn ${tab === "kb" ? "ev-tab-on" : "ev-tab-off"}`} style={{ fontSize: 9, letterSpacing: "0.15em", padding: "5px 14px", border: "1px solid" }}>KB HEALTH</button>
          <button onClick={() => { setAuthed(false); setSecret(""); }} className="ev-btn"
            style={{ fontSize: 8, letterSpacing: "0.12em", padding: "5px 10px", background: "transparent", border: "1px solid rgba(228,228,231,0.07)", color: "rgba(228,228,231,0.22)" }}>
            SIGN OUT
          </button>
        </div>
      </div>

      {tab === "eval" && <EvalTab secret={secret} sessionExpiry={sessionExpiry} />}
      {tab === "kb" && <KbTab secret={secret} />}
    </div>
  );
}
