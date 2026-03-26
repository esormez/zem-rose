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

        {/* Grid — vertical lines (1px wide divs — works in Satori) */}
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
        {/* Grid — horizontal lines (1px wide divs rotated 90deg) */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`h${i}`}
            style={{
              position: "absolute",
              top: `${i * 40}px`,
              left: "792px",
              width: "1px",
              height: "1584px",
              background: "rgba(228,228,231,0.08)",
              transform: "rotate(90deg)",
              transformOrigin: "0 0",
              display: "flex",
            }}
          />
        ))}

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
