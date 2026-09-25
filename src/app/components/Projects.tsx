"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, Sparkles, Zap, BarChart3, Brain } from "lucide-react";

interface Project {
  title: string;
  logo?: string;
  icon?: React.ReactNode;
  category: "GENAI & MCP" | "DATA & ANALYTICS";
  tags: string[];
  description: string;
  highlight: string;
  link?: string;
  github: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "GPTCraft",
    logo: "/craft_logo.png",
    category: "GENAI & MCP",
    featured: true,
    tags: ["Model Context Protocol (MCP)", "LangChain", "Groq LPU", "FastAPI", "React", "Python"],
    description:
      "A production Custom GPT platform granting seamless access to cutting-edge AI models with native Model Context Protocol (MCP) server integration, deterministic tool calling, and sub-400ms Groq inference.",
    highlight: "Live MCP Servers SDK & Groq Sub-Second Inference",
    link: "https://gptcraft.in/",
    github: "https://github.com/Nitsh-kumar/GPT_craft/tree/frontend",
  },
  {
    title: "Data Nexa",
    icon: <Zap size={22} className="text-[#ff6b35]" aria-hidden="true" />,
    category: "DATA & ANALYTICS",
    featured: true,
    tags: ["Python", "Automated Profiling", "Pandas", "Statistical Analysis", "Data Quality"],
    description:
      "High-performance automated data profiling engine engineered to surpass standard ydata-profiling tools, offering deep statistical analysis, automated quality audits, and data distribution diagnostics.",
    highlight: "Engineered Beyond Standard YData-Profiling",
    github: "https://github.com/Nitsh-kumar/Data_Nexa",
  },
  {
    title: "Bank Statement Analyzer",
    icon: <BarChart3 size={22} className="text-[#ff6b35]" aria-hidden="true" />,
    category: "DATA & ANALYTICS",
    tags: ["Streamlit", "Python", "Financial Analytics", "CSV Parsing", "Categorization"],
    description:
      "Intelligent financial parsing system that ingests bank statement CSVs, automatically categorizes expenses and income, and delivers interactive visual spending distribution intelligence.",
    highlight: "Automated Financial Categorization & Visual Reporting",
    github: "https://github.com/Nitsh-kumar/Bank_statement_analyzer",
  },
  {
    title: "ChatGPT Review Sentiment Intelligence",
    icon: <Brain size={22} className="text-[#ff6b35]" aria-hidden="true" />,
    category: "GENAI & MCP",
    tags: ["NLP", "Transformers", "Sentiment Analysis", "Jupyter", "Python"],
    description:
      "End-to-end NLP classification pipeline analyzing thousands of ChatGPT user feedback reviews to uncover satisfaction indices, feature demand signals, and customer sentiment distribution.",
    highlight: "NLP Sentiment Classification & Review Mining",
    github: "https://github.com/Nitsh-kumar/Chatgpt_Review_Analysis",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  };

  return (
    <div
      ref={observerRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease-out ${index * 100}ms, transform 0.5s ease-out ${index * 100}ms`,
      }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-col justify-between h-full p-7 sm:p-8 rounded-xl bg-[#12151c] border border-[#222735] hover:border-[#ff6b35]/40 transition-all duration-200 group"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3.5">
              {project.logo ? (
                <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-[#181c26] border border-[#222735] flex items-center justify-center p-2">
                  <Image
                    src={project.logo}
                    alt={`${project.title} Logo`}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-[#181c26] border border-[#222735] flex items-center justify-center">
                  {project.icon}
                </div>
              )}
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-[#f1f3f7] group-hover:text-[#ff6b35] transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>

            {project.featured && (
              <span className="flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-1 rounded bg-[#ff6b35]/10 border border-[#ff6b35]/30 text-[#ff6b35]">
                <Sparkles size={12} aria-hidden="true" />
                FLAGSHIP
              </span>
            )}
          </div>

          {/* Key architecture highlight badge */}
          <div className="mb-4 px-3 py-1.5 rounded bg-[#181c26] border border-[#222735] text-xs font-mono text-[#cbd5e1]">
            <span className="text-[#ff6b35] mr-1.5">&gt;</span> {project.highlight}
          </div>

          {/* Description */}
          <p className="text-sm text-[#9ba3af] leading-relaxed mb-6 font-sans">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#0b0d11] border border-[#222735] text-[#9ba3af]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#222735] mt-auto">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#ff6b35] hover:text-[#ff8352] transition-colors min-h-[40px] px-2 -ml-2 rounded focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none"
              aria-label={`Open live application for ${project.title} (opens in new tab)`}
            >
              <span>LIVE APPLICATION</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : (
            <span className="text-xs font-mono text-[#64748b] py-2">
              Open-Source Utility
            </span>
          )}

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-[#9ba3af] hover:text-[#f1f3f7] transition-colors p-2 min-h-[40px] rounded hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none"
            aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
          >
            <Github size={15} aria-hidden="true" />
            <span>SOURCE CODE</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "GENAI & MCP", "DATA & ANALYTICS"];

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-28 px-6 lg:px-16 bg-[#0b0d11] relative z-10 border-t border-[#222735]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading & Category Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#f1f3f7] leading-tight">
              Selected systems &amp; repositories.
            </h2>
            <p className="text-[#9ba3af] text-base max-w-2xl mt-4 font-sans">
              Production AI platforms, custom Model Context Protocol (MCP) tool routers, and statistical data profiling engines.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-[#12151c] border border-[#222735]"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                aria-controls="projects-grid"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 min-h-[40px] rounded-md text-xs font-mono tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none ${
                  selectedCategory === cat
                    ? "bg-[#ff6b35] text-[#0b0d11] font-bold"
                    : "text-[#9ba3af] hover:text-[#f1f3f7]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div
          id="projects-grid"
          role="region"
          aria-live="polite"
          aria-label={`${selectedCategory} projects grid`}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
