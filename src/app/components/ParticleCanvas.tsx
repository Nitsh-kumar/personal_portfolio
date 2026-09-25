"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  alpha: number;
  color: string;
}

interface ParticleCanvasProps {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

export default function ParticleCanvas({ mousePos }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let isVisible = true;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const colors = ["#00d4ff", "#00aacc", "#38bdf8", "#e8f4ff"];

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const initParticles = () => {
      particles = [];
      const particleCount = prefersReducedMotion
        ? 24
        : Math.floor(Math.min(window.innerWidth / 20, 60));

      for (let i = 0; i < particleCount; i++) {
        const baseVx = (Math.random() - 0.5) * 0.4;
        const baseVy = (Math.random() - 0.5) * 0.4;
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          size: Math.random() * 1.6 + 0.8,
          alpha: Math.random() * 0.4 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleResize = () => {
      resizeCanvas();
      initParticles();
      if (prefersReducedMotion) {
        renderFrame(false);
      }
    };

    window.addEventListener("resize", handleResize);

    resizeCanvas();
    initParticles();

    const renderFrame = (continuous: boolean) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (continuous) {
          // Cursor attraction & gentle displacement
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            p.vx += (dx / dist) * force * 0.5;
            p.vy += (dy / dist) * force * 0.5;
          }

          // Velocity damping
          p.vx = p.vx * 0.96 + p.baseVx * 0.04;
          p.vy = p.vy * 0.96 + p.baseVy * 0.04;

          p.x += p.vx;
          p.y += p.vy;

          // Wrap around boundaries
          if (p.x < 0) p.x = window.innerWidth;
          if (p.x > window.innerWidth) p.x = 0;
          if (p.y < 0) p.y = window.innerHeight;
          if (p.y > window.innerHeight) p.y = 0;
        }

        // Render particle node without expensive shadowBlur
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      // Connect synoptic edges
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = 0.12 * (1 - dist / 90);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      if (continuous && isVisible) {
        animationFrameId = requestAnimationFrame(() => renderFrame(true));
      }
    };

    if (prefersReducedMotion) {
      renderFrame(false);
    } else {
      renderFrame(true);
    }

    // Pause loop when canvas is scrolled out of viewport
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !prefersReducedMotion) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => renderFrame(true));
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    });

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
    />
  );
}
