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
              background: "rgba(228,228,231,0.06)",
              display: "flex",
            }}
          />
        ))}
        {/* Grid — horizontal lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`h${i}`}
            style={{
              position: "absolute",
              top: `${i * 40}px`,
              left: 0,
              width: "1584px",
              height: "0px",
              borderTop: "1px solid rgba(228,228,231,0.06)",
              display: "flex",
            }}
          />
        ))}

        {/* Blue atmosphere glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 50% 70% at 75% 50%, rgba(37,99,235,0.04) 0%, transparent 100%)",
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

        {/* ── Architecture Diagram (left side) ── */}
        {/* Continuous vertical flow line behind everything */}
        <div
          style={{
            position: "absolute",
            left: "104px",
            top: "58px",
            width: "2px",
            height: "296px",
            background: "rgba(228,228,231,0.08)",
            display: "flex",
          }}
        />

        {/* Row 1: User Query */}
        <div
          style={{
            position: "absolute",
            left: "44px",
            top: "36px",
            display: "flex",
            alignItems: "center",
            gap: "0px",
          }}
        >
          <div
            style={{
              border: "1.5px solid rgba(37,99,235,0.5)",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#0A0A0B",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563EB", display: "flex" }} />
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "16px", color: "rgba(228,228,231,0.7)", letterSpacing: "3px", display: "flex" }}>
              USER QUERY
            </div>
          </div>
          <div style={{ width: "32px", height: "2px", background: "rgba(37,99,235,0.35)", display: "flex" }} />
          <div
            style={{
              border: "1.5px solid rgba(228,228,231,0.18)",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#0A0A0B",
            }}
          >
            <div style={{ width: "7px", height: "7px", background: "rgba(228,228,231,0.45)", display: "flex" }} />
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "16px", color: "rgba(228,228,231,0.5)", letterSpacing: "3px", display: "flex" }}>
              ORCHESTRATOR
            </div>
          </div>
        </div>

        {/* Horizontal branch line from vertical to agents */}
        <div
          style={{
            position: "absolute",
            left: "104px",
            top: "130px",
            width: "428px",
            height: "0px",
            borderTop: "2px solid rgba(228,228,231,0.08)",
            display: "flex",
          }}
        />

        {/* Vertical drops into each agent box */}
        <div style={{ position: "absolute", left: "150px", top: "130px", width: "2px", height: "20px", background: "rgba(228,228,231,0.1)", display: "flex" }} />
        <div style={{ position: "absolute", left: "340px", top: "130px", width: "2px", height: "20px", background: "rgba(228,228,231,0.1)", display: "flex" }} />
        <div style={{ position: "absolute", left: "530px", top: "130px", width: "2px", height: "20px", background: "rgba(228,228,231,0.1)", display: "flex" }} />

        {/* Row 2: Three agents */}
        <div
          style={{
            position: "absolute",
            left: "44px",
            top: "150px",
            display: "flex",
            gap: "14px",
            width: "600px",
          }}
        >
          <div style={{ border: "1.5px solid rgba(228,228,231,0.12)", padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px", flex: 1, background: "#0A0A0B" }}>
            <div style={{ width: "7px", height: "7px", background: "#2563EB", opacity: 0.6, display: "flex" }} />
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "15px", color: "rgba(37,99,235,0.75)", letterSpacing: "2.5px", display: "flex" }}>RAG</div>
          </div>
          <div style={{ border: "1.5px solid rgba(228,228,231,0.12)", padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px", flex: 1, background: "#0A0A0B" }}>
            <div style={{ width: "7px", height: "7px", background: "#2563EB", opacity: 0.6, display: "flex" }} />
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "15px", color: "rgba(37,99,235,0.75)", letterSpacing: "2.5px", display: "flex" }}>LLM</div>
          </div>
          <div style={{ border: "1.5px solid rgba(228,228,231,0.12)", padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px", flex: 1, background: "#0A0A0B" }}>
            <div style={{ width: "7px", height: "7px", background: "#2563EB", opacity: 0.6, display: "flex" }} />
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "15px", color: "rgba(37,99,235,0.75)", letterSpacing: "2.5px", display: "flex" }}>TOOLS</div>
          </div>
        </div>

        {/* Vertical drops from agents to merge line */}
        <div style={{ position: "absolute", left: "150px", top: "198px", width: "2px", height: "20px", background: "rgba(228,228,231,0.1)", display: "flex" }} />
        <div style={{ position: "absolute", left: "340px", top: "198px", width: "2px", height: "20px", background: "rgba(228,228,231,0.1)", display: "flex" }} />
        <div style={{ position: "absolute", left: "530px", top: "198px", width: "2px", height: "20px", background: "rgba(228,228,231,0.1)", display: "flex" }} />

        {/* Horizontal merge line */}
        <div
          style={{
            position: "absolute",
            left: "104px",
            top: "218px",
            width: "428px",
            height: "0px",
            borderTop: "2px solid rgba(228,228,231,0.08)",
            display: "flex",
          }}
        />

        {/* Row 3: Context layer */}
        <div
          style={{
            position: "absolute",
            left: "44px",
            top: "240px",
            width: "600px",
            border: "1.5px solid rgba(37,99,235,0.3)",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "#0A0A0B",
          }}
        >
          <div style={{ width: "8px", height: "8px", background: "#2563EB", opacity: 0.5, display: "flex" }} />
          <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "16px", color: "rgba(37,99,235,0.65)", letterSpacing: "3px", display: "flex" }}>
            CONTEXT LAYER
          </div>
        </div>

        {/* Row 4: Response → Eval */}
        <div
          style={{
            position: "absolute",
            left: "44px",
            top: "310px",
            display: "flex",
            alignItems: "center",
            gap: "0px",
          }}
        >
          <div style={{ border: "1.5px solid rgba(228,228,231,0.12)", padding: "10px 20px", display: "flex", alignItems: "center", gap: "10px", background: "#0A0A0B" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "rgba(228,228,231,0.4)", display: "flex" }} />
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "16px", color: "rgba(228,228,231,0.4)", letterSpacing: "3px", display: "flex" }}>RESPONSE</div>
          </div>
          <div style={{ width: "20px", height: "2px", background: "rgba(228,228,231,0.15)", display: "flex" }} />
          <div style={{ border: "1.5px solid rgba(228,228,231,0.08)", padding: "10px 20px", display: "flex", alignItems: "center", gap: "10px", background: "#0A0A0B" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "rgba(228,228,231,0.3)", display: "flex" }} />
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: "16px", color: "rgba(228,228,231,0.3)", letterSpacing: "3px", display: "flex" }}>EVAL</div>
          </div>
        </div>

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
            zIndex: 2,
          }}
        >
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
