import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

const FONT_INTER_BLACK_URL =
  "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZg.ttf";
const FONT_MONO_URL =
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n5ig.ttf";

export async function GET() {
  const [fontInterBlack, fontMono] = await Promise.all([
    fetch(FONT_INTER_BLACK_URL).then((r) => r.arrayBuffer()),
    fetch(FONT_MONO_URL).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1584px",
          height: "396px",
          background: "#0A0A0B",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial fade — subtle, edges only */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 40%, #0A0A0B 100%)",
          }}
        />

        {/* Blue atmosphere glow behind text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 50% 70% at 75% 50%, rgba(37,99,235,0.05) 0%, transparent 100%)",
          }}
        />

        {/* Grid — vertical lines */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`v${i}`}
            style={{
              position: "absolute",
              top: 0,
              left: `${i * 40}px`,
              width: "1px",
              height: "396px",
              background: "rgba(228,228,231,0.08)",
              display: "flex",
            }}
          />
        ))}
        {/* Grid — horizontal lines (borderTop on full-width divs) */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`h${i}`}
            style={{
              position: "absolute",
              top: `${i * 40}px`,
              left: 0,
              width: "1584px",
              height: "0px",
              borderTop: "1px solid rgba(228,228,231,0.08)",
              display: "flex",
            }}
          />
        ))}

        {/* ── Agentic Architecture Diagram (left side) ── */}
        <div
          style={{
            position: "absolute",
            left: "50px",
            top: "40px",
            width: "680px",
            height: "316px",
            display: "flex",
            flexDirection: "column",
            opacity: 0.85,
          }}
        >
          {/* Row 1: User query */}
          <div style={{ display: "flex", alignItems: "center", gap: "0px", marginBottom: "12px" }}>
            <div style={{
              border: "1px solid rgba(37,99,235,0.5)",
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2563EB", display: "flex" }} />
              <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "9px", color: "rgba(228,228,231,0.5)", letterSpacing: "2px", display: "flex" }}>
                USER QUERY
              </div>
            </div>
            {/* Arrow right */}
            <div style={{ width: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "30px", height: "1px", background: "rgba(37,99,235,0.35)", display: "flex" }} />
            </div>
            {/* Orchestrator */}
            <div style={{
              border: "1px solid rgba(228,228,231,0.15)",
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <div style={{ width: "4px", height: "4px", background: "rgba(228,228,231,0.4)", display: "flex" }} />
              <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "9px", color: "rgba(228,228,231,0.4)", letterSpacing: "2px", display: "flex" }}>
                ORCHESTRATOR
              </div>
            </div>
          </div>

          {/* Vertical connector from orchestrator */}
          <div style={{ display: "flex", marginLeft: "220px", marginBottom: "12px" }}>
            <div style={{ width: "1px", height: "20px", background: "rgba(228,228,231,0.1)", display: "flex" }} />
          </div>

          {/* Row 2: Three parallel agents */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
            {/* RAG Agent */}
            <div style={{
              border: "1px solid rgba(228,228,231,0.1)",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              flex: 1,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "4px", height: "4px", background: "#2563EB", opacity: 0.6, display: "flex" }} />
                <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "8px", color: "rgba(37,99,235,0.7)", letterSpacing: "2px", display: "flex" }}>
                  RAG AGENT
                </div>
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "7px", color: "rgba(228,228,231,0.25)", letterSpacing: "1px", display: "flex" }}>
                VECTOR SEARCH · EMBED
              </div>
            </div>

            {/* LLM Agent */}
            <div style={{
              border: "1px solid rgba(228,228,231,0.1)",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              flex: 1,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "4px", height: "4px", background: "#2563EB", opacity: 0.6, display: "flex" }} />
                <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "8px", color: "rgba(37,99,235,0.7)", letterSpacing: "2px", display: "flex" }}>
                  LLM ENGINE
                </div>
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "7px", color: "rgba(228,228,231,0.25)", letterSpacing: "1px", display: "flex" }}>
                REASON · PLAN · ACT
              </div>
            </div>

            {/* Tool Agent */}
            <div style={{
              border: "1px solid rgba(228,228,231,0.1)",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              flex: 1,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "4px", height: "4px", background: "#2563EB", opacity: 0.6, display: "flex" }} />
                <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "8px", color: "rgba(37,99,235,0.7)", letterSpacing: "2px", display: "flex" }}>
                  TOOL AGENT
                </div>
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "7px", color: "rgba(228,228,231,0.25)", letterSpacing: "1px", display: "flex" }}>
                API · DB · EXECUTE
              </div>
            </div>
          </div>

          {/* Vertical connectors down from agents */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <div style={{ width: "1px", height: "20px", background: "rgba(228,228,231,0.1)", display: "flex" }} />
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <div style={{ width: "1px", height: "20px", background: "rgba(228,228,231,0.1)", display: "flex" }} />
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <div style={{ width: "1px", height: "20px", background: "rgba(228,228,231,0.1)", display: "flex" }} />
            </div>
          </div>

          {/* Row 3: Context layer */}
          <div style={{
            border: "1px solid rgba(37,99,235,0.25)",
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "5px", height: "5px", background: "#2563EB", opacity: 0.5, display: "flex" }} />
              <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "9px", color: "rgba(37,99,235,0.6)", letterSpacing: "2px", display: "flex" }}>
                CONTEXT LAYER
              </div>
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "7px", color: "rgba(228,228,231,0.2)", letterSpacing: "1.5px", display: "flex" }}>
              MEMORY · STATE · GUARDRAILS
            </div>
          </div>

          {/* Vertical connector */}
          <div style={{ display: "flex", marginLeft: "220px", marginBottom: "12px" }}>
            <div style={{ width: "1px", height: "16px", background: "rgba(228,228,231,0.1)", display: "flex" }} />
          </div>

          {/* Row 4: Output */}
          <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
            <div style={{
              border: "1px solid rgba(228,228,231,0.08)",
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(228,228,231,0.3)", display: "flex" }} />
              <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "9px", color: "rgba(228,228,231,0.3)", letterSpacing: "2px", display: "flex" }}>
                RESPONSE
              </div>
            </div>
            <div style={{ width: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "16px", height: "1px", background: "rgba(228,228,231,0.1)", display: "flex" }} />
            </div>
            <div style={{
              border: "1px solid rgba(228,228,231,0.06)",
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(228,228,231,0.2)", display: "flex" }} />
              <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "9px", color: "rgba(228,228,231,0.2)", letterSpacing: "2px", display: "flex" }}>
                EVAL · FEEDBACK LOOP
              </div>
            </div>
          </div>
        </div>

        {/* Fade diagram into right side */}
        <div
          style={{
            position: "absolute",
            left: "500px",
            top: 0,
            width: "300px",
            height: "396px",
            background: "linear-gradient(90deg, transparent 0%, #0A0A0B 100%)",
            display: "flex",
            zIndex: 1,
          }}
        />

        {/* Right blue border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "4px",
            height: "396px",
            background: "#2563EB",
            opacity: 0.7,
            display: "flex",
          }}
        />

        {/* Outer frame */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            right: "14px",
            bottom: "14px",
            border: "1px solid rgba(228,228,231,0.05)",
            display: "flex",
          }}
        />

        {/* Corner brackets TL */}
        <div
          style={{
            position: "absolute",
            top: "13px",
            left: "13px",
            width: "14px",
            height: "14px",
            borderTop: "1px solid rgba(37,99,235,0.5)",
            borderLeft: "1px solid rgba(37,99,235,0.5)",
            display: "flex",
          }}
        />
        {/* Corner brackets TR */}
        <div
          style={{
            position: "absolute",
            top: "13px",
            right: "13px",
            width: "14px",
            height: "14px",
            borderTop: "1px solid rgba(37,99,235,0.5)",
            borderRight: "1px solid rgba(37,99,235,0.5)",
            display: "flex",
          }}
        />
        {/* Corner brackets BL */}
        <div
          style={{
            position: "absolute",
            bottom: "13px",
            left: "13px",
            width: "14px",
            height: "14px",
            borderBottom: "1px solid rgba(37,99,235,0.5)",
            borderLeft: "1px solid rgba(37,99,235,0.5)",
            display: "flex",
          }}
        />
        {/* Corner brackets BR */}
        <div
          style={{
            position: "absolute",
            bottom: "13px",
            right: "13px",
            width: "14px",
            height: "14px",
            borderBottom: "1px solid rgba(37,99,235,0.5)",
            borderRight: "1px solid rgba(37,99,235,0.5)",
            display: "flex",
          }}
        />

        {/* Right-aligned content */}
        <div
          style={{
            position: "absolute",
            right: "58px",
            top: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "0px",
          }}
        >
          {/* Principal */}
          <div
            style={{
              fontFamily: "Inter",
              fontSize: "108px",
              fontWeight: 900,
              color: "rgba(228,228,231,0.97)",
              letterSpacing: "-4px",
              lineHeight: 0.92,
              display: "flex",
            }}
          >
            Principal
          </div>

          {/* AI — muted */}
          <div
            style={{
              fontFamily: "Inter",
              fontSize: "108px",
              fontWeight: 900,
              color: "rgba(228,228,231,0.18)",
              letterSpacing: "-4px",
              lineHeight: 0.92,
              display: "flex",
            }}
          >
            AI
          </div>

          {/* Architect */}
          <div
            style={{
              fontFamily: "Inter",
              fontSize: "108px",
              fontWeight: 900,
              color: "rgba(228,228,231,0.97)",
              letterSpacing: "-4px",
              lineHeight: 0.92,
              marginBottom: "20px",
              display: "flex",
            }}
          >
            Architect
          </div>

          {/* Discipline tags */}
          <div
            style={{
              fontFamily: "'IBM Plex Mono'",
              fontSize: "11px",
              fontWeight: 400,
              color: "rgba(228,228,231,0.45)",
              letterSpacing: "3px",
              display: "flex",
            }}
          >
            AI SYSTEMS · DATA ARCHITECTURE · ENGINEERING TRANSFORMATION
          </div>

        </div>
      </div>
    ),
    {
      width: 1584,
      height: 396,
      fonts: [
        {
          name: "Inter",
          data: fontInterBlack,
          style: "normal" as const,
          weight: 900 as const,
        },
        {
          name: "IBM Plex Mono",
          data: fontMono,
          style: "normal" as const,
          weight: 400 as const,
        },
      ],
    }
  );
}
