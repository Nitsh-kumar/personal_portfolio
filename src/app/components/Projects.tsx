"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    title: "GPTCraft",
    logo: "/craft_logo.png",
    emoji: "",
    tags: ["LangChain", "GROQ", "MCP SERVERS SDK", "Python", "FastAPI", "React"],
    description: "A Custom GPt let's You access to latest AI models, With Cutting Edge  MCP SERVERS",
    link: "https://gptcraft.in/",
    github: "https://github.com/Nitsh-kumar/GPT_craft/tree/frontend"
  },
  {
    title: "Vision Agent",
    emoji: "🧠",
    tags: ["YOLO", "OpenCV", "Python"],
    description: "Real-time object detection and tracking pipeline optimized for edge deployment. Capable of processing 60fps video streams.",
    link: "#",
    github: "#"
  },
  {
    title: "AI Chatbot",
    emoji: "⚡",
    tags: ["Anthropic", "FastAPI", "React"],
    description: "Low-latency conversational interface with structured output parsing, tools integration, and stateful memory management.",
    link: "#",
    github: "#"
  }
];

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg) translateZ(0px)");
  const [isHovered, setIsHovered] = useState(false);

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
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // max 15deg
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`);
  };

  const handleMouseLeave = () => {
    setTransform("rotateX(0deg) rotateY(0deg) translateZ(0px)");
    setIsHovered(false);
  };

  return (
    <div
      ref={observerRef}
      style={{
        perspective: "1000px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease-out ${index * 150}ms, transform 0.6s ease-out ${index * 150}ms`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className="bg-[#0a1628] p-[28px] relative flex flex-col h-full z-10"
        style={{
          borderRadius: "12px",
          transform,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
          border: `1px solid ${isHovered ? "#00d4ff44" : "#00d4ff22"}`,
          boxShadow: isHovered ? "0 20px 60px rgba(0,212,255,0.1)" : "none",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-70"
          style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
        />

        <div style={{ transform: isHovered ? "translateZ(30px)" : "translateZ(0)", transition: "transform 0.3s ease" }} className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            {project.logo ? (
              <div className="w-[45px] h-[45px] relative rounded-xl overflow-hidden bg-[#00d4ff11] border border-[#00d4ff22] flex items-center justify-center p-2">
                <Image
                  src={project.logo}
                  alt={`${project.title} Logo`}
                  fill
                  className="object-contain p-2"
                />
              </div>
            ) : (
              <div className="text-[28px]">{project.emoji}</div>
            )}
          </div>

          <h3 className="font-syne text-[18px] text-[#e8f4ff] font-bold mb-4 tracking-tight group-hover:text-[#00d4ff] transition-colors">
            {project.title}
          </h3>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="font-space-mono text-[10px] bg-[#00d4ff0a] border border-[#00d4ff15] text-[#00d4ffcc] rounded-[6px] px-[10px] py-[3px]"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-[13px] text-[#8899aa] leading-relaxed mb-8 flex-grow">
            {project.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00d4ff] text-[14px] flex items-center gap-2 hover:underline font-space-mono group/link"
            >
              View Project
              <span className="transition-transform group-hover/link:translate-x-1">&rarr;</span>
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8899aa] hover:text-[#00d4ff] transition-all duration-300 hover:scale-110"
              aria-label="GitHub Repository"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="bg-[#05080f] py-[120px] px-6 sm:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-space-mono text-[#00d4ff] tracking-widest text-sm mb-4 uppercase">
            SELECTED WORK
          </p>
          <h2 className="font-syne text-[48px] text-white font-bold leading-tight">
            Projects that think.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
