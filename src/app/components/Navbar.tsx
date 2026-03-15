"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight;
      const winHeight = window.innerHeight;
      const progress = (scrollY / (docHeight - winHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Init immediately

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
      { rootMargin: "-50% 0px -50% 0px" } // Trigger when section hits middle of viewport
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navLinks = [
    { label: "WORK", href: "#projects" },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] z-[100] transition-all duration-75"
        style={{
          backgroundColor: "#00d4ff",
          width: `${scrollProgress}%`,
        }}
      />

      {/* Navbar */}
      <nav 
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 lg:px-12 h-20"
        style={{
          backgroundColor: "rgba(5, 8, 15, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0, 212, 255, 0.08)",
        }}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/logo.png" 
            alt="Nit's Portfolio Logo" 
            width={32} 
            height={32} 
            className="rounded-md object-cover" 
          />
          <span 
            className="text-[#e8f4ff] font-bold"
            style={{ fontFamily: "var(--font-syne)", fontSize: "16px" }}
          >
            Nit's Portfolio
          </span>
        </Link>

        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link 
                key={link.label}
                href={link.href} 
                className={`relative group transition-colors duration-300 ${isActive ? 'text-[#00d4ff]' : 'text-[#00d4ff66] hover:text-[#00d4ff]'}`}
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: "11px",
                  letterSpacing: "2px",
                }}
              >
                {link.label}
                <span 
                  className={`absolute -bottom-2 left-0 h-[1px] bg-[#00d4ff] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
