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
          background: "#060608",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `linear-gradient(rgba(228,228,231,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(228,228,231,0.04) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Radial fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 20%, #060608 100%)",
          }}
        />

        {/* Blue atmosphere left */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 40% 80% at 15% 50%, rgba(37,99,235,0.07) 0%, transparent 100%)",
          }}
        />

        {/* Network graph — left side */}
        {(() => {
          // Deterministic seed-based random for consistent renders
          const seed = (s: number) => {
            let v = s;
            return () => {
              v = (v * 16807 + 0) % 2147483647;
              return (v - 1) / 2147483646;
            };
          };
          const rng = seed(42);

          // Generate cluster centers on the left portion (0-600px wide, full height)
          const clusters = [
            { cx: 120, cy: 80 },
            { cx: 280, cy: 60 },
            { cx: 80, cy: 200 },
            { cx: 220, cy: 180 },
            { cx: 400, cy: 140 },
            { cx: 160, cy: 320 },
            { cx: 340, cy: 280 },
            { cx: 480, cy: 240 },
            { cx: 60, cy: 340 },
            { cx: 420, cy: 350 },
          ];

          // Generate nodes around clusters
          const nodes: { x: number; y: number; r: number; o: number }[] = [];
          for (const c of clusters) {
            const count = 5 + Math.floor(rng() * 6);
            for (let i = 0; i < count; i++) {
              const angle = rng() * Math.PI * 2;
              const dist = rng() * 60 + 10;
              nodes.push({
                x: c.cx + Math.cos(angle) * dist,
                y: c.cy + Math.sin(angle) * dist,
                r: 1 + rng() * 1.5,
                o: 0.15 + rng() * 0.25,
              });
            }
          }

          // Generate connections between nearby nodes
          const lines: { x1: number; y1: number; x2: number; y2: number; o: number }[] = [];
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              const dx = nodes[i].x - nodes[j].x;
              const dy = nodes[i].y - nodes[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 70 && rng() < 0.5) {
                lines.push({
                  x1: nodes[i].x,
                  y1: nodes[i].y,
                  x2: nodes[j].x,
                  y2: nodes[j].y,
                  o: 0.06 + rng() * 0.08,
                });
              }
            }
          }

          return (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "600px",
                height: "396px",
                display: "flex",
              }}
            >
              {/* Fade mask — fade out on right edge */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, transparent 0%, transparent 60%, #060608 100%)",
                  zIndex: 2,
                  display: "flex",
                }}
              />

              {/* Connection lines as thin rotated divs */}
              {lines.map((l, i) => {
                const dx = l.x2 - l.x1;
                const dy = l.y2 - l.y1;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                return (
                  <div
                    key={`l${i}`}
                    style={{
                      position: "absolute",
                      left: `${l.x1}px`,
                      top: `${l.y1}px`,
                      width: `${length}px`,
                      height: "1px",
                      background: `rgba(228,228,231,${l.o})`,
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: "0 0",
                      display: "flex",
                    }}
                  />
                );
              })}

              {/* Nodes as small circles */}
              {nodes.map((n, i) => (
                <div
                  key={`n${i}`}
                  style={{
                    position: "absolute",
                    left: `${n.x - n.r}px`,
                    top: `${n.y - n.r}px`,
                    width: `${n.r * 2}px`,
                    height: `${n.r * 2}px`,
                    borderRadius: "50%",
                    background: `rgba(228,228,231,${n.o})`,
                    display: "flex",
                  }}
                />
              ))}
            </div>
          );
        })()}

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
              marginBottom: "16px",
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
              color: "rgba(228,228,231,0.5)",
              letterSpacing: "3px",
              display: "flex",
            }}
          >
            AI SYSTEMS · DATA ARCHITECTURE · ENGINEERING TRANSFORMATION
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#2563EB",
                opacity: 0.7,
                display: "flex",
              }}
            />
            <div
              style={{
                fontFamily: "'IBM Plex Mono'",
                fontSize: "9px",
                color: "rgba(228,228,231,0.22)",
                letterSpacing: "2px",
                display: "flex",
              }}
            >
              ZEMROSE.ME // TECHNICAL DRAFTSMAN // 2026
            </div>
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
