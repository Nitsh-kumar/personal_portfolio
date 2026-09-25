"use client";

import { Calendar, MapPin, ExternalLink } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      role: "Software Engineer",
      company: "Sopra Steria",
      period: "Current",
      location: "Noida, India",
      type: "Full-Time",
      description:
        "Contributing to enterprise software engineering initiatives, building data-centric automation utilities, and developing scalable internal tool architectures for global business operations.",
      highlights: [
        "Engineering reliable data processing workflows and internal software services for enterprise client solutions.",
        "Collaborating across multidisciplinary engineering teams to integrate microservices with modern security standards.",
        "Driving implementation of clean code architecture, automated test suites, and streamlined data extraction pipelines.",
      ],
      tags: ["AI Software", "Enterprise Data Systems", "Python", "API Services", "Microservices"],
    },
    {
      role: "AI Systems Architect & Creator",
      company: "GPTCraft (Live Platform)",
      period: "2024 - Present",
      location: "Remote / Open-Source",
      type: "Flagship AI Project",
      link: "https://gptcraft.in/",
      description:
        "Architected and deployed GPTCraft, an end-to-end multi-model AI platform featuring native Model Context Protocol (MCP) server integration, Groq sub-second inference, and custom tool calling.",
      highlights: [
        "Engineered custom MCP Servers SDK integrations enabling LLMs to safely query databases and execute tools in real time.",
        "Integrated high-speed Groq LPU inference for token generation with sub-400ms end-to-end latency.",
        "Developed Data Nexa: an automated data profiling engine engineered to provide deeper diagnostic metrics than standard ydata-profiling.",
      ],
      tags: ["Model Context Protocol (MCP)", "LangChain", "Groq LPU", "FastAPI", "React", "Python"],
    },
    {
      role: "Applied AI Research & Open Source",
      company: "Generative AI Engineering Foundations",
      period: "Continuous",
      location: "India",
      type: "Technical Specialization",
      description:
        "Conducting applied research into agentic ReAct loops, hybrid retrieval-augmented generation (vector + graph), and deterministic tool calling.",
      highlights: [
        "Authored 17+ public repositories spanning NLP sentiment mining, automated data utilities, and agent workflows.",
        "Evaluated cross-encoder re-ranking pipelines and structured Pydantic schema validation for zero-hallucination agent outputs.",
      ],
      tags: ["Hybrid RAG", "Vector Stores", "Docker", "Neo4j", "FastAPI"],
    },
  ];

  return (
    <section id="experience" className="py-28 px-6 lg:px-16 bg-[#0b0d11] relative z-10 border-t border-[#222735]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#f1f3f7] leading-tight">
            Engineering experience &amp; milestones.
          </h2>
          <p className="text-[#9ba3af] text-base max-w-2xl mt-4 font-sans">
            A chronological timeline of enterprise software engineering at Sopra Steria alongside
            independent generative AI breakthroughs.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-[#222735] ml-4 sm:ml-6 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Node Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#0b0d11] border-2 border-[#ff6b35] group-hover:bg-[#ff6b35] transition-colors flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] group-hover:bg-[#0b0d11] transition-colors" />
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-xl bg-[#12151c] border border-[#222735] group-hover:border-[#ff6b35]/40 transition-all duration-300">
                
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#f1f3f7] group-hover:text-[#ff6b35] transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-semibold text-[#ff6b35] font-mono">
                        {exp.company}
                      </span>
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center p-1.5 rounded text-[#9ba3af] hover:text-[#ff6b35] transition-colors"
                          aria-label={`Visit ${exp.company} live platform (opens in new tab)`}
                        >
                          <ExternalLink size={15} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#9ba3af]">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#181c26] border border-[#222735]">
                      <Calendar size={13} className="text-[#ff6b35]" aria-hidden="true" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#181c26] border border-[#222735]">
                      <MapPin size={13} className="text-[#ff6b35]" aria-hidden="true" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#9ba3af] leading-relaxed mb-4 font-sans">
                  {exp.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 mb-6 text-xs sm:text-sm text-[#cbd5e1] font-sans">
                  {exp.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="text-[#ff6b35] font-mono mt-0.5" aria-hidden="true">&ndash;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#222735]">
                  {exp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded bg-[#0b0d11] border border-[#222735] text-[11px] font-mono text-[#9ba3af]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
