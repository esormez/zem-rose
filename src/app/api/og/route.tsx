import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

const FONT_MONO_URL =
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n5ig.ttf";
const FONT_SANS_BOLD_URL =
  "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf";

export async function GET() {
  const [fontMono, fontSansBold] = await Promise.all([
    fetch(FONT_MONO_URL).then((r) => r.arrayBuffer()),
    fetch(FONT_SANS_BOLD_URL).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0A0A0B",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          position: "relative",
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
              "radial-gradient(ellipse 60% 60% at 30% 50%, rgba(37,99,235,0.04) 0%, transparent 100%)",
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

        {/* Corner bracket — TL */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "56px",
            width: "18px",
            height: "18px",
            borderTop: "1px solid rgba(37,99,235,0.4)",
            borderLeft: "1px solid rgba(37,99,235,0.4)",
            display: "flex",
          }}
        />

        {/* Corner bracket — BR */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "56px",
            width: "18px",
            height: "18px",
            borderBottom: "1px solid rgba(37,99,235,0.4)",
            borderRight: "1px solid rgba(37,99,235,0.4)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          {/* SYSTEM: ACTIVE label */}
          <div
            style={{
              fontFamily: "'IBM Plex Mono'",
              fontSize: "10px",
              color: "#2563EB",
              letterSpacing: "0.28em",
              marginBottom: "24px",
              display: "flex",
            }}
          >
            SYSTEM: ACTIVE // 2025–2026
          </div>

          {/* Title — Principal AI Architect */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: "106px",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
            }}
          >
            <span style={{ color: "#E4E4E7", display: "flex" }}>
              Principal
            </span>
            <span
              style={{
                color: "rgba(228,228,231,0.22)",
                display: "flex",
              }}
            >
              AI
            </span>
            <span style={{ color: "#E4E4E7", display: "flex" }}>
              Architect
            </span>
          </div>

          {/* Description */}
          <div
            style={{
              fontFamily: "Inter",
              fontSize: "15px",
              color: "rgba(228,228,231,0.42)",
              lineHeight: 1.75,
              marginTop: "44px",
              maxWidth: "580px",
              display: "flex",
            }}
          >
            Principal AI Architect at Intralytics. I build AI systems and the
            organizations to run them.
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* Blue square icon */}
            <div
              style={{
                width: "24px",
                height: "24px",
                border: "1px solid #2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  background: "#2563EB",
                  display: "flex",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono'",
                fontSize: "11px",
                color: "rgba(228,228,231,0.4)",
                letterSpacing: "0.12em",
                display: "flex",
              }}
            >
              JOHN ZEMROSE
            </div>
          </div>

          <div
            style={{
              fontFamily: "'IBM Plex Mono'",
              fontSize: "11px",
              color: "rgba(228,228,231,0.22)",
              letterSpacing: "0.12em",
              display: "flex",
            }}
          >
            zemrose.me
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
          data: fontMono,
          style: "normal" as const,
          weight: 400 as const,
        },
        {
          name: "Inter",
          data: fontSansBold,
          style: "normal" as const,
          weight: 700 as const,
        },
      ],
    }
  );
}
