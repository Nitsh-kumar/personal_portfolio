"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Briefcase, MapPin, Code2, Cpu } from "lucide-react";
import Monogram from "./Monogram";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  const stats = [
    { value: "Sopra Steria", label: "Senior Applied AI Engineer", icon: <Briefcase size={16} className="text-[#ff6b35]" aria-hidden="true" /> },
    { value: "4 Years", label: "Engineering Experience", icon: <Code2 size={16} className="text-[#ff6b35]" aria-hidden="true" /> },
    { value: "LangGraph & MCP", label: "Agentic Workflows", icon: <Cpu size={16} className="text-[#ff6b35]" aria-hidden="true" /> },
    { value: "Noida, IN", label: "Active Base", icon: <MapPin size={16} className="text-[#ff6b35]" aria-hidden="true" /> },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="bg-[#0b0d11] relative overflow-hidden py-28 px-6 lg:px-16 border-t border-[#222735]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: 3D Photo Container with Perspective Tilt */}
          <div
            className="lg:col-span-5 flex justify-center transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
            }}
          >
            <div className="relative group">
              <div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-[280px] h-[330px] sm:w-[320px] sm:h-[380px] rounded-xl bg-[#12151c] border border-[#222735] overflow-hidden shadow-xl transition-transform duration-200 ease-out"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src="/nitish-profile.jpg"
                  alt="Nitish Kumar"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 280px, 320px"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d11] via-transparent to-transparent opacity-80" />

                {/* Status chip over photo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#12151c]/95 backdrop-blur-md border border-[#222735]">
                  <div className="flex items-center gap-2.5">
                    <Monogram size={18} />
                    <span className="text-xs font-mono text-[#f1f3f7] font-semibold">
                      Nitish Kumar
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#ff6b35] uppercase tracking-wider font-semibold">
                    Sopra Steria
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Authentic Profile Content */}
          <div
            className="lg:col-span-7 flex flex-col gap-6 transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "150ms",
            }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f1f3f7] leading-tight">
              Bridging enterprise data systems with autonomous AI intelligence.
            </h2>

            <p className="text-[#9ba3af] text-base sm:text-lg leading-relaxed font-sans">
              I am a Senior Software Engineer (Applied AI &amp; Backend Engineering) at <strong className="text-[#f1f3f7] font-semibold">Sopra Steria</strong> in Noida, India,
              with 4 years of engineering experience across Generative AI, LLM-powered applications, Python backend services, and enterprise SAP S/4HANA systems.
            </p>

            <p className="text-[#9ba3af] text-base leading-relaxed font-sans">
              Currently, I contribute to an AI-assisted SAP custom-code assessment and remediation platform (pilot with a European aerospace client)
              using LangGraph, LangChain, Celery, and Google Vertex AI. My focus is architecting durable agentic loops with checkpointing,
              deterministic tool-calling via the <strong className="text-[#f1f3f7] font-semibold">Model Context Protocol (MCP)</strong>,
              and low-latency platforms like <em>GPTCraft</em>.
            </p>

            {/* Core Capability Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "LangChain Orchestration",
                "Model Context Protocol (MCP)",
                "FastAPI & Python",
                "Hybrid Vector & Graph RAG",
                "Enterprise Data Systems",
                "Groq LPU Acceleration",
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 rounded-lg bg-[#12151c] border border-[#222735] text-xs font-mono text-[#f1f3f7]"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-4 rounded-lg bg-[#12151c] border border-[#222735] hover:border-[#ff6b35]/40 transition-colors"
                >
                  <div className="mb-2.5">{stat.icon}</div>
                  <span className="text-lg sm:text-xl font-bold text-[#f1f3f7]">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-mono text-[#9ba3af] mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
