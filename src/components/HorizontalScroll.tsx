'use client';

import { useRef, useEffect, useImperativeHandle, forwardRef, ReactNode, useCallback } from 'react';

export interface HorizontalScrollHandle {
  scrollToCard: (index: number) => void;
}

interface HorizontalScrollProps {
  children: ReactNode;
  onScroll?: (progress: number) => void;
}

const CARD_WIDTH = 875;
const GAP = 48;
const CARD_STEP = CARD_WIDTH + GAP;

// Spring physics constants
const TENSION = 180;
const FRICTION = 24;
const MASS = 1;

function springAnimate(
  container: HTMLElement,
  from: number,
  to: number,
  onDone: () => void,
) {
  let position = from;
  let velocity = 0;
  let lastTime = performance.now();
  let raf: number;

  const tick = (now: number) => {
    const dt = Math.min((now - lastTime) / 1000, 0.064); // cap at ~15fps minimum
    lastTime = now;

    const displacement = position - to;
    const springForce = -TENSION * displacement;
    const dampingForce = -FRICTION * velocity;
    const acceleration = (springForce + dampingForce) / MASS;

    velocity += acceleration * dt;
    position += velocity * dt;

    container.scrollLeft = position;

    // Settle when close enough and slow enough
    if (Math.abs(displacement) < 0.5 && Math.abs(velocity) < 0.5) {
      container.scrollLeft = to;
      onDone();
      return;
    }

    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

const HorizontalScroll = forwardRef<HorizontalScrollHandle, HorizontalScrollProps>(function HorizontalScroll({ children, onScroll }, ref) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const cancelSpringRef = useRef<(() => void) | null>(null);

  const reportProgress = useCallback(() => {
    const container = scrollRef.current;
    if (!container || !onScroll) return;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    onScroll(progress);
  }, [onScroll]);

  const springTo = useCallback((target: number) => {
    const container = scrollRef.current;
    if (!container) return;

    // Cancel any existing spring
    cancelSpringRef.current?.();
    isAnimatingRef.current = true;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const clamped = Math.max(0, Math.min(target, maxScroll));

    cancelSpringRef.current = springAnimate(
      container,
      container.scrollLeft,
      clamped,
      () => { isAnimatingRef.current = false; },
    );
  }, []);

  // Find nearest card snap point
  const getNearestSnap = useCallback((scrollLeft: number) => {
    return Math.round(scrollLeft / CARD_STEP) * CARD_STEP;
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      reportProgress();
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (e.repeat) return;
      e.preventDefault();
      if (isAnimatingRef.current) return;

      const direction = e.key === 'ArrowRight' ? 1 : -1;
      const currentCard = Math.round(container.scrollLeft / CARD_STEP);
      const targetCard = currentCard + direction;
      springTo(targetCard * CARD_STEP);
    };

    // Momentum wheel → horizontal + snap on settle
    let velocity = 0;
    let momentumRAF: number | null = null;
    let lastWheelTime = 0;
    let lastInputTime = 0; // tracks any user scroll input
    const friction = 0.94;
    const inputDampen = 0.4;

    const momentumLoop = () => {
      velocity *= friction;
      container.scrollLeft += velocity;

      if (Math.abs(velocity) > 0.5) {
        momentumRAF = requestAnimationFrame(momentumLoop);
      } else {
        velocity = 0;
        momentumRAF = null;
        // Snap on settle — spring to nearest card
        const snap = getNearestSnap(container.scrollLeft);
        if (Math.abs(container.scrollLeft - snap) > 2) {
          springTo(snap);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      lastInputTime = Date.now();

      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) {
        // Native horizontal swipe — track for snap on settle
        lastWheelTime = Date.now();
        return;
      }

      e.preventDefault();

      // Cancel any active spring
      cancelSpringRef.current?.();
      isAnimatingRef.current = false;

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;
      if (e.deltaMode === 2) delta *= container.clientHeight;

      velocity += delta * inputDampen;

      if (!momentumRAF) {
        momentumRAF = requestAnimationFrame(momentumLoop);
      }
    };

    // Snap after native horizontal scroll (trackpad swipe) settles
    let snapTimeout: ReturnType<typeof setTimeout>;
    const handleScrollEnd = () => {
      clearTimeout(snapTimeout);
      // Don't snap while spring is animating (prevents feedback loop)
      // or while momentum scroll is active
      if (isAnimatingRef.current || momentumRAF) return;

      snapTimeout = setTimeout(() => {
        // Re-check guards after delay
        if (isAnimatingRef.current || momentumRAF) return;
        // If user scrolled recently, skip — they're still interacting
        if (Date.now() - lastInputTime < 300) return;

        const snap = getNearestSnap(container.scrollLeft);
        if (Math.abs(container.scrollLeft - snap) > 2) {
          springTo(snap);
        }
      }, 400);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('scroll', handleScrollEnd, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('scroll', handleScrollEnd);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      cancelSpringRef.current?.();
      if (momentumRAF) cancelAnimationFrame(momentumRAF);
      clearTimeout(snapTimeout);
    };
  }, [reportProgress, springTo, getNearestSnap]);

  useImperativeHandle(ref, () => ({
    scrollToCard: (index: number) => {
      springTo(CARD_STEP * index);
    },
  }));

  return (
    <div
      ref={scrollRef}
      className="horizontal-scroll-container"
      style={{
        display: 'flex',
        gap: `${GAP}px`,
        overflowX: 'auto',
        overflowY: 'hidden',
        padding: '0 max(calc((100vw - 875px) / 2), 120px)',
        minHeight: '100vh',
        alignItems: 'center',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {children}
    </div>
  );
});

export default HorizontalScroll;
