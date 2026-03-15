"use client";

import { useEffect, useRef } from "react";
import ParticleCanvas from "./ParticleCanvas";

export default function Hero() {
  const targetMousePos = useRef({ x: 0, y: 0 });
  const currentDotPos = useRef({ x: 0, y: 0 });
  const currentRingPos = useRef({ x: 0, y: 0 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let isMounted = true;

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      targetMousePos.current = { x: e.clientX, y: e.clientY };

      if (textContainerRef.current) {
        // Map cursor position to a max of 5 degrees tilt
        const tiltX = (e.clientY / window.innerHeight - 0.5) * -10;
        const tiltY = (e.clientX / window.innerWidth - 0.5) * 10;
        textContainerRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }
    };

    // Animation loop for custom cursor
    const updateCursor = () => {
      if (!isMounted) return;

      currentDotPos.current.x = targetMousePos.current.x;
      currentDotPos.current.y = targetMousePos.current.y;

      // Linear interpolation for the lagging ring
      currentRingPos.current.x += (targetMousePos.current.x - currentRingPos.current.x) * 0.12;
      currentRingPos.current.y += (targetMousePos.current.y - currentRingPos.current.y) * 0.12;

      // Apply transformations
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(calc(${currentDotPos.current.x}px - 50%), calc(${currentDotPos.current.y}px - 50%), 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(calc(${currentRingPos.current.x}px - 50%), calc(${currentRingPos.current.y}px - 50%), 0)`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    updateCursor();

    return () => {
      isMounted = false;
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#05080f] cursor-none flex items-center justify-center perspective-[1000px]">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        {/* INSERT_VIDEO_PATH */}
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[rgba(5,8,15,0.6)] z-[1]" />

      {/* Interactive Particle Canvas */}
      <ParticleCanvas mousePos={targetMousePos} />

      {/* CSS Grid Background Pattern */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path d="M0 0h40v40H0z" fill="none"/><path d="M0 39.5h40M39.5 0v40" stroke="%23ffffff" stroke-width="1"/></svg>')`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Centered Content */}
      <div
        ref={textContainerRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 transition-transform duration-100 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <span
          className="font-space-mono text-[#00d4ff] text-[11px] tracking-[4px] mb-6 block uppercase"
        >
          GENERATIVE AI DEVELOPER
        </span>
        <h1
          className="font-syne text-[36px] md:text-[64px] text-[#e8f4ff] font-bold leading-tight mb-4"
        >
          Building minds with code.
        </h1>
        <p className="text-[#8899aa] text-lg md:text-xl font-medium mb-10 max-w-2xl">
          LLMs · RAG Pipelines · Agents · LANGCHAIN
        </p>
        {/* <button
          className="bg-[#00d4ff] text-[#05080f] font-semibold rounded-full px-8 py-4 cursor-none transition-all duration-300 hover:shadow-[0_0_24px_#00d4ff]"
        >
          View My Work
        </button> */}
      </div>

      {/* Custom Cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[8px] h-[8px] bg-[#00d4ff] rounded-full pointer-events-none z-50 will-change-transform"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[36px] h-[36px] border border-[#00d4ff] rounded-full pointer-events-none z-50 will-change-transform"
      />
    </section>
  );
}
