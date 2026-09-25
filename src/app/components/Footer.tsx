"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, MessageCircle, Mail } from "lucide-react";
import Monogram from "./Monogram";

export default function Footer() {
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        updateTime();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="bg-[#0b0d11] border-t border-[#222735] py-16 px-6 lg:px-16 relative z-10 text-[#9ba3af]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-3.5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-[#12151c] border border-[#222735] flex items-center justify-center p-1.5 group-hover:border-[#ff6b35] transition-colors">
                <Monogram size={18} />
              </div>
              <span className="text-lg font-bold text-[#f1f3f7] tracking-tight group-hover:text-[#ff6b35] transition-colors">
                Nitish Kumar
              </span>
            </Link>
            <p className="text-xs font-sans leading-relaxed max-w-sm text-[#9ba3af]">
              Software Engineer at <strong className="text-[#f1f3f7]">Sopra Steria</strong> &middot; Generative AI Developer
              architecting scalable LLM systems, custom Model Context Protocol (MCP) servers, and hybrid RAG pipelines.
            </p>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-[11px] font-mono uppercase tracking-[2px] text-[#ff6b35] font-semibold">
              Directory
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <Link href="#about" className="hover:text-[#f1f3f7] transition-colors">
                About
              </Link>
              <Link href="#experience" className="hover:text-[#f1f3f7] transition-colors">
                Experience
              </Link>
              <Link href="#projects" className="hover:text-[#f1f3f7] transition-colors">
                Projects
              </Link>
              <Link href="#architecture" className="hover:text-[#f1f3f7] transition-colors">
                Architecture
              </Link>
              <Link href="#skills" className="hover:text-[#f1f3f7] transition-colors">
                Skills
              </Link>
              <Link href="#contact" className="hover:text-[#f1f3f7] transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Live IST Clock & Back to Top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-3.5">
            <div className="p-3.5 rounded-lg bg-[#12151c] border border-[#222735] text-left md:text-right w-full md:w-auto">
              <span className="text-[11px] font-mono text-[#64748b] uppercase tracking-wider block">
                Local Time (Noida, IST)
              </span>
              <span className="text-sm font-mono font-medium text-[#f1f3f7] mt-0.5 block">
                {istTime || "12:00:00 PM"}
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="min-h-[40px] inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#12151c] border border-[#222735] text-xs font-mono text-[#9ba3af] hover:border-[#ff6b35] hover:text-[#f1f3f7] transition-colors focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} aria-hidden="true" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#222735] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-[#64748b]">
            &copy; {new Date().getFullYear()} Nitish Kumar. Engineered with Next.js 16, React 19 &amp; Tailwind CSS.
          </p>

          <div className="flex items-center gap-2 text-[#9ba3af]">
            <a
              href="https://github.com/Nitsh-kumar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-[#ff6b35] hover:bg-[#12151c] transition-colors focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none"
              aria-label="Nitish Kumar on GitHub (opens in new tab)"
            >
              <Github size={17} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/nitish2314/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-[#ff6b35] hover:bg-[#12151c] transition-colors focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none"
              aria-label="Nitish Kumar on LinkedIn (opens in new tab)"
            >
              <Linkedin size={17} aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/+918006569463"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-[#ff6b35] hover:bg-[#12151c] transition-colors focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none"
              aria-label="Chat with Nitish on WhatsApp (opens in new tab)"
            >
              <MessageCircle size={17} aria-hidden="true" />
            </a>
            <a
              href="mailto:tevathiyanitish800600@gmail.com"
              className="p-2 rounded-lg hover:text-[#ff6b35] hover:bg-[#12151c] transition-colors focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none"
              aria-label="Send direct email to Nitish Kumar"
            >
              <Mail size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
