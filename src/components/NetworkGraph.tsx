'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: number;
  cluster: number;
  radius: number;
  baseRadius: number;
  opacity: number;
  connections: number;
  phase: number; // unique phase offset for animation
}

interface Link {
  source: Node;
  target: Node;
  opacity: number;
}

export default function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // --- Offscreen canvas for static link layer ---
    const linkCanvas = document.createElement('canvas');
    const linkCtx = linkCanvas.getContext('2d');
    if (!linkCtx) return;

    let dpr = window.devicePixelRatio || 1;
    let needsLinkRedraw = true;

    const updateSize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      linkCanvas.width = width * dpr;
      linkCanvas.height = height * dpr;
      linkCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      needsLinkRedraw = true;
    };
    updateSize();

    window.addEventListener('resize', updateSize);

    // --- Create cluster centers around perimeter ---
    const margin = 150;
    const clusterCenters = [
      { x: width * 0.25, y: margin },
      { x: width * 0.75, y: margin },
      { x: width - margin, y: height * 0.33 },
      { x: width - margin, y: height * 0.66 },
      { x: width * 0.25, y: height - margin },
      { x: width * 0.75, y: height - margin },
      { x: margin, y: height * 0.33 },
      { x: margin, y: height * 0.66 },
    ];
    const numClusters = clusterCenters.length;

    // --- Create nodes ---
    const nodes: Node[] = [];
    const totalNodes = 800;
    const nodeColor = '#8B2942';

    for (let i = 0; i < totalNodes; i++) {
      const cluster = Math.floor(Math.random() * numClusters);
      const center = clusterCenters[cluster];
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 200;
      const r = Math.random() * 1.5 + 1.5;

      nodes.push({
        id: i,
        cluster,
        radius: r,
        baseRadius: r,
        opacity: 0.5 + Math.random() * 0.3,
        connections: 0,
        phase: Math.random() * Math.PI * 2,
        x: center.x + Math.cos(angle) * distance,
        y: center.y + Math.sin(angle) * distance,
      });
    }

    // --- Create links ---
    const links: Link[] = [];
    const maxDistance = 120;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = (nodes[i].x || 0) - (nodes[j].x || 0);
        const dy = (nodes[i].y || 0) - (nodes[j].y || 0);
        const dist = Math.sqrt(dx * dx + dy * dy);

        const sameCluster = nodes[i].cluster === nodes[j].cluster;
        const chance = sameCluster ? 0.7 : 0.25;

        if (dist < maxDistance && Math.random() < chance) {
          links.push({
            source: nodes[i],
            target: nodes[j],
            opacity: 0.08 + Math.random() * 0.12,
          });
          nodes[i].connections++;
          nodes[j].connections++;
        }
      }
    }

    // Mark hub nodes
    nodes.forEach((n) => {
      if (n.connections > 8) {
        n.baseRadius *= 1.5;
        n.radius = n.baseRadius;
        n.opacity = Math.min(1, n.opacity * 1.2);
      }
    });

    // --- D3 simulation (settle then stop) ---
    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force('charge', d3.forceManyBody().strength(-20))
      .force('link', d3.forceLink<Node, Link>(links).distance(50).strength(0.5))
      .force('cluster', () => {
        nodes.forEach((node) => {
          const center = clusterCenters[node.cluster];
          if (node.x && node.y) {
            node.vx = (node.vx || 0) + (center.x - node.x) * 0.01;
            node.vy = (node.vy || 0) + (center.y - node.y) * 0.01;
          }
        });
      })
      .force('collision', d3.forceCollide<Node>().radius((d) => d.baseRadius * 2))
      .alphaDecay(0.015)
      .velocityDecay(0.7);

    simulation.tick(200);
    simulation.stop();

    // Snapshot settled positions for animation baseline
    const settled = nodes.map((n) => ({ x: n.x || 0, y: n.y || 0 }));

    // --- Draw static links once (redrawn only on resize) ---
    function drawLinks() {
      if (!linkCtx) return;
      linkCtx.clearRect(0, 0, width, height);
      for (const link of links) {
        const sx = settled[link.source.id].x;
        const sy = settled[link.source.id].y;
        const tx = settled[link.target.id].x;
        const ty = settled[link.target.id].y;

        linkCtx.strokeStyle = `rgba(83, 76, 68, ${link.opacity})`;
        linkCtx.lineWidth = 0.5;
        linkCtx.beginPath();
        linkCtx.moveTo(sx, sy);
        linkCtx.lineTo(tx, ty);
        linkCtx.stroke();
      }
      needsLinkRedraw = false;
    }

    // --- Animation loop ---
    let time = 0;

    const animate = () => {
      time += 0.015;

      // Redraw link layer only when needed
      if (needsLinkRedraw) drawLinks();

      ctx.clearRect(0, 0, width, height);

      // Composite static link layer (source is DPR-scaled, draw into logical coords)
      ctx.drawImage(linkCanvas, 0, 0, linkCanvas.width, linkCanvas.height, 0, 0, width, height);

      // Traveling pulse: a wave that sweeps across the canvas
      const pulseX = ((time * 0.08) % 1.4 - 0.2) * width;
      const pulseRadius = 300;

      // Draw animated nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const base = settled[i];

        // Floating motion — visible drift on unique sine paths
        const floatX = Math.sin(time * 0.4 + node.phase) * 8;
        const floatY = Math.cos(time * 0.3 + node.phase * 1.3) * 8;

        const x = base.x + floatX;
        const y = base.y + floatY;

        // Pulse brightness boost
        const distToPulse = Math.abs(x - pulseX);
        const pulseBoost = distToPulse < pulseRadius
          ? (1 - distToPulse / pulseRadius) * 0.5
          : 0;

        // Breathing radius
        const breathe = 1 + Math.sin(time * 0.8 + node.phase) * 0.25;
        const r = node.baseRadius * breathe;

        const alpha = Math.min(1, node.opacity + pulseBoost);

        // Glow for hub nodes
        if (node.connections > 8) {
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
          gradient.addColorStop(0, `rgba(139, 41, 66, ${0.2 + pulseBoost * 0.4})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, r * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node dot — draw solid, no alpha blending issues
        ctx.fillStyle = `rgba(139, 41, 66, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    drawLinks();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      simulation.stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'var(--bg-base)' }}
    />
  );
}
