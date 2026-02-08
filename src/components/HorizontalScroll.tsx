'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';

interface HorizontalScrollProps {
  children: ReactNode;
  onScroll?: (progress: number) => void;
}

export default function HorizontalScroll({ children, onScroll }: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;

      // Trigger scroll callback
      if (onScroll) {
        onScroll(progress);
      }

      // Set scrolling state
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to detect scroll end
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // Keyboard navigation - smooth incremental scrolling
    let keyScrollInterval: NodeJS.Timeout | null = null;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();

        // Scroll smoothly in smaller increments
        const scrollIncrement = 40;
        const direction = e.key === 'ArrowRight' ? 1 : -1;

        // Clear any existing interval
        if (keyScrollInterval) {
          clearInterval(keyScrollInterval);
        }

        // Scroll continuously while key is held
        let scrollAmount = 0;
        const targetScroll = 905; // One card width + gap
        keyScrollInterval = setInterval(() => {
          if (scrollAmount >= targetScroll) {
            if (keyScrollInterval) clearInterval(keyScrollInterval);
            return;
          }
          container.scrollBy({
            left: scrollIncrement * direction,
            behavior: 'auto'
          });
          scrollAmount += scrollIncrement;
        }, 16); // ~60fps
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && keyScrollInterval) {
        clearInterval(keyScrollInterval);
        keyScrollInterval = null;
      }
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [onScroll]);

  return (
    <div
      ref={scrollRef}
      className="horizontal-scroll-container"
      style={{
        display: 'flex',
        gap: '30px',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollSnapType: 'x proximity',
        scrollBehavior: 'auto',
        padding: '0 max(calc((100vw - 875px) / 2), 80px)',
        minHeight: '100vh',
        alignItems: 'center',
        transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: isScrolling ? 'scale(0.95)' : 'scale(1)',
        WebkitOverflowScrolling: 'touch',
        willChange: 'transform',
      }}
    >
      {children}

      <style jsx>{`
        .horizontal-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .horizontal-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .horizontal-scroll-container > :global(*) {
          scroll-snap-align: center;
        }
      `}</style>
    </div>
  );
}
