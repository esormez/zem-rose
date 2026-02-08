'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: number;
  cluster: number;
  radius: number;
  color: string;
  opacity: number;
  connections: number;
  driftOffset: number;
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

    // Set canvas size
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Create cluster centers around the edges/perimeter
    const numClusters = 8;
    const margin = 150;
    const clusterCenters = [
      // Top edge
      { x: window.innerWidth * 0.25, y: margin },
      { x: window.innerWidth * 0.75, y: margin },
      // Right edge
      { x: window.innerWidth - margin, y: window.innerHeight * 0.33 },
      { x: window.innerWidth - margin, y: window.innerHeight * 0.66 },
      // Bottom edge
      { x: window.innerWidth * 0.25, y: window.innerHeight - margin },
      { x: window.innerWidth * 0.75, y: window.innerHeight - margin },
      // Left edge
      { x: margin, y: window.innerHeight * 0.33 },
      { x: margin, y: window.innerHeight * 0.66 },
    ];

    // Create many nodes with clustering
    const nodes: Node[] = [];
    const totalNodes = 800;

    // Rose palette - burgundy nodes
    const nodeColor = '#8D152C';

    for (let i = 0; i < totalNodes; i++) {
      const cluster = Math.floor(Math.random() * numClusters);
      const clusterCenter = clusterCenters[cluster];

      // Distribute nodes around cluster centers with some randomness
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 200;

      nodes.push({
        id: i,
        cluster,
        radius: Math.random() * 1.5 + 1.5,
        color: nodeColor,
        opacity: 0.5 + Math.random() * 0.3,
        connections: 0,
        x: clusterCenter.x + Math.cos(angle) * distance,
        y: clusterCenter.y + Math.sin(angle) * distance,
        driftOffset: Math.random() * Math.PI * 2
      });
    }

    // Create dense interconnections
    const links: Link[] = [];
    const maxDistance = 120;

    // Connect nodes within clusters more heavily
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = (nodes[i].x || 0) - (nodes[j].x || 0);
        const dy = (nodes[i].y || 0) - (nodes[j].y || 0);
        const distance = Math.sqrt(dx * dx + dy * dy);

        const sameCluster = nodes[i].cluster === nodes[j].cluster;
        const connectionChance = sameCluster ? 0.7 : 0.25;

        if (distance < maxDistance && Math.random() < connectionChance) {
          links.push({
            source: nodes[i],
            target: nodes[j],
            opacity: 0.08 + Math.random() * 0.12
          });
          nodes[i].connections++;
          nodes[j].connections++;
        }
      }
    }

    // Create some hub nodes with extra connections
    const hubNodes = nodes.filter(n => n.connections > 8);
    hubNodes.forEach(hub => {
      hub.radius = hub.radius * 1.5;
      hub.opacity = Math.min(1, hub.opacity * 1.2);
    });

    // D3 force simulation with clustering
    const simulation = d3.forceSimulation<Node>(nodes)
      .force('charge', d3.forceManyBody().strength(-20))
      .force('link', d3.forceLink<Node, Link>(links).distance(50).strength(0.5))
      .force('cluster', () => {
        nodes.forEach(node => {
          const center = clusterCenters[node.cluster];
          if (node.x && node.y) {
            node.vx = (node.vx || 0) + (center.x - node.x) * 0.01;
            node.vy = (node.vy || 0) + (center.y - node.y) * 0.01;
          }
        });
      })
      .force('collision', d3.forceCollide<Node>().radius(d => d.radius * 2))
      .alphaDecay(0.015)
      .velocityDecay(0.7);

    // Animation loop (minimal movement)
    let time = 0;
    const animate = () => {
      time += 0.0008;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw connections with consistent blueprint color
      links.forEach(link => {
        const source = link.source as Node;
        const target = link.target as Node;

        if (source.x && source.y && target.x && target.y) {
          // Very subtle movement (barely perceptible)
          const sourceX = source.x + Math.sin(time + source.driftOffset) * 0.3;
          const sourceY = source.y + Math.cos(time + source.driftOffset) * 0.3;
          const targetX = target.x + Math.sin(time + target.driftOffset) * 0.3;
          const targetY = target.y + Math.cos(time + target.driftOffset) * 0.3;

          ctx.strokeStyle = `rgba(83, 76, 68, ${link.opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(sourceX, sourceY);
          ctx.lineTo(targetX, targetY);
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        if (!node.x || !node.y) return;

        // Very subtle drift animation
        const driftX = Math.sin(time + node.driftOffset) * 0.3;
        const driftY = Math.cos(time + node.driftOffset) * 0.3;

        const x = node.x + driftX;
        const y = node.y + driftY;

        // Draw subtle glow for hub nodes
        if (node.connections > 8) {
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, node.radius * 4);
          gradient.addColorStop(0, `${node.color}20`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, node.radius * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw node
        ctx.fillStyle = `${node.color}${Math.floor(node.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(x, y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Run simulation for a bit to settle, then stop it
    simulation.tick(200);
    simulation.stop(); // Stop simulation to improve performance
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
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
