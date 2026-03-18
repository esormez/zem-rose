'use client';

interface ProgressIndicatorProps {
  progress?: number; // 0-1 value representing scroll position
  totalLines?: number;
}

export default function ProgressIndicator({
  progress = 0.05, // Default to ~first section position
  totalLines = 20
}: ProgressIndicatorProps) {
  // Calculate smooth position for the box based on progress
  const gapSize = 8; // gap-2 = 8px
  const lineWidth = 1; // w-px
  const lineSpacing = lineWidth + gapSize; // 9px between line starts
  const boxWidth = 30; // Total box width (with box-sizing: border-box, includes border)

  // Total width from first line's left edge to last line's right edge
  const totalWidth = (totalLines - 1) * lineSpacing; // 171px (distance between first and last line centers)

  // At progress=0: box left edge aligns with first line's left edge (0px)
  //   → box center at 12px (half of 24px box width)
  // At progress=1: box right edge aligns with last line's right edge
  //   → box center at 159px
  const boxLeftOffset = (boxWidth / 2) + progress * (totalWidth - boxWidth);

  return (
    <div>
      {/* Progress lines */}
      <div className="relative flex items-center gap-2 px-4 py-4">
        {/* Smooth sliding box */}
        <div
          className="absolute border z-10 pointer-events-none"
          style={{
            borderColor: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-base)',
            width: '30px',
            height: '20px',
            left: `${boxLeftOffset}px`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Vertical lines */}
        {Array.from({ length: totalLines }).map((_, index) => (
          <div
            key={index}
            className="w-px h-5 relative z-0"
            style={{
              backgroundColor: 'var(--text-secondary)',
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
}
