"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import Monogram from "./Monogram";

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight;
      const winHeight = window.innerHeight;
      const progress = winHeight < docHeight ? (scrollY / (docHeight - winHeight)) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "PROJECTS", href: "#projects" },
    { label: "ARCHITECTURE", href: "#architecture" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[100] transition-all duration-75 bg-[#ff6b35]"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Main Navbar Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 lg:px-16 h-20 bg-[#0b0d11]/90 backdrop-blur-md border-b border-[#222735]">
        <Link href="/" className="flex items-center gap-3.5 group" aria-label="Nitish Kumar - Home">
          <div className="w-9 h-9 rounded-lg bg-[#12151c] border border-[#222735] flex items-center justify-center p-1.5 group-hover:border-[#ff6b35] transition-colors">
            <Monogram size={22} priority />
          </div>
          <div className="flex flex-col">
            <span className="text-[#f1f3f7] font-bold text-sm tracking-wide group-hover:text-[#ff6b35] transition-colors">
              Nitish Kumar
            </span>
            <span className="text-xs text-[#9ba3af] tracking-widest font-mono">
              SOFTWARE ENGINEER &middot; SOPRA STERIA
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative py-1 text-xs tracking-[1.5px] font-mono transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none rounded ${
                  isActive ? "text-[#ff6b35] font-semibold" : "text-[#9ba3af] hover:text-[#f1f3f7]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#ff6b35]" />
                )}
              </Link>
            );
          })}

          {/* Resume PDF Action */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider px-4 py-2 rounded-lg border border-[#222735] text-[#f1f3f7] bg-[#12151c] hover:border-[#ff6b35] hover:text-[#ff6b35] transition-all duration-200 min-h-[40px]"
          >
            <FileText size={14} aria-hidden="true" />
            <span>RESUME</span>
            <ArrowUpRight size={12} aria-hidden="true" className="opacity-60" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg border border-[#222735] text-[#f1f3f7] bg-[#12151c] min-h-[44px]"
            aria-label="Download resume PDF (opens in new tab)"
          >
            <FileText size={14} aria-hidden="true" />
            <span>RESUME</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#f1f3f7] hover:text-[#ff6b35] transition-colors focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none rounded-lg"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation Menu"
          className="fixed inset-0 z-40 lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 bg-[#0b0d11]/98 backdrop-blur-xl border-b border-[#222735] overflow-y-auto"
        >
          <div className="flex flex-col gap-6">
            <div className="pb-4 border-b border-[#222735] flex items-center gap-3">
              <Monogram size={28} />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#f1f3f7]">Nitish Kumar</span>
                <span className="text-[11px] font-mono text-[#9ba3af]">Generative AI &amp; Software Engineering</span>
              </div>
            </div>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-mono tracking-widest flex items-center justify-between py-2 transition-colors focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none rounded ${
                    isActive ? "text-[#ff6b35] font-bold" : "text-[#9ba3af] hover:text-[#f1f3f7]"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#222735]">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#ff6b35] text-[#0b0d11] font-bold text-sm tracking-wider font-mono hover:bg-[#ff8352] transition-colors min-h-[44px]"
            >
              <FileText size={16} aria-hidden="true" />
              VIEW RESUME
            </a>
            <p className="text-center text-xs text-[#64748b] font-mono">
              Noida, India &middot; Software Engineer at Sopra Steria
            </p>
          </div>
        </div>
      )}
    </>
  );
}
