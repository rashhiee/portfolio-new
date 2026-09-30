"use client";

import * as React from "react";
import { useTheme } from "next-themes";

type NodeType = "client" | "api" | "database" | "cache";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: NodeType;
  label: string;
  isKeyNode: boolean;
  pulsePhase: number;
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export function NetworkCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isPaused = false;
    let width = 0;
    let height = 0;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mouse tracking
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
      isActive: false,
    };

    let nodes: Node[] = [];
    let packets: Packet[] = [];

    const nodeTypes: { type: NodeType; label: string; darkColor: string; lightColor: string }[] = [
      { type: "client", label: "Client", darkColor: "#38bdf8", lightColor: "#0284c7" },
      { type: "api", label: "API Gateway", darkColor: "#34d399", lightColor: "#059669" },
      { type: "database", label: "PostgreSQL", darkColor: "#818cf8", lightColor: "#4f46e5" },
      { type: "cache", label: "Redis", darkColor: "#f472b6", lightColor: "#db2777" },
    ];

    const initNodes = () => {
      const isMobile = width < 768;
      const count = isMobile ? 16 : 38;
      nodes = [];
      packets = [];

      for (let i = 0; i < count; i++) {
        const typeInfo = nodeTypes[i % nodeTypes.length];
        const isKeyNode = i < 6; // First 6 nodes have technical role labels

        const speedMultiplier = prefersReducedMotion ? 0 : 0.45;
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.2 + Math.random() * 0.4) * speedMultiplier;

        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: isKeyNode ? 4.5 : 2.5,
          type: typeInfo.type,
          label: typeInfo.label,
          isKeyNode,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initNodes();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Tab visibility handling: pause when hidden to save CPU/battery
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) {
        lastTime = performance.now();
        requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Color definitions based on active theme
    const getNodeColor = (type: NodeType) => {
      const found = nodeTypes.find((n) => n.type === type);
      if (!found) return isDark ? "#10b981" : "#059669";
      return isDark ? found.darkColor : found.lightColor;
    };

    let lastTime = performance.now();

    // Spawn packets along connected edges
    const maybeSpawnPacket = (i: number, j: number) => {
      if (prefersReducedMotion || packets.length > 12) return;
      if (Math.random() < 0.008) {
        packets.push({
          fromNode: i,
          toNode: j,
          progress: 0,
          speed: 0.008 + Math.random() * 0.012,
          color: getNodeColor(nodes[i].type),
        });
      }
    };

    // Render loop
    const render = (time: number) => {
      if (isPaused) return;

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Max connection distance
      const maxDistance = width < 768 ? 110 : 160;

      // 1. Draw connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.22 : 0.18);
            ctx.strokeStyle = isDark
              ? `rgba(241, 245, 249, ${alpha})`
              : `rgba(15, 23, 42, ${alpha * 0.9})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            maybeSpawnPacket(i, j);
          }
        }

        // Draw connection to mouse cursor if within radius
        if (mouse.isActive) {
          const dx = mouse.x - a.x;
          const dy = mouse.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.45;
            ctx.strokeStyle = isDark
              ? `rgba(16, 185, 129, ${alpha})`
              : `rgba(5, 150, 105, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 2. Render and update data packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const from = nodes[pkt.fromNode];
        const to = nodes[pkt.toNode];
        if (!from || !to) continue;

        const px = from.x + (to.x - from.x) * pkt.progress;
        const py = from.y + (to.y - from.y) * pkt.progress;

        ctx.fillStyle = pkt.color;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Render and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Update positions if motion is allowed
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          // Bounce smoothly on canvas boundaries
          if (node.x <= 0 || node.x >= width) node.vx *= -1;
          if (node.y <= 0 || node.y >= height) node.vy *= -1;

          // Gentle mouse repulsion/attraction
          if (mouse.isActive) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius && dist > 1) {
              const force = (mouse.radius - dist) / mouse.radius;
              node.x -= (dx / dist) * force * 1.5;
              node.y -= (dy / dist) * force * 1.5;
            }
          }

          node.pulsePhase += delta * 2;
        }

        const color = getNodeColor(node.type);

        // Subtle glowing halo for key nodes
        if (node.isKeyNode) {
          const pulse = (Math.sin(node.pulsePhase) + 1) * 0.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 3 + pulse * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(16, 185, 129, ${0.1 + pulse * 0.15})`
            : `rgba(5, 150, 105, ${0.08 + pulse * 0.1})`;
          ctx.fill();
        }

        // Inner solid node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Technical label for key nodes
        if (node.isKeyNode && width >= 640) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = isDark ? "rgba(241, 245, 249, 0.65)" : "rgba(15, 23, 42, 0.65)";
          ctx.fillText(node.label, node.x + 8, node.y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full h-full pointer-events-auto overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75 dark:opacity-90"
      />
    </div>
  );
}
