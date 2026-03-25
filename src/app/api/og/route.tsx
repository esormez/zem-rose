import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

const FONT_REGULAR_URL =
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-o.woff2";
const FONT_MEDIUM_URL =
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwlBFgsAXHNk.woff2";

export async function GET() {
  const [fontRegular, fontMedium] = await Promise.all([
    fetch(FONT_REGULAR_URL).then((r) => r.arrayBuffer()),
    fetch(FONT_MEDIUM_URL).then((r) => r.arrayBuffer()),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0A0A0B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "'IBM Plex Mono', monospace",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(228,228,231,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(228,228,231,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            display: "flex",
          }}
        />

        {/* Radial fade over grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, #0A0A0B 100%)",
            display: "flex",
          }}
        />

        {/* Blueprint Blue atmosphere glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Left blue border */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "4px",
            height: "630px",
            background: "#2563EB",
            opacity: 0.7,
            display: "flex",
          }}
        />

        {/* Right blue border */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "4px",
            height: "630px",
            background: "#2563EB",
            opacity: 0.7,
            display: "flex",
          }}
        />

        {/* Outer frame */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            right: "24px",
            bottom: "24px",
            border: "1px solid rgba(228,228,231,0.05)",
            display: "flex",
          }}
        />

        {/* Corner brackets — TL */}
        <div
          style={{
            position: "absolute",
            top: "23px",
            left: "23px",
            width: "16px",
            height: "16px",
            borderTop: "1px solid rgba(37,99,235,0.45)",
            borderLeft: "1px solid rgba(37,99,235,0.45)",
            display: "flex",
          }}
        />
        {/* Corner brackets — TR */}
        <div
          style={{
            position: "absolute",
            top: "23px",
            right: "23px",
            width: "16px",
            height: "16px",
            borderTop: "1px solid rgba(37,99,235,0.45)",
            borderRight: "1px solid rgba(37,99,235,0.45)",
            display: "flex",
          }}
        />
        {/* Corner brackets — BL */}
        <div
          style={{
            position: "absolute",
            bottom: "23px",
            left: "23px",
            width: "16px",
            height: "16px",
            borderBottom: "1px solid rgba(37,99,235,0.45)",
            borderLeft: "1px solid rgba(37,99,235,0.45)",
            display: "flex",
          }}
        />
        {/* Corner brackets — BR */}
        <div
          style={{
            position: "absolute",
            bottom: "23px",
            right: "23px",
            width: "16px",
            height: "16px",
            borderBottom: "1px solid rgba(37,99,235,0.45)",
            borderRight: "1px solid rgba(37,99,235,0.45)",
            display: "flex",
          }}
        />

        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0px",
            zIndex: 1,
          }}
        >
          {/* SYSTEM: ACTIVE label */}
          <div
            style={{
              fontSize: "11px",
              color: "#2563EB",
              letterSpacing: "0.28em",
              marginBottom: "28px",
              display: "flex",
            }}
          >
            SYSTEM: ACTIVE // 2025–2026
          </div>

          {/* Role label */}
          <div
            style={{
              fontSize: "14px",
              color: "rgba(37,99,235,0.85)",
              letterSpacing: "0.32em",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            PRINCIPAL AI ARCHITECT
          </div>

          {/* Blueprint Blue rule */}
          <div
            style={{
              width: "520px",
              height: "1px",
              background: "rgba(37,99,235,0.4)",
              marginBottom: "24px",
              display: "flex",
            }}
          />

          {/* Name */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 500,
              color: "#E4E4E7",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: "24px",
              display: "flex",
            }}
          >
            John Zemrose
          </div>

          {/* Divider */}
          <div
            style={{
              width: "520px",
              height: "1px",
              background: "rgba(228,228,231,0.06)",
              marginBottom: "24px",
              display: "flex",
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: "15px",
              color: "rgba(228,228,231,0.4)",
              letterSpacing: "0.04em",
              marginBottom: "32px",
              display: "flex",
            }}
          >
            I build AI systems and the organizations to run them.
          </div>

          {/* Specialties */}
          <div
            style={{
              fontSize: "11px",
              color: "rgba(228,228,231,0.3)",
              letterSpacing: "0.22em",
              marginBottom: "10px",
              display: "flex",
            }}
          >
            AI SYSTEMS · CONTEXT ARCHITECTURE · AGENTIC AI
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "rgba(228,228,231,0.3)",
              letterSpacing: "0.22em",
              marginBottom: "40px",
              display: "flex",
            }}
          >
            DATA PLATFORMS · ORGANIZATIONAL TRANSFORMATION
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#2563EB",
                opacity: 0.7,
                display: "flex",
              }}
            />
            <div
              style={{
                fontSize: "11px",
                color: "rgba(228,228,231,0.22)",
                letterSpacing: "0.18em",
                display: "flex",
              }}
            >
              zemrose.me
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "IBM Plex Mono",
          data: fontRegular,
          style: "normal" as const,
          weight: 400 as const,
        },
        {
          name: "IBM Plex Mono",
          data: fontMedium,
          style: "normal" as const,
          weight: 500 as const,
        },
      ],
    }
  );
}
