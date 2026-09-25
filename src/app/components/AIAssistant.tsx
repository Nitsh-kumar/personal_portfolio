"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, User } from "lucide-react";
import Monogram from "./Monogram";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  sopra:
    "Nitish is a Software Engineer at Sopra Steria in Noida, India. He builds enterprise data-centric software utilities, automation pipelines, and robust backend services.",
  gptcraft:
    "GPTCraft (https://gptcraft.in/) is Nitish's flagship GenAI platform. It connects users to cutting-edge models with native Model Context Protocol (MCP) server integration, Groq sub-second inference, LangChain orchestration, and FastAPI.",
  mcp:
    "Nitish specializes in the Model Context Protocol (MCP) by Anthropic/Open-Standard. He builds custom MCP servers that allow LLMs to safely query databases, trigger APIs, and execute local tools deterministically.",
  skills:
    "Nitish's core technical stack includes: LangChain, Model Context Protocol (MCP), Groq LPU, RAG Pipelines, Vector DBs (Pinecone, ChromaDB, Neo4j), Python, FastAPI, Streamlit, Next.js 16, React 19, TypeScript, Docker, and PostgreSQL.",
  contact:
    "You can reach Nitish directly via email at tevathiyanitish800600@gmail.com, chat on WhatsApp at +91 8006569463, or connect on LinkedIn (linkedin.com/in/nitish2314). He is open to AI engineering opportunities and consulting.",
  projects:
    "Key projects include: 1) GPTCraft (Custom GPT platform with MCP Servers), 2) Data Nexa (advanced automated data profiling), 3) Bank Statement Analyzer (financial statement parser on Streamlit), and 4) ChatGPT Review Sentiment Intelligence.",
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! I am Nitish's assistant. Ask me anything about his software engineering at Sopra Steria, GPTCraft, MCP servers, or technical competencies.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    { label: "Sopra Steria Role", query: "What does Nitish do at Sopra Steria?" },
    { label: "GPTCraft & MCP", query: "Tell me about GPTCraft and MCP servers" },
    { label: "Core Stack", query: "What are Nitish's primary technical skills?" },
    { label: "Contact Channel", query: "How can I contact Nitish?" },
  ];

  const answerQuery = (userText: string) => {
    const textLower = userText.toLowerCase();
    let reply =
      "Nitish is a Software Engineer at Sopra Steria & GenAI Builder specializing in LLMs, RAG, and MCP servers. Feel free to check out his selected projects or reach out directly at tevathiyanitish800600@gmail.com!";

    if (textLower.includes("sopra") || textLower.includes("job") || textLower.includes("experience") || textLower.includes("work")) {
      reply = KNOWLEDGE_BASE.sopra;
    } else if (textLower.includes("gptcraft") || textLower.includes("craft")) {
      reply = KNOWLEDGE_BASE.gptcraft;
    } else if (textLower.includes("mcp") || textLower.includes("protocol") || textLower.includes("agent")) {
      reply = KNOWLEDGE_BASE.mcp;
    } else if (textLower.includes("skill") || textLower.includes("stack") || textLower.includes("tech") || textLower.includes("langchain")) {
      reply = KNOWLEDGE_BASE.skills;
    } else if (textLower.includes("contact") || textLower.includes("hire") || textLower.includes("email") || textLower.includes("reach") || textLower.includes("whatsapp")) {
      reply = KNOWLEDGE_BASE.contact;
    } else if (textLower.includes("project") || textLower.includes("portfolio") || textLower.includes("repo") || textLower.includes("data nexa")) {
      reply = KNOWLEDGE_BASE.projects;
    }

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      setIsTyping(false);
    }, 450);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const q = input;
    setInput("");
    answerQuery(q);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#12151c] border border-[#222735] text-[#f1f3f7] shadow-xl hover:border-[#ff6b35] transition-all min-h-[44px]"
          aria-label="Open AI Assistant dialog"
          aria-expanded={false}
          aria-controls="ai-chat-window"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <Monogram size={16} />
          </div>
          <span className="text-xs font-mono font-medium text-[#f1f3f7] tracking-wider">
            ASK NITISH AI
          </span>
          <span className="w-2 h-2 rounded-full bg-[#ff6b35] inline-block" />
        </button>
      )}

      {/* Chat Window Dialog */}
      {isOpen && (
        <div
          id="ai-chat-window"
          role="dialog"
          aria-modal="true"
          aria-label="Nitish Assistant Chat"
          className="w-[360px] sm:w-[400px] h-[520px] max-h-[85vh] rounded-xl bg-[#12151c] border border-[#222735] shadow-2xl flex flex-col overflow-hidden animate-in fade-in"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-[#0b0d11] border-b border-[#222735]">
            <div className="flex items-center gap-2.5">
              <Monogram size={20} />
              <div>
                <span className="text-xs font-bold text-[#f1f3f7] block">
                  Nitish Knowledge Engine
                </span>
                <span className="text-xs font-mono text-[#ff6b35] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  ONLINE &middot; MCP ENABLED
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-[#9ba3af] hover:text-[#f1f3f7] hover:bg-[#181c26] transition-colors"
              aria-label="Close assistant"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="px-3 py-2 bg-[#181c26] border-b border-[#222735] flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p) => (
              <button
                key={p.label}
                onClick={() => answerQuery(p.query)}
                className="whitespace-nowrap px-2.5 py-1 rounded bg-[#12151c] border border-[#222735] text-[11px] font-mono text-[#cbd5e1] hover:border-[#ff6b35]/50 hover:text-[#ff6b35] transition-colors shrink-0"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Message Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-6 h-6 rounded bg-[#181c26] border border-[#222735] flex items-center justify-center shrink-0 mt-0.5">
                    <Monogram size={14} />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-lg leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#ff6b35] text-[#0b0d11] font-medium"
                      : "bg-[#0b0d11] border border-[#222735] text-[#cbd5e1]"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === "user" && (
                  <div className="w-6 h-6 rounded bg-[#181c26] border border-[#222735] flex items-center justify-center shrink-0 mt-0.5 text-[#9ba3af]">
                    <User size={12} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded bg-[#181c26] border border-[#222735] flex items-center justify-center shrink-0">
                  <Monogram size={14} />
                </div>
                <div className="p-3 rounded-lg bg-[#0b0d11] border border-[#222735] text-[#9ba3af] text-xs font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] animate-ping" />
                  <span>Synthesizing response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-3 bg-[#0b0d11] border-t border-[#222735] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Sopra Steria, MCP, or GPTCraft..."
              className="flex-1 px-3 py-2 rounded-lg bg-[#12151c] text-xs text-[#f1f3f7] font-mono outline-none border border-[#222735] focus:border-[#ff6b35] transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-lg bg-[#ff6b35] text-[#0b0d11] hover:bg-[#ff8352] disabled:opacity-40 transition-colors"
              aria-label="Send query"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
