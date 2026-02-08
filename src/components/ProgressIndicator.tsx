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
  const boxPosition = progress * (totalLines - 1);
  const gapSize = 8; // gap-2 = 8px
  const lineWidth = 1; // w-px
  const totalWidth = totalLines * lineWidth + (totalLines - 1) * gapSize;
  const boxLeftOffset = (boxPosition / (totalLines - 1)) * totalWidth;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      {/* Progress lines */}
      <div className="relative flex items-center gap-2 px-4 py-4">
        {/* Smooth sliding box */}
        <div
          className="absolute border z-10 pointer-events-none"
          style={{
            borderColor: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-base)',
            width: '24px',
            height: '20px',
            left: `calc(1rem + ${boxLeftOffset}px)`, // 1rem = px-4 padding
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
