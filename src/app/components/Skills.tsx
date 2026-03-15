"use client";

import { useEffect, useRef } from "react";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  const skillCategories = [
    {
      title: "AI & LLMs",
      skills: ["GPT-4", "Claude", "LangChain", "HuggingFace", "PINECONE", "RAG", "Prompt Eng.", "Neo4j"]
    },
    {
      title: "Development",
      skills: ["Python", "FastAPI", "React", "TypeScript", "Docker", "PostgreSQL", "REST APIs"]
    },
    {
      title: "Tools & Cloud",
      skills: ["AWS", "GCP", "Git", "Jupyter", "Weights & Biases", "Streamlit", "Linux"]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const columns = entry.target.querySelectorAll(".skill-col");
            columns.forEach((col, idx) => {
              setTimeout(() => {
                col.classList.remove("opacity-0", "translate-y-10");
                col.classList.add("opacity-100", "translate-y-0");
              }, idx * 200);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#070b14",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      {/* Animated scanline */}
      <div
        className="absolute left-0 right-0 h-[1px] w-full z-0 pointer-events-none"
        style={{
          backgroundColor: "#00d4ff",
          opacity: 0.04,
          animation: "scanline 5s linear infinite"
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <p
            className="text-[#00d4ff] tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            EXPERTISE
          </p>
          <h2
            className="text-white font-bold"
            style={{ fontFamily: "var(--font-syne)", fontSize: "44px" }}
          >
            My Toolkit.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="skill-col opacity-0 translate-y-10 transition-all duration-700 ease-out flex flex-col gap-6"
            >
              <h3
                className="text-[#00d4ff]"
                style={{ fontFamily: "var(--font-syne)", fontSize: "18px" }}
              >
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block transition-all duration-250 cursor-default hover:scale-105 hover:shadow-[0_0_14px_#00d4ff44] border border-[#00d4ff33] hover:border-[#00d4ff88]"
                    style={{
                      backgroundColor: "#0a1628",
                      color: "#00d4ff",
                      borderRadius: "999px",
                      padding: "6px 16px",
                      fontFamily: "var(--font-space-mono)",
                      fontSize: "11px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
