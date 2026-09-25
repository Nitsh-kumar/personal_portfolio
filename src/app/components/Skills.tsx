"use client";

import { Bot, Database, Code2, Cpu } from "lucide-react";

export default function Skills() {
  const bentoSkills = [
    {
      title: "Generative AI & Agent Architectures",
      category: "CORE FOCUS",
      icon: <Bot size={20} className="text-[#ff6b35]" />,
      description: "Engineering autonomous reasoning loops, deterministic tool-calling pipelines, and multi-model systems.",
      skills: [
        "Model Context Protocol (MCP)",
        "LangChain ReAct Loops",
        "Groq LPU Acceleration",
        "OpenAI & Claude APIs",
        "Hybrid RAG (Vector + Graph)",
        "Pinecone & ChromaDB",
        "Prompt Optimization",
        "Neo4j Knowledge Graphs",
      ],
    },
    {
      title: "Data & Backend Engineering",
      category: "DATA SYSTEMS",
      icon: <Database size={20} className="text-[#ff6b35]" />,
      description: "Constructing robust enterprise APIs, automated data profiling engines, and scalable ingestion services.",
      skills: [
        "Python (Advanced)",
        "FastAPI",
        "Data Profiling & Auditing",
        "Streamlit",
        "PostgreSQL",
        "Pandas & NumPy",
        "Docker Containerization",
        "RESTful Microservices",
      ],
    },
    {
      title: "Frontend & Reactive Systems",
      category: "CLIENT ARCHITECTURE",
      icon: <Code2 size={20} className="text-[#ff6b35]" />,
      description: "Delivering responsive web applications with real-time streaming interfaces and modern 3D graphics.",
      skills: [
        "Next.js 16 (App Router)",
        "React 19",
        "TypeScript",
        "Tailwind CSS 4",
        "Three.js & WebGL",
        "Real-Time WebSockets",
        "State Management",
        "Performance Optimization",
      ],
    },
    {
      title: "Cloud, Infrastructure & Workflows",
      category: "INFRASTRUCTURE",
      icon: <Cpu size={20} className="text-[#ff6b35]" />,
      description: "Managing version control, cloud hosting, CI/CD automation, and isolated container environments.",
      skills: [
        "Git & GitHub Workflows",
        "GitHub Actions CI/CD",
        "AWS Cloud Services",
        "Linux Environments",
        "Jupyter & ML Notebooks",
        "Vercel Edge Deployment",
        "API Security & Auth",
        "Performance Monitoring",
      ],
    },
  ];

  return (
    <section id="skills" className="py-28 px-6 lg:px-16 bg-[#0b0d11] relative z-10 border-t border-[#222735]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#f1f3f7] leading-tight">
            Technical competencies &amp; stack.
          </h2>
          <p className="text-[#9ba3af] text-base max-w-2xl mt-4 font-sans">
            A comprehensive matrix of engineering capabilities spanning autonomous AI agents, enterprise data systems,
            and reactive client applications.
          </p>
        </div>

        {/* 4-Quadrant Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bentoSkills.map((bento, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-xl bg-[#12151c] border border-[#222735] hover:border-[#ff6b35]/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="p-2.5 rounded-lg bg-[#181c26] border border-[#222735]">
                    {bento.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">
                      {bento.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#f1f3f7]">
                      {bento.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#9ba3af] leading-relaxed mb-6 font-sans">
                  {bento.description}
                </p>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#222735]">
                {bento.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 rounded bg-[#0b0d11] border border-[#222735] text-xs font-mono text-[#cbd5e1] hover:border-[#ff6b35]/50 hover:text-[#ff6b35] transition-colors cursor-default"
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
