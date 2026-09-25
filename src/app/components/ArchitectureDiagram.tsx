"use client";

import { useState, useEffect } from "react";
import { Cpu, Database, Network, CheckCircle2, Layers, Server, Play, Shield, Gauge } from "lucide-react";
import Monogram from "./Monogram";

interface PipelineNode {
  id: string;
  step: string;
  title: string;
  icon: React.ReactNode;
  tech: string;
  latency: string;
  summary: string;
  architecturalDecisions: string[];
  payloadSample: string;
}

export default function ArchitectureDiagram() {
  const nodes: PipelineNode[] = [
    {
      id: "ingestion",
      step: "01",
      title: "Context & Query Ingestion",
      icon: <Layers size={18} className="text-[#ff6b35]" />,
      tech: "Next.js 16 · React 19 · WebSocket",
      latency: "< 25ms",
      summary: "Client query formulation with streaming token channels, intent parsing, and client-side token window budgeting.",
      architecturalDecisions: [
        "Structured query parsing with intent detection before invoking expensive model pipelines",
        "Bi-directional WebSocket streaming for zero perceived latency token output",
        "Client-side token window management to prevent context window bloat",
      ],
      payloadSample: `{
  "session_id": "sess_89f02",
  "intent": "code_architecture_query",
  "stream": true,
  "max_tokens": 1024
}`,
    },
    {
      id: "mcp",
      step: "02",
      title: "Model Context Protocol (MCP)",
      icon: <Server size={18} className="text-[#ff6b35]" />,
      tech: "MCP Servers SDK · Python · FastAPI",
      latency: "< 45ms",
      summary: "Open-standard protocol routing LLMs to local data resources, tools, and enterprise endpoints with strict sandboxing.",
      architecturalDecisions: [
        "Decoupled tool discovery exposing standard JSON schemas to model runtimes",
        "Permissioned execution boundaries preventing arbitrary or unvalidated system calls",
        "Modular server architecture allowing hot-swapping connectors without restarting inference engines",
      ],
      payloadSample: `{
  "protocol": "mcp/1.0",
  "method": "tools/call",
  "params": {
    "name": "query_database",
    "arguments": { "query": "SELECT cluster_id FROM nodes" }
  }
}`,
    },
    {
      id: "retrieval",
      step: "03",
      title: "Hybrid Vector & Graph RAG",
      icon: <Database size={18} className="text-[#ff6b35]" />,
      tech: "Pinecone · Neo4j · Cross-Encoder",
      latency: "< 120ms",
      summary: "Dense embedding generation paired with Neo4j entity graphs and cross-encoder re-ranking for contextual precision.",
      architecturalDecisions: [
        "Hybrid search combining sparse BM25 keyword matching with dense cosine embeddings",
        "Graph-augmented entity retrieval (Neo4j) to preserve relational context across documents",
        "Cross-encoder re-ranking step discarding low-relevance chunks to minimize hallucination risk",
      ],
      payloadSample: `{
  "vector_similarity": 0.892,
  "graph_hops": 2,
  "re_rank_score": 0.941,
  "context_chunks_selected": 3
}`,
    },
    {
      id: "orchestrator",
      step: "04",
      title: "LangChain Agentic Runtime",
      icon: <Network size={18} className="text-[#ff6b35]" />,
      tech: "LangChain · Python · ReAct Loops",
      latency: "< 80ms",
      summary: "Autonomous reasoning loop coordinating tool execution, fallback branches, and stateful conversation memory buffers.",
      architecturalDecisions: [
        "ReAct (Reasoning + Acting) decision loop for structured multi-step problem decomposition",
        "Deterministic error handling and graceful degradation paths when tool executions timeout",
        "Sliding memory buffers maintaining stateful coherence over extended sessions",
      ],
      payloadSample: `{
  "thought": "Query requires database inspection via MCP server",
  "action": "mcp.query_database",
  "observation": "2 active clusters identified",
  "status": "ready_for_synthesis"
}`,
    },
    {
      id: "inference",
      step: "05",
      title: "Groq Ultra-Fast Inference",
      icon: <Cpu size={18} className="text-[#ff6b35]" />,
      tech: "Groq LPU · LLaMA 3.3 / Claude · Pydantic",
      latency: "< 180ms",
      summary: "Sub-second token generation on specialized hardware with strict Pydantic JSON schema validation and guardrails.",
      architecturalDecisions: [
        "LPU-accelerated token generation delivering instantaneous streaming response curves",
        "Strict Pydantic output parsing guaranteeing type-safe JSON payloads for downstream services",
        "Deterministic output guardrails validating assertions prior to client delivery",
      ],
      payloadSample: `{
  "inference_hardware": "Groq LPU",
  "tokens_per_second": 480,
  "schema_validated": true,
  "total_pipeline_latency_ms": 380
}`,
    },
  ];

  const [activeNode, setActiveNode] = useState<PipelineNode>(nodes[1]); // Default to MCP
  const [simulating, setSimulating] = useState(false);
  const [activePulseIndex, setActivePulseIndex] = useState<number | null>(null);

  const startSimulation = () => {
    if (simulating) return;
    setSimulating(true);

    nodes.forEach((node, idx) => {
      setTimeout(() => {
        setActivePulseIndex(idx);
        setActiveNode(node);
        if (idx === nodes.length - 1) {
          setTimeout(() => {
            setSimulating(false);
            setActivePulseIndex(null);
          }, 1000);
        }
      }, idx * 750);
    });
  };

  return (
    <section id="architecture" className="py-28 px-6 lg:px-16 bg-[#0b0d11] relative z-10 border-t border-[#222735]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#f1f3f7] leading-tight">
              Production AI architecture.
            </h2>
            <p className="text-[#9ba3af] text-base max-w-2xl mt-4 font-sans">
              An interactive blueprint of an end-to-end production Generative AI pipeline featuring the Model Context Protocol (MCP),
              hybrid RAG, and Groq hardware acceleration.
            </p>
          </div>

          <button
            onClick={startSimulation}
            disabled={simulating}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#12151c] border border-[#222735] hover:border-[#ff6b35] text-[#f1f3f7] font-mono text-xs tracking-wider uppercase transition-colors disabled:opacity-50 min-h-[44px]"
          >
            <Play size={14} className={simulating ? "text-[#ff6b35] animate-spin" : "text-[#ff6b35]"} aria-hidden="true" />
            <span>{simulating ? "SIMULATING FLOW..." : "SIMULATE PIPELINE FLOW"}</span>
          </button>
        </div>

        {/* Pipeline Stage Buttons Row */}
        <div
          role="tablist"
          aria-label="AI Architecture Pipeline Phases"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8"
        >
          {nodes.map((node, index) => {
            const isSelected = activeNode.id === node.id;
            const isPulsing = activePulseIndex === index;

            return (
              <button
                key={node.id}
                id={`tab-step-${node.id}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls="panel-architecture-detail"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveNode(node)}
                className={`relative flex flex-col p-5 rounded-xl text-left transition-all duration-200 border focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none ${
                  isPulsing
                    ? "bg-[#181c26] border-[#ff6b35] shadow-[0_0_24px_rgba(255,107,53,0.3)] scale-[1.03]"
                    : isSelected
                    ? "bg-[#12151c] border-[#ff6b35]"
                    : "bg-[#0b0d11] border-[#222735] hover:border-[#ff6b35]/40 hover:bg-[#12151c]"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="text-[11px] font-mono font-bold text-[#ff6b35]">
                    STAGE {node.step}
                  </span>
                  <div aria-hidden="true">{node.icon}</div>
                </div>

                <h3 className="text-sm font-bold text-[#f1f3f7] mb-1.5 leading-snug">
                  {node.title}
                </h3>
                <span className="text-[11px] font-mono text-[#9ba3af] truncate w-full">
                  {node.tech}
                </span>

                {/* Active Indicator Arrow */}
                {isSelected && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#ff6b35] rotate-45 hidden lg:block" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Architecture Spec Card */}
        <div
          id="panel-architecture-detail"
          role="tabpanel"
          aria-labelledby={`tab-step-${activeNode.id}`}
          tabIndex={0}
          className="p-8 sm:p-10 rounded-xl bg-[#12151c] border border-[#222735] shadow-xl relative overflow-hidden focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left 7 cols: Specifications & Decisions */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded bg-[#ff6b35]/10 border border-[#ff6b35]/30 text-[#ff6b35] text-xs font-mono font-bold">
                  STAGE {activeNode.step} SPECIFICATION
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-[#9ba3af]">
                  <Gauge size={14} className="text-[#ff6b35]" />
                  Latency: <strong className="text-[#f1f3f7]">{activeNode.latency}</strong>
                </span>
                <span className="text-xs font-mono text-[#64748b]">
                  Stack: <strong className="text-[#f1f3f7]">{activeNode.tech}</strong>
                </span>
              </div>

              <div>
                <h4 className="text-2xl sm:text-3xl font-bold text-[#f1f3f7] mb-3">
                  {activeNode.title}
                </h4>
                <p className="text-[#9ba3af] text-base leading-relaxed font-sans">
                  {activeNode.summary}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#64748b] block">
                  Architectural Decisions &amp; Guardrails:
                </span>
                {activeNode.architecturalDecisions.map((decision, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#ff6b35] mt-0.5 shrink-0" />
                    <span className="text-sm text-[#cbd5e1] font-sans leading-relaxed">{decision}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right 5 cols: Architectural Payload & Monogram Watermark */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-5 rounded-lg bg-[#0b0d11] border border-[#222735] font-mono text-xs relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#222735] text-[#9ba3af]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs text-[#f1f3f7] font-semibold">{activeNode.id}_pipeline.json</span>
                  </div>
                  <span className="text-[11px] text-[#ff6b35]">SCHEMAS</span>
                </div>

                <pre className="text-[#9ba3af] overflow-x-auto text-[11px] leading-relaxed">
                  <code>{activeNode.payloadSample}</code>
                </pre>

                {/* Subdued Monogram watermark in the payload corner */}
                <div className="absolute bottom-3 right-3 opacity-30 pointer-events-none">
                  <Monogram size={36} />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-[#181c26] border border-[#222735] text-xs font-mono text-[#9ba3af]">
                <Shield size={16} className="text-[#ff6b35] shrink-0" />
                <span>Deterministic Pydantic validation &amp; zero hallucination enforcement.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
