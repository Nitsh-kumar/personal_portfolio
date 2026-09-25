"use client";

import { ArrowRight, Sparkles, Layers } from "lucide-react";
import Hero3DCanvas from "./Hero3DCanvas";
import Monogram from "./Monogram";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-[#0b0d11] flex items-center pt-28 pb-16 px-6 sm:px-10 lg:px-16">
      {/* Subtle architectural ambient gradient - restrained warm amber flare */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff6b35]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Authority Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Identity & Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#12151c] border border-[#222735] mb-8 shadow-sm">
              <Monogram size={18} />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" aria-hidden="true" />
              <span className="font-mono text-xs tracking-wider text-[#9ba3af]">
                Applied AI Engineer @ <span className="text-[#f1f3f7] font-semibold">Sopra Steria</span> &middot; GenAI Systems
              </span>
            </div>

            {/* Headline - No gradient text, pure weight & scale */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#f1f3f7] leading-[1.08] tracking-tight mb-6">
              Engineering intelligent architectures &amp; autonomous agent systems.
            </h1>

            {/* Architectural Subtitle */}
            <p className="text-lg sm:text-xl text-[#9ba3af] leading-relaxed max-w-2xl mb-10 font-sans">
              I design and deploy production-grade LLM platforms, custom Model Context Protocol (MCP) servers,
              and low-latency data pipelines that bridge generative AI research with reliable enterprise scalability.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg bg-[#ff6b35] text-[#0b0d11] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#ff8352] transition-colors focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none min-h-[48px] shadow-sm"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>

              <a
                href="#architecture"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg bg-[#12151c] text-[#f1f3f7] border border-[#222735] hover:border-[#ff6b35]/50 hover:bg-[#181c26] font-mono text-xs font-semibold tracking-widest uppercase transition-colors focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none min-h-[48px]"
              >
                <Layers size={16} className="text-[#ff6b35]" aria-hidden="true" />
                <span>AI ARCHITECTURE</span>
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[#9ba3af] hover:text-[#f1f3f7] font-mono text-xs tracking-wider transition-colors min-h-[48px]"
              >
                <Sparkles size={14} className="text-[#ff6b35]" aria-hidden="true" />
                <span>GET IN TOUCH</span>
              </a>
            </div>

            {/* Architectural Evidence Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-8 border-t border-[#222735]">
              {[
                { label: "Organization", val: "Sopra Steria" },
                { label: "Core Protocol", val: "Model Context (MCP)" },
                { label: "Flagship Platform", val: "GPTCraft (Live)" },
                { label: "Base", val: "Noida, India" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748b]">
                    {item.label}
                  </span>
                  <span className="text-xs font-mono font-medium text-[#f1f3f7] mt-1">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive 3D Centerpiece */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <Hero3DCanvas />
            <div className="text-center mt-2">
              <span className="text-[11px] font-mono text-[#64748b] tracking-wider">
                INTERACTIVE 3D NEURAL CORE &middot; DRAG TO ROTATE
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
