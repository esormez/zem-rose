"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════
   INTERSECTION OBSERVER HOOK
═══════════════════════════════════════════════════ */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* ═══════════════════════════════════════════════════
   IS MOBILE HOOK
═══════════════════════════════════════════════════ */
function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 769);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 769);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return mobile;
}

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "PRJ-001", title: "Program Rapida",
    subtitle: "AI-Native Engineering Transformation",
    tags: ["AI Transformation", "AWS", "220+ Engineers"],
    status: "ACTIVE", version: "v2.5.0", coord: "36.1°N/86.7°W", year: "2025",
    metrics: [{ l:"DEV-YRS SAVED", v:"55.2" },{ l:"ADOPTION", v:"90.6%" },{ l:"PI GAIN", v:"59.3%" }],
    desc: "Leading organization-wide AI transformation across 220+ engineers and 25 teams. Q1 2026: 90.6% adoption sustained 7 consecutive weeks, 55.2 developer-years recovered, 59.3% Productivity Index improvement year-over-year.",
  },
  {
    id: "PRJ-002", title: "OpEx AI Assistant",
    subtitle: "Controlled Impact — 87–97 Builder-Years Saved",
    tags: ["Semantic ML", "Controlled Study", "p<0.001"],
    status: "ACTIVE", version: "v3.1.0", coord: "36.1°N/86.7°W", year: "2026",
    metrics: [{ l:"BUILDER-YRS", v:"87–97" },{ l:"TICKETS", v:"77.8k" },{ l:"MTTR Δ", v:"−26hrs" }],
    desc: "AI ticket resolution system validated via semantic similarity analysis across 12,117 matched pairs. Three independent methodologies converge on 87–97 builder-years saved in Q1 2026 alone (p < 0.001, 33 resolver groups).",
  },
  {
    id: "PRJ-003", title: "Synapse AI Platform",
    subtitle: "RAG, Evaluation & Content Intelligence",
    tags: ["RAG", "LLM Eval", "OpenSearch"],
    status: "LIVE", version: "v1.0.0", coord: "47.6°N/122.3°W", year: "2025",
    metrics: [{ l:"LEARNERS", v:"500K+" },{ l:"LATENCY", v:"<200ms" },{ l:"LAUNCH", v:"Dec 2025" }],
    desc: "Principal AI Architect across three interconnected production GenAI services: vector search RAG retrieval, LLM content evaluation framework (4 quality dimensions), and self-service content analysis portal. Named security guardian on 5 platform reviews.",
  },
  {
    id: "PRJ-004", title: "TPM Agent System",
    subtitle: "DocEngine — Sole Designer & Builder",
    tags: ["Agentic AI", "DuckDB", "MCP"],
    status: "DEPLOYED", version: "v2.0.0", coord: "36.1°N/86.7°W", year: "2025",
    metrics: [{ l:"APPSEC TIME", v:"80HR→<1HR" },{ l:"ACCEPT RATE", v:"95%" },{ l:"STATUS", v:"ORG STANDARD" }],
    desc: "Built independently end-to-end: three-layer DuckDB architecture, 4 MCP integrations, 14 production SOPs. AppSec documentation from 80+ hours to under 1 hour. SAA compliance assessments from 120+ hours to under 1 hour. Top performer in Q1 2026 productivity package.",
  },
  {
    id: "PRJ-005", title: "Data Platform Modernization",
    subtitle: "Petabyte-Scale Analytics Decoupling",
    tags: ["Lake Formation", "CDK", "Redshift"],
    status: "DEPLOYED", version: "v1.0.0", coord: "47.6°N/122.3°W", year: "2025",
    metrics: [{ l:"VALUE", v:"$870K+" },{ l:"WAIT TIME Δ", v:"−95%" },{ l:"SEC FINDINGS", v:"0" }],
    desc: "Transformed petabyte-scale data platform from monolithic to self-service model. Eliminated 2–4 week wait times for 20+ BI engineers. Delivered $450K in 2025 with $420K/year infrastructure savings on legacy decommission. Zero post-launch security findings.",
  },
  {
    id: "PRJ-006", title: "DataSense",
    subtitle: "NLP-to-SQL Data Discovery & Governance",
    tags: ["NLP-to-SQL", "LangChain", "Neptune"],
    status: "LIVE", version: "v1.0.0", coord: "47.6°N/122.3°W", year: "2025",
    metrics: [{ l:"DISCOVERY TIME", v:"96HR→MINS" },{ l:"INTERFACE", v:"NLP → SQL" },{ l:"AGENT", v:"LANGCHAIN" }],
    desc: "AI-powered data discovery platform eliminating weeks of manual data relationship investigation. Contributed to prototype knowledge base metadata collection, architecture design, LangChain agent implementation, and served as named security guardian. NLP-to-SQL over Neptune knowledge graph and lineage system.",
  },
];

const SKILLS = [
  { label: "AI/ML Architecture",  pct: 95 },
  { label: "Program Leadership",  pct: 95 },
  { label: "BI & Analytics",      pct: 92 },
  { label: "ML Engineering",      pct: 88 },
  { label: "Agentic Systems",     pct: 90 },
  { label: "Data Engineering",    pct: 92 },
];

const SUGGESTED_QUESTIONS = [
  "What did Program Rapida actually accomplish?",
  "How did you measure the 87–97 builder-years figure?",
  "What did you build yourself vs. lead as a program?",
  "Walk me through your career arc",
  "What is the Synapse AI Platform?",
  "How do you think about AI adoption vs. engagement?",
];

/* ═══════════════════════════════════════════════════
   TYPEWRITER EFFECT HOOK
═══════════════════════════════════════════════════ */
function useTypewriter(text: string, active: boolean, speed = 12) {
  const [displayed, setDisplayed] = useState("");
  const iRef = useRef(0);
  useEffect(() => {
    if (!active) { setDisplayed(text); return; }
    setDisplayed("");
    iRef.current = 0;
    const id = setInterval(() => {
      iRef.current++;
      setDisplayed(text.slice(0, iRef.current));
      if (iRef.current >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return displayed;
}

/* ═══════════════════════════════════════════════════
   SINGLE MESSAGE BUBBLE
═══════════════════════════════════════════════════ */
interface Message {
  role: string;
  content: string;
}

function MessageBubble({ msg, isLatest }: { msg: Message; isLatest: boolean }) {
  const isUser = msg.role === "user";
  const text = useTypewriter(msg.content, !isUser && isLatest, 10);

  return (
    <div className={isUser ? "msg-user" : "msg-system"}
      style={{ display:"flex", flexDirection:"column", gap:4, maxWidth:"82%",
        animation: "fade-up 0.3s ease both" }}>
      <div className="mono" style={{
        fontSize: 9, letterSpacing:"0.18em",
        color: isUser ? "rgba(37,99,235,0.6)" : "rgba(228,228,231,0.25)",
        textAlign: isUser ? "right" : "left",
        marginBottom: 2,
      }}>
        {isUser ? "YOU" : "SYS // ZEMROSE.AI"}
      </div>
      <div style={{
        padding: "10px 14px",
        border: "1px solid",
        borderColor: isUser ? "rgba(37,99,235,0.25)" : "rgba(228,228,231,0.08)",
        background: isUser ? "rgba(37,99,235,0.07)" : "rgba(228,228,231,0.02)",
        fontSize: 13,
        lineHeight: 1.65,
        color: "rgba(228,228,231,0.85)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
      }}>
        {!isUser && isLatest ? text : msg.content}
        {!isUser && isLatest && text.length < msg.content.length && (
          <span style={{
            display:"inline-block", width:2, height:13,
            background:"#2563EB", marginLeft:2, verticalAlign:"middle",
            animation:"cursor-blink 0.7s infinite",
          }} />
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TYPING INDICATOR
═══════════════════════════════════════════════════ */
function TypingIndicator() {
  return (
    <div className="msg-system" style={{ display:"flex", flexDirection:"column", gap:4 }}>
      <div className="mono" style={{ fontSize:9, letterSpacing:"0.18em", color:"rgba(228,228,231,0.25)" }}>
        SYS // ZEMROSE.AI
      </div>
      <div style={{
        padding:"12px 16px", border:"1px solid rgba(228,228,231,0.08)",
        background:"rgba(228,228,231,0.02)",
        display:"flex", gap:5, alignItems:"center",
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width:5, height:5, borderRadius:"50%", background:"rgba(37,99,235,0.6)",
            animation:`typing-dot 1.2s ${i*0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CHAT PANEL COMPONENT
═══════════════════════════════════════════════════ */
function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role:"assistant", content:"System initialized. I'm John's AI — ask me anything about his experience, work, or approach." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, loading]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const send = useCallback(async (text?: string) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");
    setError(null);
    const newMessages = [...messages, { role:"user", content: q }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, question: q }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const reply = data.content || "No response.";
      setMessages(prev => [...prev, { role:"assistant", content: reply }]);
    } catch(err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError("TRANSMISSION_FAILED // " + msg.slice(0,60));
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="chat-panel" style={{
      position:"fixed", top:0, right:0, bottom:0,
      width: "min(440px, 100vw)",
      zIndex: 200,
      display:"flex", flexDirection:"column",
      background:"rgba(8,8,10,0.97)",
      borderLeft:"1px solid rgba(228,228,231,0.07)",
      backdropFilter:"blur(20px)",
    }}>

      {/* Chat header */}
      <div style={{
        padding:"16px 20px",
        borderBottom:"1px solid rgba(228,228,231,0.06)",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        flexShrink:0,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{
            width:28, height:28,
            border:"1px solid rgba(37,99,235,0.5)",
            display:"flex", alignItems:"center", justifyContent:"center",
            position:"relative", flexShrink:0,
          }}>
            <div style={{ width:8, height:8, background:"#2563EB" }} />
            <div style={{
              position:"absolute", bottom:-3, right:-3,
              width:6, height:6, borderRadius:"50%", background:"#2563EB",
              animation:"pulse-dot 2s infinite", color:"#2563EB",
            }} />
          </div>
          <div>
            <div className="mono" style={{ fontSize:11, color:"rgba(228,228,231,0.8)", letterSpacing:"0.12em" }}>
              ZEMROSE.AI
            </div>
            <div className="mono" style={{ fontSize:9, color:"rgba(37,99,235,0.7)", letterSpacing:"0.15em", marginTop:2 }}>
              EXPERIENCE QUERY SYSTEM // ONLINE
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{
          background:"none", border:"1px solid rgba(228,228,231,0.08)",
          color:"rgba(228,228,231,0.4)", cursor:"pointer",
          width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:14, transition:"all 0.2s",
          fontFamily:"system-ui",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(228,228,231,0.2)"; e.currentTarget.style.color="rgba(228,228,231,0.8)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(228,228,231,0.08)"; e.currentTarget.style.color="rgba(228,228,231,0.4)"; }}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex:1, overflowY:"auto", padding:"20px",
        display:"flex", flexDirection:"column", gap:16,
      }}>
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} isLatest={i === messages.length - 1 && msg.role === "assistant"} />
        ))}
        {loading && <TypingIndicator />}
        {error && (
          <div className="mono" style={{
            fontSize:10, color:"rgba(239,68,68,0.7)", letterSpacing:"0.1em",
            padding:"8px 12px", border:"1px solid rgba(239,68,68,0.2)",
            background:"rgba(239,68,68,0.04)",
          }}>
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 2 && (
        <div style={{
          padding:"0 20px 12px",
          display:"flex", flexWrap:"wrap", gap:6,
          flexShrink:0,
          borderTop:"1px solid rgba(228,228,231,0.04)",
          paddingTop:12,
        }}>
          <div className="mono" style={{
            fontSize:9, letterSpacing:"0.2em",
            color:"rgba(228,228,231,0.2)", width:"100%", marginBottom:4,
          }}>
            SUGGESTED_QUERIES
          </div>
          {SUGGESTED_QUESTIONS.map((q) => (
            <button key={q}
              className="suggested-q mono"
              onClick={() => send(q)}
              style={{
                fontSize:9, letterSpacing:"0.1em",
                padding:"5px 10px",
                border:"1px solid rgba(228,228,231,0.07)",
                background:"transparent",
                color:"rgba(228,228,231,0.4)",
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding:"12px 20px 20px",
        borderTop:"1px solid rgba(228,228,231,0.06)",
        flexShrink:0,
      }}>
        <div style={{
          display:"flex", gap:8, alignItems:"flex-end",
          border:"1px solid rgba(228,228,231,0.1)",
          background:"rgba(228,228,231,0.02)",
          padding:"10px 12px",
          transition:"border-color 0.2s",
        }}
          onFocusCapture={e => e.currentTarget.style.borderColor="rgba(37,99,235,0.3)"}
          onBlurCapture={e => e.currentTarget.style.borderColor="rgba(228,228,231,0.1)"}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Query the system..."
            rows={1}
            style={{
              flex:1, background:"none", border:"none",
              color:"rgba(228,228,231,0.85)",
              fontFamily:"system-ui, -apple-system, sans-serif",
              fontSize:13, lineHeight:1.5, resize:"none",
              caretColor:"#2563EB",
            }}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{
              background: input.trim() && !loading ? "#2563EB" : "rgba(37,99,235,0.15)",
              border:"none", cursor: input.trim() && !loading ? "pointer" : "default",
              color:"rgba(228,228,231,0.9)", padding:"6px 12px",
              fontFamily:"'IBM Plex Mono', monospace", fontSize:10,
              letterSpacing:"0.15em", flexShrink:0,
              transition:"background 0.2s",
            }}
          >
            SEND
          </button>
        </div>
        <div className="mono" style={{
          fontSize:8, color:"rgba(228,228,231,0.18)",
          letterSpacing:"0.15em", marginTop:8,
        }}>
          ENTER to send · SHIFT+ENTER for new line
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   GRID BACKGROUND
═══════════════════════════════════════════════════ */
function GridBg() {
  return <div className="grid-bg" />;
}

/* ═══════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════ */
function Nav({ chatOpen, onChatToggle }: { chatOpen: boolean; onChatToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { id:"work",         label:"Work"         },
    { id:"system",       label:"Projects"     },
    { id:"architecture", label:"Architecture" },
    { id:"contact",      label:"Contact"      },
  ];

  return (
    <>
      <nav className="nav-blur" style={{
        position:"fixed", top:0, left:0,
        right: !isMobile && chatOpen ? "min(440px,100vw)" : 0,
        zIndex:100,
        background: scrolled ? "rgba(10,10,11,0.92)" : "rgba(10,10,11,0.55)",
        borderBottom:"1px solid rgba(228,228,231,0.06)",
        transition:"background 0.4s, right 0.45s cubic-bezier(.16,1,.3,1)",
      }}>
        <div style={{
          maxWidth:1100, margin:"0 auto", padding:"0 20px",
          height:58, display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{
              width:26, height:26,
              border:"1px solid rgba(37,99,235,0.55)",
              display:"flex", alignItems:"center", justifyContent:"center",
              position:"relative", flexShrink:0,
            }}>
              <div style={{ width:8, height:8, background:"#2563EB" }} />
              <div style={{ position:"absolute", top:-3, left:-3, width:4, height:4, border:"1px solid rgba(37,99,235,0.35)" }} />
              <div style={{ position:"absolute", bottom:-3, right:-3, width:4, height:4, border:"1px solid rgba(37,99,235,0.35)" }} />
            </div>
            <div>
              <div className="mono" style={{ fontSize:10, color:"rgba(228,228,231,0.45)", letterSpacing:"0.16em" }}>JOHN ZEMROSE</div>
              <div className="mono" style={{ fontSize:8, color:"#2563EB", letterSpacing:"0.22em" }}>PRINCIPAL AI ARCHITECT</div>
            </div>
          </div>

          {/* Desktop nav */}
          {!isMobile && (
            <div style={{ display:"flex", alignItems:"center", gap:28 }}>
              {navItems.map(({ id, label }) => (
                <button key={id} className="nav-link mono"
                  onClick={() => scrollTo(id)}
                  style={{ fontSize:10, letterSpacing:"0.2em", color:"rgba(228,228,231,0.42)", padding:"4px 0" }}
                >
                  {label.toUpperCase()}
                </button>
              ))}
              <button onClick={onChatToggle} style={{
                fontFamily:"'IBM Plex Mono', monospace",
                fontSize:10, letterSpacing:"0.18em", padding:"7px 14px",
                background: chatOpen ? "#2563EB" : "transparent",
                border:"1px solid", borderColor: chatOpen ? "#2563EB" : "rgba(37,99,235,0.45)",
                color: chatOpen ? "#E4E4E7" : "rgba(37,99,235,0.9)",
                cursor:"pointer", transition:"all 0.25s",
                display:"flex", alignItems:"center", gap:7,
              }}
                onMouseEnter={e => { if(!chatOpen){ e.currentTarget.style.background="rgba(37,99,235,0.1)"; e.currentTarget.style.borderColor="#2563EB"; }}}
                onMouseLeave={e => { if(!chatOpen){ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(37,99,235,0.45)"; }}}
              >
                <div style={{ width:6, height:6, borderRadius:"50%", background: chatOpen ? "#E4E4E7" : "#2563EB", animation:"pulse-dot 2s infinite", color: chatOpen ? "#E4E4E7" : "#2563EB" }} />
                {chatOpen ? "CLOSE QUERY" : "QUERY SYSTEM"}
              </button>
            </div>
          )}

          {/* Mobile right side */}
          {isMobile && (
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <button onClick={onChatToggle} style={{
                background: chatOpen ? "#2563EB" : "transparent",
                border:"1px solid", borderColor: chatOpen ? "#2563EB" : "rgba(37,99,235,0.45)",
                width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center",
                cursor:"pointer",
              }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background: chatOpen ? "#E4E4E7" : "#2563EB", animation:"pulse-dot 2s infinite", color: chatOpen ? "#E4E4E7" : "#2563EB" }} />
              </button>
              <button onClick={() => setMenuOpen(o => !o)} style={{
                background:"none", border:"1px solid rgba(228,228,231,0.1)",
                width:36, height:36, display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center", gap:5, cursor:"pointer", padding:8,
              }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width:16, height:1,
                    background: menuOpen && i===1 ? "transparent" : "rgba(228,228,231,0.6)",
                    transform: menuOpen ? (i===0 ? "rotate(45deg) translate(4px,4px)" : i===2 ? "rotate(-45deg) translate(4px,-4px)" : "none") : "none",
                    transition:"all 0.2s",
                  }} />
                ))}
              </button>
            </div>
          )}

          {/* Desktop status */}
          {!isMobile && (
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:"#2563EB", color:"#2563EB", animation:"pulse-dot 2s infinite" }} />
              <span className="mono" style={{ fontSize:9, color:"rgba(228,228,231,0.28)", letterSpacing:"0.12em" }}>SYS:ONLINE</span>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          position:"fixed", top:58, left:0, right:0, zIndex:99,
          background:"rgba(10,10,11,0.97)",
          borderBottom:"1px solid rgba(228,228,231,0.06)",
          backdropFilter:"blur(14px)",
          animation:"fade-up 0.2s ease both",
        }}>
          {navItems.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              display:"block", width:"100%", textAlign:"left",
              padding:"16px 24px",
              background:"none",
              borderBottom:"1px solid rgba(228,228,231,0.04)",
              fontFamily:"'IBM Plex Mono', monospace",
              fontSize:12, letterSpacing:"0.2em",
              color:"rgba(228,228,231,0.55)", cursor:"pointer",
            }}>
              {label.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════ */
function Hero({ onChatOpen }: { onChatOpen: () => void }) {
  const [ref, inView] = useInView(0.1);
  const [time, setTime] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    const tick = () => setTime(new Date().toTimeString().slice(0,8));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const fadeStyle = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}s`,
  });

  return (
    <section id="work" ref={ref as React.Ref<HTMLElement>} style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      paddingTop:80, position:"relative",
    }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:`0 ${isMobile ? 20 : 32}px`, width:"100%" }}>

        {/* Top metadata bar */}
        {!isMobile && (
          <div style={{
            ...fadeStyle(0),
            display:"flex", justifyContent:"space-between", alignItems:"center",
            borderBottom:"1px solid rgba(228,228,231,0.05)",
            paddingBottom:16, marginBottom:72,
          }}>
            <span className="mono" style={{ fontSize:9, color:"rgba(228,228,231,0.25)", letterSpacing:"0.22em" }}>
              PORTFOLIO // TECHNICAL DRAFTSMAN v2.5
            </span>
            <div style={{ display:"flex", gap:20 }}>
              {["47.6°N","122.3°W","UTC-8"].map(d => (
                <span key={d} className="mono" style={{ fontSize:9, color:"rgba(228,228,231,0.2)", letterSpacing:"0.15em" }}>{d}</span>
              ))}
              <span className="mono" style={{ fontSize:9, color:"#2563EB", letterSpacing:"0.15em" }}>{time}</span>
            </div>
          </div>
        )}

        {/* Hero content */}
        <div style={{ position:"relative", marginTop: isMobile ? 32 : 0 }}>
          {!isMobile && (
            <>
              <div style={{ position:"absolute", top:-18, left:-18, width:18, height:18, borderTop:"1px solid rgba(37,99,235,0.4)", borderLeft:"1px solid rgba(37,99,235,0.4)", opacity: inView ? 1 : 0, transition:"opacity 0.6s 0.8s" }} />
              <div style={{ position:"absolute", bottom:-18, right:-18, width:18, height:18, borderBottom:"1px solid rgba(37,99,235,0.4)", borderRight:"1px solid rgba(37,99,235,0.4)", opacity: inView ? 1 : 0, transition:"opacity 0.6s 0.8s" }} />
            </>
          )}

          <div style={fadeStyle(0.08)}>
            <div className="mono" style={{ fontSize:isMobile ? 8 : 10, color:"#2563EB", letterSpacing:"0.28em", marginBottom:isMobile ? 14 : 20 }}>
              SYSTEM: ACTIVE // 2025–2026
            </div>
            <h1 className="sans" style={{
              fontSize: isMobile ? "clamp(44px,12vw,72px)" : "clamp(50px,8vw,106px)",
              fontWeight:700, letterSpacing:"-0.04em",
              lineHeight:0.92, color:"#E4E4E7", margin:0,
            }}>
              Principal<br />
              <span style={{ color:"rgba(228,228,231,0.22)" }}>AI</span><br />
              Architect
            </h1>
          </div>

          {/* Description + stats */}
          <div style={{
            ...fadeStyle(0.22),
            marginTop: isMobile ? 28 : 44,
            display:"flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 28 : 48,
            alignItems:"flex-end",
          }}>
            <div style={{ flex:1, minWidth:0 }}>
              <p className="sans" style={{
                color:"rgba(228,228,231,0.42)", fontSize: isMobile ? 14 : 15,
                lineHeight:1.75, margin:0,
              }}>
                Principal AI Architect at Intralytics. Formerly led AI-native engineering
                transformation across 220+ engineers at AWS. 12+ years building systems
                at the intersection of data, ML, and organizational design.
              </p>
              <p className="sans" style={{
                color:"rgba(228,228,231,0.22)", fontSize: isMobile ? 12 : 13,
                lineHeight:1.6, margin:"12px 0 0", fontStyle:"italic",
              }}>
                &quot;I build AI systems and the organizations to run them.&quot;
              </p>

              <div style={{ marginTop:28, display:"flex", gap:12, flexWrap:"wrap" }}>
                <button onClick={onChatOpen} style={{
                  fontFamily:"'IBM Plex Mono', monospace",
                  fontSize:10, letterSpacing:"0.18em", padding:"11px 22px",
                  background:"#2563EB", border:"1px solid #2563EB",
                  color:"#E4E4E7", cursor:"pointer",
                  display:"flex", alignItems:"center", gap:8, transition:"background 0.2s",
                  width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "center" : "flex-start",
                }}
                  onMouseEnter={e => e.currentTarget.style.background="#1d4ed8"}
                  onMouseLeave={e => e.currentTarget.style.background="#2563EB"}
                >
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"rgba(228,228,231,0.7)", animation:"pulse-dot 2s infinite", color:"rgba(228,228,231,0.7)" }} />
                  QUERY MY EXPERIENCE →
                </button>
                {!isMobile && (
                  <button onClick={() => document.getElementById("system")?.scrollIntoView({ behavior:"smooth" })} style={{
                    fontFamily:"'IBM Plex Mono', monospace", fontSize:10, letterSpacing:"0.18em",
                    padding:"11px 22px", background:"transparent",
                    border:"1px solid rgba(228,228,231,0.1)",
                    color:"rgba(228,228,231,0.5)", cursor:"pointer", transition:"all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(228,228,231,0.22)"; e.currentTarget.style.color="rgba(228,228,231,0.8)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(228,228,231,0.1)"; e.currentTarget.style.color="rgba(228,228,231,0.5)"; }}
                  >VIEW WORK</button>
                )}
              </div>
            </div>

            {/* Stat blocks */}
            <div style={{
              display:"flex", flexShrink:0,
              width: isMobile ? "100%" : "auto",
            }}>
              {[
                { v:"$28M+", l:"CAPACITY RECOVERED" },
                { v:"500K+", l:"LEARNERS SERVED"    },
                { v:"$1M+",  l:"INFRA SAVINGS"      },
              ].map(({ v, l }, i) => (
                <div key={l} style={{
                  padding: isMobile ? "16px 0" : "22px 26px",
                  border:"1px solid rgba(228,228,231,0.06)",
                  borderRight: i < 2 ? "none" : "1px solid rgba(228,228,231,0.06)",
                  flex: isMobile ? 1 : "none",
                  textAlign: isMobile ? "center" : "left",
                }}>
                  <div className="sans" style={{ fontSize: isMobile ? 20 : 28, fontWeight:700, color:"#E4E4E7", lineHeight:1 }}>{v}</div>
                  <div className="mono" style={{ fontSize:7, color:"rgba(228,228,231,0.28)", letterSpacing:"0.15em", marginTop:6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills + stack */}
        <div style={{
          ...fadeStyle(0.38),
          marginTop: isMobile ? 44 : 72,
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap:32,
        }}>
          <div style={{ borderTop:"1px solid rgba(228,228,231,0.05)", paddingTop:24 }}>
            <div className="mono" style={{ fontSize:9, color:"rgba(228,228,231,0.25)", letterSpacing:"0.22em", marginBottom:22 }}>
              CAPABILITY_INDEX
            </div>
            {SKILLS.map((s, i) => (
              <div key={s.label} style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span className="mono" style={{ fontSize:9, color:"rgba(228,228,231,0.42)", letterSpacing:"0.1em" }}>{s.label}</span>
                  <span className="mono" style={{ fontSize:9, color:"#2563EB" }}>{s.pct}</span>
                </div>
                <div style={{ height:1, background:"rgba(228,228,231,0.06)", position:"relative" }}>
                  <div style={{
                    position:"absolute", left:0, top:0, height:"100%",
                    width: inView ? `${s.pct}%` : "0%",
                    background:"linear-gradient(90deg, #2563EB, rgba(37,99,235,0.35))",
                    transition:`width 1.3s cubic-bezier(.16,1,.3,1) ${0.5 + i*0.08}s`,
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop:"1px solid rgba(228,228,231,0.05)", paddingTop:24 }}>
            <div className="mono" style={{ fontSize:9, color:"rgba(228,228,231,0.25)", letterSpacing:"0.22em", marginBottom:22 }}>
              CURRENT_STACK
            </div>
            {[
              ["ROLE",    "Principal AI Architect"],
              ["COMPANY", "Intralytics // AI & Data Governance"],
              ["PREV",    "AWS Training & Certification"],
              ["CERTS",   "GenAI-Pro // SA // MLE // DE"],
              ["SIGNAL",  "I build AI systems and the organizations to run them"],
            ].map(([k, v]) => (
              <div key={k} style={{ display:"flex", gap:16, marginBottom:12, fontSize:11, fontFamily:"'IBM Plex Mono', monospace", flexWrap: isMobile ? "wrap" : "nowrap" }}>
                <span style={{ color:"rgba(228,228,231,0.22)", letterSpacing:"0.1em", minWidth:68, flexShrink:0 }}>{k}</span>
                <span style={{ color:"rgba(228,228,231,0.52)", wordBreak:"break-word" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════════════════ */
type Project = typeof PROJECTS[number];

function ProjectCard({ p, index, onArchClick }: { p: Project; index: number; onArchClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x:50, y:50, op:0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView(0.08);

  const handleMove = (e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top)  / r.height) * 100,
      op: 1,
    });
  };

  const isActive = p.status === "DEPLOYED" || p.status === "LIVE" || p.status === "ACTIVE";

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.85s cubic-bezier(.16,1,.3,1) ${index*0.1}s, transform 0.85s cubic-bezier(.16,1,.3,1) ${index*0.1}s`,
      height: "100%",
    }}>
      <div ref={cardRef}
        className="spotlight-card"
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setSpotlight(s => ({...s, op:0})); }}
        onClick={onArchClick}
        style={{
          border:"1px solid rgba(228,228,231,0.07)",
          background:"rgba(10,10,11,0.4)",
          position:"relative", overflow:"hidden",
          height:"100%",
          display:"flex", flexDirection:"column",
          cursor: "pointer",
        }}
      >
        {/* Spotlight gradient */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none", zIndex:1,
          background:`radial-gradient(280px circle at ${spotlight.x}% ${spotlight.y}%, rgba(37,99,235,0.07), transparent 70%)`,
          opacity: spotlight.op, transition:"opacity 0.3s",
        }} />

        {/* Corner brackets */}
        {[{t:-1,l:-1},{t:-1,r:-1},{b:-1,l:-1},{b:-1,r:-1}].map((pos, i) => (
          <div key={i} style={{
            position:"absolute", zIndex:2,
            ...(pos.t !== undefined ? { top: pos.t } : { bottom: (pos as {b:number}).b }),
            ...(pos.l !== undefined ? { left: pos.l } : { right: (pos as {r:number}).r }),
            width:10, height:10,
            borderTop:    pos.t !== undefined ? "1px solid rgba(37,99,235,0.45)" : "none",
            borderBottom: 'b' in pos ? "1px solid rgba(37,99,235,0.45)" : "none",
            borderLeft:   pos.l !== undefined ? "1px solid rgba(37,99,235,0.45)" : "none",
            borderRight:  'r' in pos ? "1px solid rgba(37,99,235,0.45)" : "none",
            opacity: hovered ? 1 : 0, transition:"opacity 0.3s",
          }} />
        ))}

        <div style={{ padding:"26px 24px", position:"relative", zIndex:2, display:"flex", flexDirection:"column", flex:1 }}>
          {/* Header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
            <div>
              <div className="mono" style={{ fontSize:8, color:"rgba(228,228,231,0.22)", letterSpacing:"0.25em", marginBottom:7 }}>
                {p.id}
              </div>
              <h3 className="sans" style={{ fontSize:18, fontWeight:600, color:"#E4E4E7", margin:0, letterSpacing:"-0.02em" }}>
                {p.title}
              </h3>
              <div className="mono" style={{ fontSize:9, color:"rgba(228,228,231,0.38)", marginTop:3, letterSpacing:"0.05em" }}>
                {p.subtitle}
              </div>
            </div>
            <div style={{
              padding:"3px 9px",
              border:"1px solid",
              borderColor: isActive ? "rgba(37,99,235,0.3)" : "rgba(228,228,231,0.1)",
              flexShrink:0,
            }}>
              <span className="mono" style={{
                fontSize:8, letterSpacing:"0.18em",
                color: isActive ? "#2563EB" : "rgba(228,228,231,0.32)",
              }}>{p.status}</span>
            </div>
          </div>

          {/* Description */}
          <p className="sans" style={{
            color:"rgba(228,228,231,0.38)", fontSize:12,
            lineHeight:1.68, margin:"0 0 18px", flex:1,
          }}>{p.desc}</p>

          {/* Metrics */}
          <div style={{
            display:"grid", gridTemplateColumns:"repeat(3,1fr)",
            gap:1, background:"rgba(228,228,231,0.04)", marginBottom:18,
          }}>
            {p.metrics.map(m => (
              <div key={m.l} style={{ padding:"9px 12px", background:"rgba(10,10,11,0.75)" }}>
                <div className="sans" style={{ fontSize:15, fontWeight:600, color:"#E4E4E7" }}>{m.v}</div>
                <div className="mono" style={{ fontSize:7, color:"rgba(228,228,231,0.28)", letterSpacing:"0.15em", marginTop:2 }}>{m.l}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:18 }}>
            {p.tags.map(t => (
              <span key={t} className="mono" style={{
                fontSize:8, letterSpacing:"0.14em",
                padding:"3px 7px",
                border:"1px solid rgba(228,228,231,0.07)",
                color:"rgba(228,228,231,0.35)",
              }}>{t}</span>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            borderTop:"1px solid rgba(228,228,231,0.05)", paddingTop:12,
            display:"flex", justifyContent:"space-between",
          }}>
            <span className="mono" style={{ fontSize:8, color:"rgba(228,228,231,0.2)", letterSpacing:"0.12em" }}>
              {hovered ? "CLICK TO VIEW ARCHITECTURE →" : "COORD_"+p.coord}
            </span>
            <span className="mono" style={{
              fontSize:8, letterSpacing:"0.12em",
              color: hovered ? "#2563EB" : "rgba(228,228,231,0.2)",
              transition:"color 0.3s",
            }}>
              BUILD_{p.version} // {p.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECT ARCHITECTURE DIAGRAMS
═══════════════════════════════════════════════════ */

function ArchDiagramRapida() {
  // Centers: strategy=450, pillars=220/450/680, tools=205/375/545/715, measure=205/375/545/715
  return (
    <svg width="100%" viewBox="0 0 900 440" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="pb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
        <marker id="pd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="rgba(228,228,231,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
      </defs>
      {([ ["STRATEGY",58],["PILLARS",168],["TOOLS",278],["MEASURE",388] ] as const).map(([l,y])=>(
        <text key={l} x="14" y={y} fill="rgba(228,228,231,0.15)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="3">{l}</text>
      ))}
      {[100,210,320].map(y=><line key={y} x1="100" y1={y} x2="880" y2={y} stroke="rgba(228,228,231,0.04)" strokeWidth="1"/>)}
      {/* Strategy box — center 450 */}
      <rect x="330" y="24" width="240" height="56" fill="rgba(37,99,235,0.08)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.5"/>
      {([[330,24],[570,24],[330,80],[570,80]] as const).map(([x,y],i)=>(
        <g key={i}><line x1={x} y1={y} x2={x+(i%2===0?6:-6)} y2={y} stroke="#2563EB" strokeWidth="1" opacity="0.6"/><line x1={x} y1={y} x2={x} y2={y+(i<2?6:-6)} stroke="#2563EB" strokeWidth="1" opacity="0.6"/></g>
      ))}
      <text x="450" y="47" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Program Rapida</text>
      <text x="450" y="63" textAnchor="middle" fill="rgba(228,228,231,0.4)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">220+ Engineers · 25 Teams</text>
      <text x="450" y="77" textAnchor="middle" fill="rgba(37,99,235,0.7)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">30% YoY Capacity Target</text>
      {/* Pillar boxes — centers at 220, 450, 680 */}
      {[
        {cx:220, label:"Pillar 1", sub:"AI Awareness", sub2:"& Adoption"},
        {cx:450, label:"Pillar 2", sub:"Agentic", sub2:"Framework"},
        {cx:680, label:"Pillar 3", sub:"AI-Driven Tools", sub2:"& Automation"},
      ].map(({cx,label,sub,sub2})=>(
        <g key={cx}>
          <rect x={cx-100} y="120" width="200" height="70" fill="rgba(37,99,235,0.06)" stroke="rgba(37,99,235,0.3)" strokeWidth="1"/>
          <text x={cx} y="143" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">{label}</text>
          <text x={cx} y="159" textAnchor="middle" fill="rgba(228,228,231,0.45)" fontFamily="IBM Plex Mono,monospace" fontSize="9">{sub}</text>
          <text x={cx} y="173" textAnchor="middle" fill="rgba(228,228,231,0.45)" fontFamily="IBM Plex Mono,monospace" fontSize="9">{sub2}</text>
          <path d={`M450 80 L${cx} 120`} fill="none" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.35" markerEnd="url(#pb)" strokeDasharray="5 4"/>
        </g>
      ))}
      {/* Tool boxes — centers at 205, 375, 545, 715 */}
      {[
        {cx:205, t:"DevHelper", s:"IDE Agent"},
        {cx:375, t:"OpEx Asst.", s:"Ticket AI"},
        {cx:545, t:"DocEngine", s:"TPM Agent"},
        {cx:715, t:"Builder KB", s:"Context Layer"},
      ].map(({cx,t,s})=>(
        <g key={cx}>
          <rect x={cx-75} y="230" width="150" height="56" fill="rgba(228,228,231,0.02)" stroke="rgba(228,228,231,0.09)" strokeWidth="1"/>
          <text x={cx} y="253" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="10" fontWeight="500">{t}</text>
          <text x={cx} y="269" textAnchor="middle" fill="rgba(228,228,231,0.35)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s}</text>
          <line x1={cx} y1="230" x2={cx} y2="210" stroke="rgba(228,228,231,0.15)" strokeWidth="1" markerEnd="url(#pd)" strokeDasharray="4 3"/>
        </g>
      ))}
      {/* Measure boxes — centers at 205, 375, 545, 715 */}
      {[
        {cx:205, t:"SDU Metric", s:"Delivery Units"},
        {cx:375, t:"CTS-SW", s:"Cost-to-Serve"},
        {cx:545, t:"Three-Signal", s:"Triangulation"},
        {cx:715, t:"PI Index", s:"59.3% Gain"},
      ].map(({cx,t,s})=>(
        <g key={cx}>
          <rect x={cx-75} y="350" width="150" height="50" fill="rgba(37,99,235,0.04)" stroke="rgba(37,99,235,0.18)" strokeWidth="1"/>
          <text x={cx} y="372" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="10" fontWeight="500">{t}</text>
          <text x={cx} y="387" textAnchor="middle" fill="rgba(228,228,231,0.35)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s}</text>
          <line x1={cx} y1="350" x2={cx} y2="320" stroke="rgba(37,99,235,0.25)" strokeWidth="1" markerEnd="url(#pb)" strokeDasharray="4 3"/>
        </g>
      ))}
      <text x="450" y="418" textAnchor="middle" fill="rgba(228,228,231,0.18)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="2">OUTCOME: $28M+ CAPACITY RECOVERED · 90.6% ADOPTION · 55.2 DEV-YRS</text>
    </svg>
  );
}

function ArchDiagramOpEx() {
  // Three columns at centers: 220, 450, 680. Analysis engine centered at 450.
  return (
    <svg width="100%" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ob" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
        <marker id="od" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="rgba(228,228,231,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
      </defs>
      {([ ["INGEST",58],["ANALYSIS",178],["OUTPUT",308] ] as const).map(([l,y])=>(
        <text key={l} x="14" y={y} fill="rgba(228,228,231,0.15)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="3">{l}</text>
      ))}
      {[110,240].map(y=><line key={y} x1="100" y1={y} x2="880" y2={y} stroke="rgba(228,228,231,0.04)" strokeWidth="1"/>)}
      {/* Ingest boxes — centers at 220, 450, 680 */}
      {[{cx:220,t:"Ticket Created",s:"77,789 total"},{cx:450,t:"AI-Assisted",s:"68% adoption"},{cx:680,t:"Non-AI",s:"Baseline pool"}].map(({cx,t,s})=>(
        <g key={cx}>
          <rect x={cx-85} y="24" width="170" height="62" fill="rgba(228,228,231,0.02)" stroke="rgba(228,228,231,0.09)" strokeWidth="1"/>
          <text x={cx} y="50" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="10" fontWeight="500">{t}</text>
          <text x={cx} y="66" textAnchor="middle" fill="rgba(228,228,231,0.35)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s}</text>
        </g>
      ))}
      {/* Dashed lines from each ingest center down to analysis box — left/right angle inward */}
      <line x1={450} y1={86} x2={450} y2={130} stroke="rgba(228,228,231,0.15)" strokeWidth="1" markerEnd="url(#od)" strokeDasharray="4 3"/>
      <path d="M220 86 L220 108 L310 130" fill="none" stroke="rgba(228,228,231,0.15)" strokeWidth="1" markerEnd="url(#od)" strokeDasharray="4 3"/>
      <path d="M680 86 L680 108 L590 130" fill="none" stroke="rgba(228,228,231,0.15)" strokeWidth="1" markerEnd="url(#od)" strokeDasharray="4 3"/>
      {/* Analysis engine — centered at 450 */}
      <rect x="310" y="130" width="280" height="80" fill="rgba(37,99,235,0.06)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.4"/>
      {([[310,130],[590,130],[310,210],[590,210]] as const).map(([x,y],i)=>(
        <g key={i}><line x1={x} y1={y} x2={x+(i%2===0?6:-6)} y2={y} stroke="#2563EB" strokeWidth="1" opacity="0.6"/><line x1={x} y1={y} x2={x} y2={y+(i<2?6:-6)} stroke="#2563EB" strokeWidth="1" opacity="0.6"/></g>
      ))}
      <text x="450" y="160" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Semantic Similarity Engine</text>
      <text x="450" y="176" textAnchor="middle" fill="rgba(228,228,231,0.4)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">Title matching · Resolver group control</text>
      <text x="450" y="192" textAnchor="middle" fill="rgba(37,99,235,0.65)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">12,117 matched pairs · 33 resolver groups</text>
      <text x="450" y="207" textAnchor="middle" fill="rgba(228,228,231,0.3)" fontFamily="IBM Plex Mono,monospace" fontSize="8">Pooled all-time baseline methodology</text>
      {/* Output boxes — centers at 220, 450, 680; fan-out from analysis */}
      {[
        {cx:220, t:"All-time Cross", s:"-23.3hrs MTTR", v:"87.4 BY"},
        {cx:450, t:"Quarter-Only", s:"-25.7hrs MTTR", v:"96.4 BY"},
        {cx:680, t:"Pooled Baseline", s:"-26.0hrs MTTR", v:"97.3 BY"},
      ].map(({cx,t,s,v})=>(
        <g key={cx}>
          <rect x={cx-95} y="260" width="190" height="76" fill="rgba(37,99,235,0.04)" stroke="rgba(37,99,235,0.2)" strokeWidth="1"/>
          <text x={cx} y="283" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="10" fontWeight="500">{t}</text>
          <text x={cx} y="299" textAnchor="middle" fill="rgba(228,228,231,0.4)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s}</text>
          <text x={cx} y="318" textAnchor="middle" fill="#2563EB" fontFamily="IBM Plex Mono,monospace" fontSize="13" fontWeight="500">{v}</text>
          <text x={cx} y="330" textAnchor="middle" fill="rgba(228,228,231,0.25)" fontFamily="IBM Plex Mono,monospace" fontSize="7">Builder-Years Saved</text>
          <path d={`M450 210 L450 235 L${cx} 235 L${cx} 260`} fill="none" stroke="rgba(228,228,231,0.15)" strokeWidth="1" markerEnd="url(#od)"/>
        </g>
      ))}
      <text x="450" y="380" textAnchor="middle" fill="rgba(228,228,231,0.18)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="2">VALIDATED: p &lt; 0.001 · THREE METHODS CONVERGE ON 87–97 BUILDER-YEARS Q1 2026</text>
    </svg>
  );
}

function ArchDiagramSynapse() {
  // Three columns at centers: 220, 450, 680
  return (
    <svg width="100%" viewBox="0 0 900 420" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="sb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
        <marker id="sd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="rgba(228,228,231,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
      </defs>
      {([ ["CONTENT",58],["PLATFORM",178],["CONSUMERS",308] ] as const).map(([l,y])=>(
        <text key={l} x="14" y={y} fill="rgba(228,228,231,0.15)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="3">{l}</text>
      ))}
      {[110,240].map(y=><line key={y} x1="100" y1={y} x2="880" y2={y} stroke="rgba(228,228,231,0.04)" strokeWidth="1"/>)}
      {/* Content boxes — centers at 220, 450, 680 */}
      {[{cx:220,t:"Course Content",s:"Docs & curricula"},{cx:450,t:"Cloud Docs",s:"AWS documentation"},{cx:680,t:"Assessment Data",s:"Exam content"}].map(({cx,t,s})=>(
        <g key={cx}>
          <rect x={cx-95} y="24" width="190" height="56" fill="rgba(228,228,231,0.02)" stroke="rgba(228,228,231,0.08)" strokeWidth="1"/>
          <text x={cx} y="47" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="10" fontWeight="500">{t}</text>
          <text x={cx} y="63" textAnchor="middle" fill="rgba(228,228,231,0.35)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s}</text>
        </g>
      ))}
      {/* Platform boxes — centers at 220, 450, 680 */}
      {[
        {cx:220, t:"Vector Search", s:"RAG Retrieval", s2:"<200ms · dual embed"},
        {cx:450, t:"Eval Service", s:"LLM Quality Framework", s2:"Correctness/Compliance/Complete"},
        {cx:680, t:"Content Portal", s:"Self-Service Analysis", s2:"81% CSAT · 0 sec findings"},
      ].map(({cx,t,s,s2})=>(
        <g key={cx}>
          <rect x={cx-110} y="130" width="220" height="80" fill="rgba(37,99,235,0.07)" stroke="rgba(37,99,235,0.4)" strokeWidth="1"/>
          {([[cx-110,130],[cx+110,130],[cx-110,210],[cx+110,210]] as [number,number][]).map(([px,py],i)=>(
            <g key={i}><line x1={px} y1={py} x2={px+(i%2===0?5:-5)} y2={py} stroke="#2563EB" strokeWidth="0.75" opacity="0.5"/><line x1={px} y1={py} x2={px} y2={py+(i<2?5:-5)} stroke="#2563EB" strokeWidth="0.75" opacity="0.5"/></g>
          ))}
          <text x={cx} y="154" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">{t}</text>
          <text x={cx} y="170" textAnchor="middle" fill="rgba(228,228,231,0.4)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s}</text>
          <text x={cx} y="185" textAnchor="middle" fill="rgba(228,228,231,0.3)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s2}</text>
          <text x={cx} y="201" textAnchor="middle" fill="rgba(37,99,235,0.6)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">PRODUCTION · Dec 2025</text>
          {/* Vertical connector from content to platform */}
          <line x1={cx} y1="80" x2={cx} y2="130" stroke="rgba(228,228,231,0.15)" strokeWidth="1" markerEnd="url(#sd)" strokeDasharray="4 3"/>
        </g>
      ))}
      {/* Consumer boxes — 4 evenly spaced, fan out from platform layer */}
      {[
        {cx:200,t:"Learning Asst.",s:"Conversational AI"},
        {cx:370,t:"Skill Tracks",s:"Personalized paths"},
        {cx:540,t:"Search Agent",s:"Query refinement"},
        {cx:710,t:"Knowledge Agent",s:"Course Q&A"},
      ].map(({cx,t,s})=>(
        <g key={cx}>
          <rect x={cx-80} y="260" width="160" height="56" fill="rgba(228,228,231,0.02)" stroke="rgba(228,228,231,0.08)" strokeWidth="1"/>
          <text x={cx} y="283" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="10" fontWeight="500">{t}</text>
          <text x={cx} y="299" textAnchor="middle" fill="rgba(228,228,231,0.35)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s}</text>
          <line x1={cx} y1="260" x2={cx} y2="240" stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#sd)" strokeDasharray="4 3"/>
        </g>
      ))}
      <rect x="260" y="340" width="380" height="44" fill="rgba(37,99,235,0.05)" stroke="rgba(37,99,235,0.2)" strokeWidth="1"/>
      <text x="450" y="359" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="10" fontWeight="500">500K+ Learners Served</text>
      <text x="450" y="375" textAnchor="middle" fill="rgba(37,99,235,0.7)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">Launched December 2025 · Zero post-launch security findings</text>
    </svg>
  );
}

function ArchDiagramTPM() {
  // Integration centers: 205, 375, 545, 715. Layers centered at 460, width 500 (210-710).
  return (
    <svg width="100%" viewBox="0 0 900 530" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="tb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
        <marker id="td" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="rgba(228,228,231,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
      </defs>
      {([ ["INTEGRATIONS",50],["LAYER 1",160],["LAYER 2",275],["LAYER 3",385],["OUTPUT",480] ] as const).map(([l,y])=>(
        <text key={l} x="14" y={y} fill="rgba(228,228,231,0.15)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="3">{l}</text>
      ))}
      {[100,210,320,430].map(y=><line key={y} x1="100" y1={y} x2="880" y2={y} stroke="rgba(228,228,231,0.04)" strokeWidth="1"/>)}
      {/* Integration boxes — 5 evenly spaced, centers at 170, 310, 460, 610, 750 */}
      {[
        {cx:170,t:"Code Repos",s:"Wikis · Docs"},{cx:310,t:"Goal Tracking",s:"Program Mgmt"},
        {cx:460,t:"Slack",s:"Team comms"},{cx:610,t:"Email",s:"Stakeholder comms"},{cx:750,t:"Jira",s:"Project data"},
      ].map(({cx,t,s})=>(
        <g key={cx}>
          <rect x={cx-65} y="18" width="130" height="56" fill="rgba(228,228,231,0.02)" stroke="rgba(228,228,231,0.08)" strokeWidth="1" strokeDasharray="4 3"/>
          <text x={cx} y="42" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="10" fontWeight="500">{t}</text>
          <text x={cx} y="57" textAnchor="middle" fill="rgba(228,228,231,0.35)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s}</text>
          <text x={cx} y="70" textAnchor="middle" fill="rgba(228,228,231,0.22)" fontFamily="IBM Plex Mono,monospace" fontSize="7" letterSpacing="1">MCP</text>
        </g>
      ))}
      {/* Connectors from integrations to Layer 1 — inner three straight, outer two angled */}
      <line x1={310} y1={74} x2={310} y2={118} stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#td)" strokeDasharray="4 3"/>
      <line x1={460} y1={74} x2={460} y2={118} stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#td)" strokeDasharray="4 3"/>
      <line x1={610} y1={74} x2={610} y2={118} stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#td)" strokeDasharray="4 3"/>
      <path d="M170 74 L170 96 L210 118" fill="none" stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#td)" strokeDasharray="4 3"/>
      <path d="M750 74 L750 96 L710 118" fill="none" stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#td)" strokeDasharray="4 3"/>
      {/* Layer 1 — centered at 460, x=210 to 710 */}
      <rect x="210" y="118" width="500" height="72" fill="rgba(37,99,235,0.05)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.35"/>
      <text x="460" y="142" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Layer 1 — Data Pipeline</text>
      <text x="460" y="158" textAnchor="middle" fill="rgba(228,228,231,0.4)" fontFamily="IBM Plex Mono,monospace" fontSize="8">NL → validated query · External pagination (32K→500 tokens) · DuckDB</text>
      <text x="460" y="174" textAnchor="middle" fill="rgba(228,228,231,0.3)" fontFamily="IBM Plex Mono,monospace" fontSize="8">Mandatory field schema verification · Data quality checks</text>
      <line x1="460" y1="190" x2="460" y2="228" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.4" markerEnd="url(#tb)" strokeDasharray="5 4"/>
      {/* Layer 2 */}
      <rect x="210" y="228" width="500" height="72" fill="rgba(37,99,235,0.05)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.35"/>
      <text x="460" y="252" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Layer 2 — SQL Analysis</text>
      <text x="460" y="268" textAnchor="middle" fill="rgba(228,228,231,0.4)" fontFamily="IBM Plex Mono,monospace" fontSize="8">Dependency · Hierarchy · Timeline · Resource analysis</text>
      <text x="460" y="284" textAnchor="middle" fill="rgba(228,228,231,0.3)" fontFamily="IBM Plex Mono,monospace" fontSize="8">SQL-first · Reproducible · Cross-join capable</text>
      <line x1="460" y1="300" x2="460" y2="338" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.4" markerEnd="url(#tb)" strokeDasharray="5 4"/>
      {/* Layer 3 */}
      <rect x="210" y="338" width="500" height="72" fill="rgba(37,99,235,0.05)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.35"/>
      {([[210,338],[710,338],[210,410],[710,410]] as const).map(([x,y],i)=>(
        <g key={i}><line x1={x} y1={y} x2={x+(i%2===0?6:-6)} y2={y} stroke="#2563EB" strokeWidth="1" opacity="0.6"/><line x1={x} y1={y} x2={x} y2={y+(i<2?6:-6)} stroke="#2563EB" strokeWidth="1" opacity="0.6"/></g>
      ))}
      <text x="460" y="362" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Layer 3 — Strategic Scenario Planning</text>
      <text x="460" y="378" textAnchor="middle" fill="rgba(228,228,231,0.4)" fontFamily="IBM Plex Mono,monospace" fontSize="8">Feature estimation · Capacity constraints · &quot;What slides?&quot; requirement</text>
      <text x="460" y="394" textAnchor="middle" fill="rgba(37,99,235,0.65)" fontFamily="IBM Plex Mono,monospace" fontSize="8">Deprioritization scenarios · Risk concentration detection</text>
      <text x="460" y="408" textAnchor="middle" fill="rgba(228,228,231,0.28)" fontFamily="IBM Plex Mono,monospace" fontSize="8">553 invocations Q1 2026 · ORG STANDARD</text>
      {/* Output — Risk Intelligence */}
      <line x1="460" y1="410" x2="460" y2="448" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.4" markerEnd="url(#tb)" strokeDasharray="5 4"/>
      <rect x="210" y="448" width="500" height="56" fill="rgba(37,99,235,0.08)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.5"/>
      <text x="460" y="472" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Risk Intelligence Output</text>
      <text x="460" y="490" textAnchor="middle" fill="rgba(37,99,235,0.7)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">14 Production SOPs · 95% acceptance · 87% no-modification rate</text>
    </svg>
  );
}

function ArchDiagramDataPlatform() {
  // Centers: before=230/480/730, migration=205/375/545/715, after=205/375/545/715
  return (
    <svg width="100%" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="dpb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
        <marker id="dpd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="rgba(228,228,231,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
      </defs>
      {([ ["BEFORE",58],["MIGRATION",168],["AFTER",300] ] as const).map(([l,y])=>(
        <text key={l} x="14" y={y} fill="rgba(228,228,231,0.15)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="3">{l}</text>
      ))}
      {[100,235].map(y=><line key={y} x1="100" y1={y} x2="880" y2={y} stroke="rgba(228,228,231,0.04)" strokeWidth="1"/>)}
      {/* Before boxes — centers at 230, 480, 730 */}
      {[
        {cx:230,t:"Monolithic Platform",s:"200+ schemas · petabyte scale",s2:"2–4 week wait times · ~22 tickets/mo"},
        {cx:480,t:"8 Data Engineers",s:"Supporting 20+ BI Engineers",s2:"20% capacity on support tasks"},
        {cx:730,t:"$420K/yr Infra Cost",s:"Legacy system overhead",s2:"Suboptimal resource allocation"},
      ].map(({cx,t,s,s2})=>(
        <g key={cx}>
          <rect x={cx-110} y="22" width="220" height="62" fill="rgba(228,228,231,0.02)" stroke="rgba(228,228,231,0.08)" strokeWidth="1"/>
          <text x={cx} y="46" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="10" fontWeight="500">{t}</text>
          <text x={cx} y="62" textAnchor="middle" fill="rgba(228,228,231,0.35)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s}</text>
          <text x={cx} y="76" textAnchor="middle" fill="rgba(228,228,231,0.25)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s2}</text>
          <line x1={cx} y1="84" x2={cx} y2="118" stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#dpd)" strokeDasharray="4 3"/>
        </g>
      ))}
      {/* Migration boxes — centers at 205, 375, 545, 715 */}
      {[
        {cx:205, t:"CDK Constructs", s:"8 AWS service types"},
        {cx:375, t:"Lake Formation", s:"Tag-based access control"},
        {cx:545, t:"BI Onboarding", s:"4 groups · 5-step process"},
        {cx:715, t:"AppSec Review", s:"Zero findings · Formal review"},
      ].map(({cx,t,s})=>(
        <g key={cx}>
          <rect x={cx-87} y="118" width="175" height="56" fill="rgba(37,99,235,0.05)" stroke="rgba(37,99,235,0.25)" strokeWidth="1"/>
          <text x={cx} y="141" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="10" fontWeight="500">{t}</text>
          <text x={cx} y="157" textAnchor="middle" fill="rgba(228,228,231,0.35)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s}</text>
          <line x1={cx} y1="174" x2={cx} y2="252" stroke="rgba(37,99,235,0.3)" strokeWidth="1" markerEnd="url(#dpb)" strokeDasharray="4 3"/>
        </g>
      ))}
      {/* After boxes — centers at 205, 375, 545, 715 */}
      {[
        {cx:205, t:"Self-Service BI", s:"20+ engineers unblocked", v:"80% same-day"},
        {cx:375, t:"Infra Savings", s:"Legacy decommissioned", v:"$870K+ annual"},
        {cx:545, t:"Support Tickets", s:"30% reduction", v:"≤15/month"},
        {cx:715, t:"Security", s:"Post-launch", v:"ZERO findings"},
      ].map(({cx,t,s,v})=>(
        <g key={cx}>
          <rect x={cx-80} y="252" width="160" height="72" fill="rgba(37,99,235,0.06)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.35"/>
          <text x={cx} y="275" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="10" fontWeight="500">{t}</text>
          <text x={cx} y="291" textAnchor="middle" fill="rgba(228,228,231,0.35)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s}</text>
          <text x={cx} y="311" textAnchor="middle" fill="#2563EB" fontFamily="IBM Plex Mono,monospace" fontSize="12" fontWeight="500">{v}</text>
        </g>
      ))}
      <text x="460" y="368" textAnchor="middle" fill="rgba(228,228,231,0.18)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="2">TOTAL ANNUALIZED VALUE: $870K+ · 91 SPRINTS · 5 WORKSTREAMS · ZERO HEADCOUNT ADDED</text>
    </svg>
  );
}

function ArchDiagramDataSense() {
  // Sources centers: 205, 375, 545, 715. Knowledge centers: 240, 510, 770. Agent/Interface at 460.
  return (
    <svg width="100%" viewBox="0 0 900 420" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="dsb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
        <marker id="dsd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="rgba(228,228,231,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
      </defs>
      {([ ["SOURCES",50],["KNOWLEDGE",165],["AGENT",295],["INTERFACE",385] ] as const).map(([l,y])=>(
        <text key={l} x="14" y={y} fill="rgba(228,228,231,0.15)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="3">{l}</text>
      ))}
      {[100,220,340].map(y=><line key={y} x1="100" y1={y} x2="880" y2={y} stroke="rgba(228,228,231,0.04)" strokeWidth="1"/>)}
      {/* Source boxes — centers at 205, 375, 545, 715 */}
      {[
        {cx:205,t:"Production DBs",s:"Redshift · RDS"},{cx:375,t:"Data Models",s:"Schemas · lineage"},
        {cx:545,t:"Service Metadata",s:"AwsTcDataSense*"},{cx:715,t:"Relationships",s:"Table · Column level"},
      ].map(({cx,t,s})=>(
        <g key={cx}>
          <rect x={cx-87} y="18" width="175" height="56" fill="rgba(228,228,231,0.02)" stroke="rgba(228,228,231,0.08)" strokeWidth="1"/>
          <text x={cx} y="42" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="10" fontWeight="500">{t}</text>
          <text x={cx} y="58" textAnchor="middle" fill="rgba(228,228,231,0.35)" fontFamily="IBM Plex Mono,monospace" fontSize="8">{s}</text>
        </g>
      ))}
      {/* Connectors from sources to knowledge — angled to reach knowledge centers */}
      {/* Production DBs (205) → Knowledge Vault (240) */}
      <path d="M205 74 L205 96 L240 118" fill="none" stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#dsd)" strokeDasharray="4 3"/>
      {/* Data Models (375) → Knowledge Vault (240) — angle left */}
      <path d="M375 74 L375 96 L360 118" fill="none" stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#dsd)" strokeDasharray="4 3"/>
      {/* Service Metadata (545) → Lineage Graph (510) — angle left */}
      <path d="M545 74 L545 96 L510 118" fill="none" stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#dsd)" strokeDasharray="4 3"/>
      {/* Relationships (715) → OpenSearch Index (770) — angle right */}
      <path d="M715 74 L715 96 L770 118" fill="none" stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#dsd)" strokeDasharray="4 3"/>
      {/* Knowledge boxes — centers at 240, 510, 770 — uniform blue styling */}
      <rect x="120" y="118" width="240" height="76" fill="rgba(37,99,235,0.06)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.4"/>
      <text x="240" y="143" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Knowledge Vault</text>
      <text x="240" y="159" textAnchor="middle" fill="rgba(228,228,231,0.4)" fontFamily="IBM Plex Mono,monospace" fontSize="8">DynamoDB + OpenSearch</text>
      <text x="240" y="175" textAnchor="middle" fill="rgba(228,228,231,0.3)" fontFamily="IBM Plex Mono,monospace" fontSize="8">Entity metadata · Relationships</text>
      <text x="240" y="187" textAnchor="middle" fill="rgba(37,99,235,0.6)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">John&apos;s contribution</text>
      <rect x="390" y="118" width="240" height="76" fill="rgba(37,99,235,0.06)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.4"/>
      <text x="510" y="143" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Lineage Graph</text>
      <text x="510" y="159" textAnchor="middle" fill="rgba(228,228,231,0.4)" fontFamily="IBM Plex Mono,monospace" fontSize="8">Neptune LPG</text>
      <text x="510" y="175" textAnchor="middle" fill="rgba(228,228,231,0.3)" fontFamily="IBM Plex Mono,monospace" fontSize="8">~20K nodes · edges tracking flow</text>
      <text x="510" y="187" textAnchor="middle" fill="rgba(228,228,231,0.25)" fontFamily="IBM Plex Mono,monospace" fontSize="8">Table + column level lineage</text>
      <rect x="650" y="118" width="240" height="76" fill="rgba(37,99,235,0.06)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.4"/>
      <text x="770" y="143" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">OpenSearch Index</text>
      <text x="770" y="159" textAnchor="middle" fill="rgba(228,228,231,0.4)" fontFamily="IBM Plex Mono,monospace" fontSize="8">Semantic · Lexical · Hybrid</text>
      <text x="770" y="175" textAnchor="middle" fill="rgba(228,228,231,0.3)" fontFamily="IBM Plex Mono,monospace" fontSize="8">Metadata filtering</text>
      <text x="770" y="187" textAnchor="middle" fill="rgba(228,228,231,0.25)" fontFamily="IBM Plex Mono,monospace" fontSize="8">~500MB index</text>
      {/* Dashed lines from knowledge centers down to agent box */}
      {[240,510,770].map(cx=>(
        <line key={cx} x1={cx} y1="194" x2={cx} y2="238" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.35" markerEnd="url(#dsb)" strokeDasharray="5 4"/>
      ))}
      {/* Agent box — centered at 490, x=120 to 860 to cover all knowledge centers */}
      <rect x="120" y="238" width="740" height="76" fill="rgba(37,99,235,0.07)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.5"/>
      {([[120,238],[860,238],[120,314],[860,314]] as const).map(([x,y],i)=>(
        <g key={i}><line x1={x} y1={y} x2={x+(i%2===0?6:-6)} y2={y} stroke="#2563EB" strokeWidth="1" opacity="0.6"/><line x1={x} y1={y} x2={x} y2={y+(i<2?6:-6)} stroke="#2563EB" strokeWidth="1" opacity="0.6"/></g>
      ))}
      <text x="460" y="262" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">LangChain Agent — NLP-to-SQL</text>
      <text x="460" y="278" textAnchor="middle" fill="rgba(228,228,231,0.4)" fontFamily="IBM Plex Mono,monospace" fontSize="8">Bedrock · Natural language → SQL execution against production data</text>
      <text x="460" y="294" textAnchor="middle" fill="rgba(228,228,231,0.3)" fontFamily="IBM Plex Mono,monospace" fontSize="8">Metadata discovery · Lineage traversal · Auto-documentation generation</text>
      <text x="460" y="308" textAnchor="middle" fill="rgba(37,99,235,0.65)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">John: prototype KB · arch design · agent impl · security guardian</text>
      {/* Interface box */}
      <line x1="490" y1="314" x2="490" y2="348" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.4" markerEnd="url(#dsb)" strokeDasharray="5 4"/>
      <rect x="120" y="348" width="740" height="52" fill="rgba(37,99,235,0.05)" stroke="rgba(37,99,235,0.2)" strokeWidth="1"/>
      <text x="490" y="369" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="10" fontWeight="500">Self-Service Interface</text>
      <text x="490" y="387" textAnchor="middle" fill="rgba(37,99,235,0.65)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">96 hours → minutes · Data Scientists · BI Engineers · PMs · Developers</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECT ARCH MODAL
═══════════════════════════════════════════════════ */
const ARCH_DIAGRAMS: Record<string, { title: string; sub: string; Component: React.FC }> = {
  "PRJ-001": { title: "Program Rapida Architecture",    sub: "Three-Pillar Transformation Model",  Component: ArchDiagramRapida },
  "PRJ-002": { title: "OpEx Assistant Architecture",    sub: "Semantic Similarity Analysis Pipeline", Component: ArchDiagramOpEx },
  "PRJ-003": { title: "Synapse Platform Architecture",  sub: "RAG + Evaluation + Content Services",  Component: ArchDiagramSynapse },
  "PRJ-004": { title: "TPM Agent System Architecture",  sub: "Three-Layer DuckDB + MCP Integrations", Component: ArchDiagramTPM },
  "PRJ-005": { title: "Data Platform Architecture",     sub: "Monolith → Self-Service Decoupling",    Component: ArchDiagramDataPlatform },
  "PRJ-006": { title: "DataSense Architecture",         sub: "NLP-to-SQL · Knowledge Graph · Lineage", Component: ArchDiagramDataSense },
};

function ProjectArchModal({ projectId, onClose }: { projectId: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const arch = ARCH_DIAGRAMS[projectId];
  if (!arch) return null;
  const { title, sub, Component } = arch;

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:300,
      background:"rgba(0,0,0,0.78)",
      display:"flex", alignItems:"center", justifyContent:"center",
      backdropFilter:"blur(6px)",
    }}>
      <div onClick={e => e.stopPropagation()} className="modal-inner" style={{
        background:"#0A0A0B",
        border:"1px solid rgba(228,228,231,0.08)",
        padding:32, maxWidth:940, width:"92vw",
        maxHeight:"92vh", overflowY:"auto",
        position:"relative",
        animation:"fade-up 0.3s cubic-bezier(.16,1,.3,1) both",
      }}>
        {[{t:-1,l:-1},{t:-1,r:-1},{b:-1,l:-1},{b:-1,r:-1}].map((pos,i) => (
          <div key={i} style={{
            position:"absolute",
            ...(pos.t !== undefined ? {top:pos.t} : {bottom:(pos as {b:number}).b}),
            ...(pos.l !== undefined ? {left:pos.l} : {right:(pos as {r:number}).r}),
            width:10, height:10,
            borderTop:    pos.t !== undefined ? "1px solid rgba(37,99,235,0.5)" : "none",
            borderBottom: 'b' in pos ? "1px solid rgba(37,99,235,0.5)" : "none",
            borderLeft:   pos.l !== undefined ? "1px solid rgba(37,99,235,0.5)" : "none",
            borderRight:  'r' in pos ? "1px solid rgba(37,99,235,0.5)" : "none",
          }} />
        ))}

        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          borderBottom:"1px solid rgba(228,228,231,0.06)", paddingBottom:14, marginBottom:24,
        }}>
          <div>
            <div className="mono" style={{ fontSize:9, color:"#2563EB", letterSpacing:"0.28em", marginBottom:6 }}>
              {projectId} // SYSTEM ARCHITECTURE
            </div>
            <div className="sans" style={{ fontSize:20, fontWeight:700, letterSpacing:"-0.03em", color:"#E4E4E7" }}>
              {title}
            </div>
            <div className="mono" style={{ fontSize:9, color:"rgba(228,228,231,0.35)", letterSpacing:"0.1em", marginTop:4 }}>
              {sub}
            </div>
          </div>
          <button onClick={onClose} style={{
            background:"none", border:"1px solid rgba(228,228,231,0.08)",
            color:"rgba(228,228,231,0.4)", cursor:"pointer",
            width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:14, fontFamily:"system-ui", flexShrink:0, transition:"all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(228,228,231,0.2)"; e.currentTarget.style.color="rgba(228,228,231,0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(228,228,231,0.08)"; e.currentTarget.style.color="rgba(228,228,231,0.4)"; }}
          >✕</button>
        </div>

        <Component />

        <div style={{
          display:"flex", justifyContent:"space-between",
          borderTop:"1px solid rgba(228,228,231,0.04)", paddingTop:12, marginTop:16,
        }}>
          <span className="mono" style={{ fontSize:8, color:"rgba(228,228,231,0.15)", letterSpacing:"0.2em" }}>
            {projectId} // TECHNICAL DRAFTSMAN
          </span>
          <span className="mono" style={{ fontSize:8, color:"rgba(228,228,231,0.15)", letterSpacing:"0.2em" }}>
            ESC or click outside to close
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECTS SECTION
═══════════════════════════════════════════════════ */
function Projects() {
  const [ref, inView] = useInView(0.05);
  const [activeArch, setActiveArch] = useState<string | null>(null);
  const isMobile = useIsMobile();
  return (
    <section id="system" ref={ref as React.Ref<HTMLElement>} style={{ padding:`${isMobile ? 72 : 110}px 0`, position:"relative" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:`0 ${isMobile ? 20 : 32}px` }}>
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"baseline",
          borderBottom:"1px solid rgba(228,228,231,0.05)",
          paddingBottom:18, marginBottom:44,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(-18px)",
          transition:"opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)",
        }}>
          <div>
            <div className="mono" style={{ fontSize:9, color:"#2563EB", letterSpacing:"0.28em", marginBottom:10 }}>
              02 // WORK_LOG
            </div>
            <h2 className="sans" style={{
              fontSize:"clamp(28px,5vw,52px)", fontWeight:700,
              letterSpacing:"-0.03em", color:"#E4E4E7", margin:0,
            }}>Selected Projects</h2>
          </div>
          <div className="mono" style={{ fontSize:9, color:"rgba(228,228,231,0.22)", letterSpacing:"0.15em", textAlign:"right" }}>
            <div>RECORDS: 06</div>
            <div style={{ marginTop:3 }}>FILTER: ALL</div>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit, minmax(${isMobile ? 280 : 340}px,1fr))`, gap:1, alignItems:"stretch" }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} onArchClick={() => setActiveArch(p.id)} />
          ))}
        </div>
      </div>
      {activeArch && <ProjectArchModal projectId={activeArch} onClose={() => setActiveArch(null)} />}
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ARCHITECTURE SECTION
═══════════════════════════════════════════════════ */
function Architecture() {
  const [ref, inView] = useInView(0.05);
  const isMobile = useIsMobile();
  return (
    <section id="architecture" ref={ref as React.Ref<HTMLElement>} style={{ padding:`${isMobile ? 72 : 110}px 0`, position:"relative" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:`0 ${isMobile ? 20 : 32}px` }}>
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"baseline",
          borderBottom:"1px solid rgba(228,228,231,0.05)",
          paddingBottom:18, marginBottom:52,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(-18px)",
          transition:"opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)",
        }}>
          <div>
            <div className="mono" style={{ fontSize:9, color:"#2563EB", letterSpacing:"0.28em", marginBottom:10 }}>
              03 // SYSTEM_ARCHITECTURE
            </div>
            <h2 className="sans" style={{
              fontSize:"clamp(30px,5vw,52px)", fontWeight:700,
              letterSpacing:"-0.03em", color:"#E4E4E7", margin:0,
            }}>How It Works</h2>
          </div>
          <div className="mono" style={{ fontSize:9, color:"rgba(228,228,231,0.22)", letterSpacing:"0.15em", textAlign:"right" }}>
            <div>ARCH-001</div>
            <div style={{ marginTop:3 }}>RAG // CHATBOT</div>
          </div>
        </div>

        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition:"opacity 1s cubic-bezier(.16,1,.3,1) 0.2s, transform 1s cubic-bezier(.16,1,.3,1) 0.2s",
          border:"1px solid rgba(228,228,231,0.06)",
          background:"rgba(228,228,231,0.01)",
          padding:"32px",
          position:"relative",
        }}>
          {[{t:-1,l:-1},{t:-1,r:-1},{b:-1,l:-1},{b:-1,r:-1}].map((pos,i) => (
            <div key={i} style={{
              position:"absolute", zIndex:2,
              ...(pos.t !== undefined ? {top:pos.t} : {bottom:(pos as {b:number}).b}),
              ...(pos.l !== undefined ? {left:pos.l} : {right:(pos as {r:number}).r}),
              width:10, height:10,
              borderTop:    pos.t !== undefined ? "1px solid rgba(37,99,235,0.4)" : "none",
              borderBottom: 'b' in pos ? "1px solid rgba(37,99,235,0.4)" : "none",
              borderLeft:   pos.l !== undefined ? "1px solid rgba(37,99,235,0.4)" : "none",
              borderRight:  'r' in pos ? "1px solid rgba(37,99,235,0.4)" : "none",
            }} />
          ))}

          {isMobile && (
            <div className="mono" style={{ fontSize:8, color:"rgba(228,228,231,0.25)", letterSpacing:"0.15em", marginBottom:8, textAlign:"center" }}>
              ← SCROLL TO EXPLORE →
            </div>
          )}
          <div style={{ overflowX: isMobile ? "auto" : "visible", WebkitOverflowScrolling:"touch" }}>
          <svg width={isMobile ? "860px" : "100%"} viewBox="0 0 860 500" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="a-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
              <marker id="a-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 2L8 5L2 8" fill="none" stroke="rgba(228,228,231,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></marker>
            </defs>
            {([ ["USER",58],["EDGE",158],["API",268],["AI",378],["STORE",468] ] as const).map(([l,y])=>(
              <text key={l} x="14" y={y} fill="rgba(228,228,231,0.15)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="3">{l}</text>
            ))}
            {[100,210,320,430].map(y=><line key={y} x1="55" y1={y} x2="840" y2={y} stroke="rgba(228,228,231,0.04)" strokeWidth="1"/>)}

            {/* Portfolio Site */}
            <rect x="70" y="24" width="155" height="62" fill="rgba(37,99,235,0.07)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.4"/>
            {([[70,24],[225,24],[70,86],[225,86]] as const).map(([x,y],i)=>(<g key={i}><line x1={x} y1={y} x2={x+(i%2===0?5:-5)} y2={y} stroke="#2563EB" strokeWidth="1" opacity="0.6"/><line x1={x} y1={y} x2={x} y2={y+(i<2?5:-5)} stroke="#2563EB" strokeWidth="1" opacity="0.6"/></g>))}
            <text x="147" y="48" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Portfolio Site</text>
            <text x="147" y="64" textAnchor="middle" fill="rgba(228,228,231,0.38)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">Next.js / React</text>
            <text x="147" y="78" textAnchor="middle" fill="rgba(37,99,235,0.65)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">Vercel Edge</text>

            {/* Chat Panel */}
            <rect x="255" y="24" width="155" height="62" fill="rgba(228,228,231,0.03)" stroke="rgba(228,228,231,0.1)" strokeWidth="1"/>
            <text x="332" y="48" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Chat Panel</text>
            <text x="332" y="64" textAnchor="middle" fill="rgba(228,228,231,0.38)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">Blueprint UI</text>
            <text x="332" y="78" textAnchor="middle" fill="rgba(228,228,231,0.25)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">IBM Plex Mono</text>
            <line x1="225" y1="55" x2="255" y2="55" stroke="rgba(228,228,231,0.18)" strokeWidth="1" markerEnd="url(#a-dim)" markerStart="url(#a-dim)"/>

            {/* API Route */}
            <rect x="163" y="124" width="155" height="62" fill="rgba(37,99,235,0.05)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.3"/>
            <text x="240" y="148" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">API Route</text>
            <text x="240" y="164" textAnchor="middle" fill="rgba(228,228,231,0.38)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">/api/chat</text>
            <text x="240" y="178" textAnchor="middle" fill="rgba(37,99,235,0.65)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">Keys server-side</text>
            <path d="M332 86 L332 108 L240 108 L240 124" fill="none" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.5" markerEnd="url(#a-blue)" strokeDasharray="6 4" style={{animation:inView?"flow-dash 1.2s linear infinite":"none"}}/>
            <text x="284" y="104" textAnchor="middle" fill="rgba(37,99,235,0.5)" fontFamily="IBM Plex Mono,monospace" fontSize="7" letterSpacing="1">POST /api/chat</text>
            <path d="M240 186 L240 208 L147 208 L147 86" fill="none" stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#a-dim)" strokeDasharray="4 3"/>
            <text x="190" y="205" textAnchor="middle" fill="rgba(228,228,231,0.2)" fontFamily="IBM Plex Mono,monospace" fontSize="7" letterSpacing="1">response</text>

            {/* Voyage AI */}
            <rect x="70" y="234" width="155" height="62" fill="rgba(228,228,231,0.02)" stroke="rgba(228,228,231,0.09)" strokeWidth="1"/>
            <text x="147" y="258" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Voyage AI</text>
            <text x="147" y="274" textAnchor="middle" fill="rgba(228,228,231,0.38)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">voyage-3-lite</text>
            <text x="147" y="288" textAnchor="middle" fill="rgba(228,228,231,0.25)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">1024-dim</text>
            <path d="M240 186 L240 220 L147 220 L147 234" fill="none" stroke="rgba(228,228,231,0.18)" strokeWidth="1" markerEnd="url(#a-dim)"/>
            <text x="190" y="217" textAnchor="middle" fill="rgba(228,228,231,0.25)" fontFamily="IBM Plex Mono,monospace" fontSize="7" letterSpacing="1">embed query</text>

            {/* Pinecone */}
            <rect x="255" y="234" width="155" height="62" fill="rgba(228,228,231,0.02)" stroke="rgba(228,228,231,0.09)" strokeWidth="1"/>
            <text x="332" y="258" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Pinecone</text>
            <text x="332" y="274" textAnchor="middle" fill="rgba(228,228,231,0.38)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">zemrose-portfolio</text>
            <text x="332" y="288" textAnchor="middle" fill="rgba(228,228,231,0.25)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">top-5 chunks</text>
            <path d="M147 296 L147 318 L332 318 L332 296" fill="none" stroke="rgba(228,228,231,0.18)" strokeWidth="1" markerEnd="url(#a-dim)"/>
            <text x="240" y="314" textAnchor="middle" fill="rgba(228,228,231,0.22)" fontFamily="IBM Plex Mono,monospace" fontSize="7" letterSpacing="1">query vector</text>
            <path d="M332 234 L332 220 L240 220" fill="none" stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#a-dim)" strokeDasharray="4 3"/>
            <text x="284" y="215" textAnchor="middle" fill="rgba(228,228,231,0.18)" fontFamily="IBM Plex Mono,monospace" fontSize="7" letterSpacing="1">top-5 chunks</text>

            {/* Claude Haiku */}
            <rect x="163" y="344" width="155" height="62" fill="rgba(37,99,235,0.07)" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.5"/>
            {([[163,344],[318,344],[163,406],[318,406]] as const).map(([x,y],i)=>(<g key={i}><line x1={x} y1={y} x2={x+(i%2===0?5:-5)} y2={y} stroke="#2563EB" strokeWidth="1" opacity="0.7"/><line x1={x} y1={y} x2={x} y2={y+(i<2?5:-5)} stroke="#2563EB" strokeWidth="1" opacity="0.7"/></g>))}
            <text x="240" y="368" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Claude Haiku</text>
            <text x="240" y="384" textAnchor="middle" fill="rgba(228,228,231,0.38)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">claude-haiku-4-5</text>
            <text x="240" y="398" textAnchor="middle" fill="rgba(37,99,235,0.65)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">context → reply</text>
            <path d="M240 296 L240 344" fill="none" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.5" markerEnd="url(#a-blue)" strokeDasharray="6 4" style={{animation:inView?"flow-dash 1.2s linear infinite":"none"}}/>
            <text x="258" y="324" fill="rgba(37,99,235,0.5)" fontFamily="IBM Plex Mono,monospace" fontSize="7" letterSpacing="1">context + prompt</text>

            {/* KB Docs (offline) */}
            <rect x="510" y="234" width="155" height="62" fill="rgba(228,228,231,0.02)" stroke="rgba(228,228,231,0.07)" strokeWidth="1" strokeDasharray="4 3"/>
            <text x="587" y="258" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">KB Documents</text>
            <text x="587" y="274" textAnchor="middle" fill="rgba(228,228,231,0.35)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">26 .md files · local</text>
            <text x="587" y="288" textAnchor="middle" fill="rgba(228,228,231,0.22)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">One-time run</text>

            {/* Ingest Script */}
            <rect x="510" y="344" width="155" height="62" fill="rgba(228,228,231,0.02)" stroke="rgba(228,228,231,0.07)" strokeWidth="1" strokeDasharray="4 3"/>
            <text x="587" y="368" textAnchor="middle" fill="#E4E4E7" fontFamily="IBM Plex Mono,monospace" fontSize="11" fontWeight="500">Ingest Script</text>
            <text x="587" y="384" textAnchor="middle" fill="rgba(228,228,231,0.35)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">scripts/ingest.ts</text>
            <text x="587" y="398" textAnchor="middle" fill="rgba(228,228,231,0.22)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="1">chunk→embed→upsert</text>
            <path d="M587 296 L587 344" fill="none" stroke="rgba(228,228,231,0.15)" strokeWidth="1" markerEnd="url(#a-dim)"/>
            <path d="M510 376 L430 376 L430 265 L410 265" fill="none" stroke="rgba(228,228,231,0.12)" strokeWidth="1" markerEnd="url(#a-dim)" strokeDasharray="4 3"/>
            <text x="587" y="222" textAnchor="middle" fill="rgba(228,228,231,0.18)" fontFamily="IBM Plex Mono,monospace" fontSize="8" letterSpacing="3">OFFLINE</text>
            <line x1="480" y1="228" x2="694" y2="228" stroke="rgba(228,228,231,0.05)" strokeWidth="1" strokeDasharray="3 4"/>

            {/* Pinecone store */}
            <rect x="70" y="444" width="240" height="44" fill="rgba(228,228,231,0.01)" stroke="rgba(228,228,231,0.06)" strokeWidth="1"/>
            <text x="190" y="463" textAnchor="middle" fill="rgba(228,228,231,0.4)" fontFamily="IBM Plex Mono,monospace" fontSize="9" fontWeight="500">Pinecone Serverless</text>
            <text x="190" y="479" textAnchor="middle" fill="rgba(228,228,231,0.2)" fontFamily="IBM Plex Mono,monospace" fontSize="7" letterSpacing="1.5">us-east-1 · cosine · 1024d · free tier</text>
            <path d="M332 296 L332 432 L190 432 L190 444" fill="none" stroke="rgba(228,228,231,0.08)" strokeWidth="1" strokeDasharray="3 4"/>

            {/* Cost */}
            <rect x="620" y="444" width="210" height="44" fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.18)" strokeWidth="1"/>
            <text x="725" y="462" textAnchor="middle" fill="rgba(34,197,94,0.6)" fontFamily="IBM Plex Mono,monospace" fontSize="7" letterSpacing="2">~500 SESSIONS/MO</text>
            <text x="725" y="479" textAnchor="middle" fill="#22c55e" fontFamily="IBM Plex Mono,monospace" fontSize="12" fontWeight="500">$2–4 / MONTH</text>

            {/* Crosshair */}
            <line x1="233" y1="183" x2="247" y2="183" stroke="rgba(37,99,235,0.2)" strokeWidth="0.75"/>
            <line x1="240" y1="176" x2="240" y2="190" stroke="rgba(37,99,235,0.2)" strokeWidth="0.75"/>
            <circle cx="240" cy="183" r="4" fill="none" stroke="rgba(37,99,235,0.15)" strokeWidth="0.75"/>
          </svg>
          </div>

          <div style={{ display:"flex", justifyContent:"space-between", borderTop:"1px solid rgba(228,228,231,0.04)", paddingTop:12, marginTop:8 }}>
            <span className="mono" style={{ fontSize:8, color:"rgba(228,228,231,0.18)", letterSpacing:"0.2em" }}>ARCH-001 // ZEMROSE.AI PORTFOLIO + RAG CHATBOT</span>
            <span className="mono" style={{ fontSize:8, color:"rgba(228,228,231,0.18)", letterSpacing:"0.2em" }}>VERCEL + PINECONE + VOYAGE AI + ANTHROPIC</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT SECTION
═══════════════════════════════════════════════════ */
function Contact({ onChatOpen }: { onChatOpen: () => void }) {
  const [ref, inView] = useInView(0.1);
  const [form, setForm] = useState({ name:"", email:"", msg:"" });
  const [sent, setSent] = useState(false);
  const isMobile = useIsMobile();
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({...p, [k]: e.target.value}));

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"10px 12px",
    background:"rgba(228,228,231,0.02)",
    border:"1px solid rgba(228,228,231,0.08)",
    color:"rgba(228,228,231,0.82)",
    fontFamily:"system-ui, -apple-system, sans-serif",
    fontSize:13, outline:"none",
    transition:"border-color 0.2s",
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, message: form.msg }),
    });
    if (res.ok) setSent(true);
  };

  return (
    <section id="contact" ref={ref as React.Ref<HTMLElement>} style={{ padding:`${isMobile ? 72 : 110}px 0 60px`, position:"relative" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:`0 ${isMobile ? 20 : 32}px` }}>
        <div style={{
          borderBottom:"1px solid rgba(228,228,231,0.05)", paddingBottom:18, marginBottom:56,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(18px)",
          transition:"opacity 0.8s, transform 0.8s",
        }}>
          <div className="mono" style={{ fontSize:9, color:"#2563EB", letterSpacing:"0.28em", marginBottom:10 }}>
            04 // CONTACT_NODE
          </div>
          <h2 className="sans" style={{
            fontSize:"clamp(28px,5vw,52px)", fontWeight:700,
            letterSpacing:"-0.03em", color:"#E4E4E7", margin:0,
          }}>Initiate Contact</h2>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 60,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(28px)",
          transition:"opacity 1s 0.2s, transform 1s 0.2s",
        }}>
          {/* Left */}
          <div>
            <p className="sans" style={{ color:"rgba(228,228,231,0.42)", fontSize:15, lineHeight:1.75, marginBottom:40 }}>
              Whether you&apos;re building an AI system, modernizing a data platform, or trying to figure out why your last transformation didn&apos;t stick — I&apos;m interested in the conversation.
            </p>

            <div style={{
              border:"1px solid rgba(37,99,235,0.2)",
              padding:"20px 22px", marginBottom:32,
              background:"rgba(37,99,235,0.03)",
            }}>
              <div className="mono" style={{ fontSize:9, color:"rgba(37,99,235,0.6)", letterSpacing:"0.2em", marginBottom:10 }}>
                PREFERRED_CHANNEL
              </div>
              <p className="sans" style={{ color:"rgba(228,228,231,0.5)", fontSize:13, lineHeight:1.65, marginBottom:14 }}>
                The fastest way to understand my work is to ask the AI directly.
              </p>
              <button onClick={onChatOpen} style={{
                fontFamily:"'IBM Plex Mono', monospace",
                fontSize:9, letterSpacing:"0.18em",
                padding:"8px 16px",
                background:"rgba(37,99,235,0.15)",
                border:"1px solid rgba(37,99,235,0.3)",
                color:"#2563EB", cursor:"pointer",
                display:"flex", alignItems:"center", gap:7,
                transition:"background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(37,99,235,0.25)"}
                onMouseLeave={e => e.currentTarget.style.background="rgba(37,99,235,0.15)"}
              >
                <div style={{
                  width:5, height:5, borderRadius:"50%", background:"#2563EB",
                  animation:"pulse-dot 2s infinite", color:"#2563EB",
                }} />
                LAUNCH EXPERIENCE QUERY →
              </button>
            </div>

            {[
              { k:"EMAIL",      v:"john@zemrose.me",                    href:"mailto:john@zemrose.me" },
              { k:"LINKEDIN",   v:"linkedin.com/in/esormez",             href:"https://www.linkedin.com/in/esormez/" },
              { k:"GITHUB",     v:"github.com/esormez",                  href:"https://github.com/esormez" },
              { k:"COMPANY",    v:"intralytics.com",                     href:"https://www.intralytics.com/" },
              { k:"STATUS",     v:"OPEN_TO_CONVERSATION",                href:null },
            ].map(({ k, v, href }) => (
              <div key={k} style={{
                display:"flex", gap:18,
                borderBottom:"1px solid rgba(228,228,231,0.04)",
                paddingBottom:16, marginBottom:16,
              }}>
                <span className="mono" style={{ fontSize:9, color:"rgba(228,228,231,0.22)", letterSpacing:"0.18em", minWidth:76, paddingTop:1 }}>{k}</span>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="mono" style={{
                    fontSize:10, color:"rgba(228,228,231,0.5)",
                    textDecoration:"none", transition:"color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color="#2563EB"}
                    onMouseLeave={e => e.currentTarget.style.color="rgba(228,228,231,0.5)"}
                  >{v}</a>
                ) : (
                  <span className="mono" style={{ fontSize:10, color:"#2563EB" }}>{v}</span>
                )}
              </div>
            ))}
          </div>

          {/* Right — contact form */}
          <div>
            {sent ? (
              <div style={{
                border:"1px solid rgba(37,99,235,0.25)",
                padding:40, textAlign:"center",
              }}>
                <div style={{
                  width:36, height:36,
                  border:"1px solid #2563EB", borderRadius:"50%",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  margin:"0 auto 18px",
                  color:"#2563EB", fontSize:16,
                }}>✓</div>
                <div className="mono" style={{ fontSize:10, color:"#2563EB", letterSpacing:"0.2em", marginBottom:8 }}>
                  TRANSMISSION_SENT
                </div>
                <div className="mono" style={{ fontSize:9, color:"rgba(228,228,231,0.35)" }}>
                  Message queued for processing.
                </div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                {[
                  { k:"name",  label:"IDENTIFIER",    ph:"Full Name",       type:"text" },
                  { k:"email", label:"COMM_CHANNEL",   ph:"Email Address",   type:"email" },
                ].map(({ k, label, ph, type }) => (
                  <div key={k}>
                    <div className="mono" style={{ fontSize:8, color:"rgba(228,228,231,0.28)", letterSpacing:"0.2em", marginBottom:7 }}>{label}</div>
                    <input type={type} placeholder={ph} value={form[k as keyof typeof form]} onChange={set(k)}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor="rgba(37,99,235,0.3)"}
                      onBlur={e => e.target.style.borderColor="rgba(228,228,231,0.08)"}
                    />
                  </div>
                ))}
                <div>
                  <div className="mono" style={{ fontSize:8, color:"rgba(228,228,231,0.28)", letterSpacing:"0.2em", marginBottom:7 }}>MESSAGE_BODY</div>
                  <textarea rows={4} placeholder="Describe your initiative..." value={form.msg} onChange={set("msg")}
                    style={{ ...inputStyle, resize:"vertical" as const, display:"block" }}
                    onFocus={e => e.target.style.borderColor="rgba(37,99,235,0.3)"}
                    onBlur={e => e.target.style.borderColor="rgba(228,228,231,0.08)"}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  style={{
                    fontFamily:"'IBM Plex Mono', monospace",
                    fontSize:10, letterSpacing:"0.18em",
                    padding:"13px", background:"#2563EB",
                    border:"1px solid #2563EB",
                    color:"#E4E4E7", cursor:"pointer",
                    transition:"background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background="#1d4ed8"}
                  onMouseLeave={e => e.currentTarget.style.background="#2563EB"}
                >
                  TRANSMIT MESSAGE →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop:72, borderTop:"1px solid rgba(228,228,231,0.05)", paddingTop:22,
          display:"flex", justifyContent:"space-between",
          opacity: inView ? 1 : 0, transition:"opacity 1s 0.5s",
        }}>
          <span className="mono" style={{ fontSize:8, color:"rgba(228,228,231,0.18)", letterSpacing:"0.15em" }}>
            JOHN ZEMROSE // TECHNICAL DRAFTSMAN PORTFOLIO // 2026
          </span>
          <span className="mono" style={{ fontSize:8, color:"rgba(228,228,231,0.18)", letterSpacing:"0.15em" }}>
            BUILD_v3.0.0 // INTRALYTICS // ALL_SYSTEMS_NOMINAL
          </span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════ */
export default function Portfolio() {
  const [chatOpen, setChatOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div style={{
      background:"#0A0A0B", minHeight:"100vh", color:"#E4E4E7",
      position:"relative",
      marginRight: !isMobile && chatOpen ? "min(440px, 100vw)" : 0,
      transition:"margin-right 0.45s cubic-bezier(.16,1,.3,1)",
    }}>
      <GridBg />
      <Nav chatOpen={chatOpen} onChatToggle={() => setChatOpen(o => !o)} />

      <div style={{ position:"relative", zIndex:1 }}>
        <Hero onChatOpen={() => setChatOpen(true)} />
        <Projects />
        <Architecture />
        <Contact onChatOpen={() => setChatOpen(true)} />
      </div>

      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
    </div>
  );
}
