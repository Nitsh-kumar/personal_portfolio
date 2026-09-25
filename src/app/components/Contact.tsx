"use client";

import { useState } from "react";
import { Github, Linkedin, MessageCircle, Mail, Copy, Check, Send, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const emailAddress = "tevathiyanitish800600@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMsg = formData.message.trim();

    if (!trimmedName) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!trimmedMsg || trimmedMsg.length < 10) {
      setStatus("error");
      setErrorMessage("Please provide a message with at least 10 characters.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      `Inquiry from ${trimmedName} (Portfolio)`
    )}&body=${encodeURIComponent(
      `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMsg}`
    )}`;

    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      window.location.href = mailtoUrl;
    }, 600);
  };

  const socials = [
    {
      title: "WhatsApp Chat",
      label: "+91 8006569463",
      href: "https://wa.me/+918006569463?text=Hi%20Nitish,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20connect!",
      icon: <MessageCircle size={18} className="text-[#ff6b35]" />,
      actionText: "Chat Direct",
    },
    {
      title: "LinkedIn",
      label: "in/nitish2314",
      href: "https://www.linkedin.com/in/nitish2314/",
      icon: <Linkedin size={18} className="text-[#ff6b35]" />,
      actionText: "Connect",
    },
    {
      title: "GitHub",
      label: "@Nitsh-kumar",
      href: "https://github.com/Nitsh-kumar",
      icon: <Github size={18} className="text-[#f1f3f7]" />,
      actionText: "View Code",
    },
  ];

  return (
    <section id="contact" className="py-28 px-6 lg:px-16 bg-[#0b0d11] relative z-10 border-t border-[#222735]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#f1f3f7] leading-tight">
            Connect &amp; collaborate.
          </h2>
          <p className="text-[#9ba3af] text-base mt-4 font-sans">
            Whether you are discussing enterprise AI systems, custom Model Context Protocol (MCP) server integration,
            or engineering opportunities, my direct channels are open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Quick Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Primary Email Card with 1-Click Copy */}
            <div className="p-6 sm:p-7 rounded-xl bg-[#12151c] border border-[#222735]">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#ff6b35] uppercase tracking-wider font-semibold">
                  <Mail size={15} />
                  <span>DIRECT INBOX</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">Response ~24 hrs</span>
              </div>

              <p className="text-sm font-mono text-[#f1f3f7] font-semibold mb-4 break-all">
                {emailAddress}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#181c26] border border-[#222735] hover:border-[#ff6b35] text-[#f1f3f7] font-mono text-xs font-medium transition-colors min-h-[40px]"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">COPIED TO CLIPBOARD</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>COPY EMAIL</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${emailAddress}`}
                  className="py-2.5 px-4 rounded-lg bg-[#ff6b35] text-[#0b0d11] font-mono text-xs font-bold hover:bg-[#ff8352] transition-colors min-h-[40px] flex items-center justify-center"
                >
                  OPEN CLIENT
                </a>
              </div>
            </div>

            {/* Direct Connect Channels */}
            {socials.map((social) => (
              <a
                key={social.title}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-[#12151c] border border-[#222735] hover:border-[#ff6b35]/50 transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2 rounded-lg bg-[#181c26] border border-[#222735]">
                    {social.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#f1f3f7]">
                      {social.title}
                    </h4>
                    <span className="text-xs font-mono text-[#9ba3af]">
                      {social.label}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-mono text-[#ff6b35] group-hover:translate-x-1 transition-transform">
                  {social.actionText} &rarr;
                </span>
              </a>
            ))}

            {/* Base Location Card */}
            <div className="p-4 rounded-xl bg-[#12151c] border border-[#222735] flex items-center gap-3 text-xs font-mono text-[#9ba3af]">
              <MapPin size={16} className="text-[#ff6b35] shrink-0" />
              <span>Based in <strong className="text-[#f1f3f7]">Noida, India</strong> &middot; Sopra Steria &amp; Global AI Engagements</span>
            </div>

          </div>

          {/* RIGHT: Direct Message Form */}
          <div className="lg:col-span-7 p-7 sm:p-8 rounded-xl bg-[#12151c] border border-[#222735]">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#222735]">
              <span className="text-xs font-mono text-[#ff6b35] tracking-wider uppercase font-semibold">
                Direct Inquiry Form
              </span>
              <span className="text-[11px] font-mono text-[#64748b]">STANDARD DISPATCH</span>
            </div>

            {status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                className="py-12 px-6 text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Check size={24} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-[#f1f3f7] mb-2">
                  Message Prepared
                </h3>
                <p className="text-sm text-[#9ba3af] max-w-sm mx-auto mb-6">
                  Your mail client has been opened with your pre-filled inquiry. Nitish will respond promptly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-lg bg-[#ff6b35] text-[#0b0d11] font-mono text-xs font-bold hover:bg-[#ff8352] transition-colors"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono text-[#9ba3af] uppercase tracking-wider mb-2"
                  >
                    Your Name <span className="text-[#ff6b35]" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedInput("name")}
                    onBlur={() => setFocusedInput(null)}
                    aria-required="true"
                    aria-invalid={status === "error" && !formData.name.trim()}
                    aria-describedby={status === "error" ? "contact-form-error" : undefined}
                    placeholder="e.g. Alex Vance"
                    className={`w-full px-4 py-3 rounded-lg bg-[#0b0d11] text-sm text-[#f1f3f7] font-mono outline-none border transition-colors ${
                      focusedInput === "name"
                        ? "border-[#ff6b35]"
                        : "border-[#222735] hover:border-[#334155]"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono text-[#9ba3af] uppercase tracking-wider mb-2"
                  >
                    Email Address <span className="text-[#ff6b35]" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={150}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    aria-required="true"
                    aria-invalid={status === "error" && !formData.email.trim()}
                    aria-describedby={status === "error" ? "contact-form-error" : undefined}
                    placeholder="alex@company.com"
                    className={`w-full px-4 py-3 rounded-lg bg-[#0b0d11] text-sm text-[#f1f3f7] font-mono outline-none border transition-colors ${
                      focusedInput === "email"
                        ? "border-[#ff6b35]"
                        : "border-[#222735] hover:border-[#334155]"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-[#9ba3af] uppercase tracking-wider mb-2"
                  >
                    Project or Inquiry Overview <span className="text-[#ff6b35]" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    maxLength={2000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedInput("message")}
                    onBlur={() => setFocusedInput(null)}
                    aria-required="true"
                    aria-invalid={status === "error" && !formData.message.trim()}
                    aria-describedby={status === "error" ? "contact-form-error" : undefined}
                    placeholder="Tell me about your project scope, timeline, or engineering inquiry..."
                    className={`w-full px-4 py-3 rounded-lg bg-[#0b0d11] text-sm text-[#f1f3f7] font-mono outline-none border resize-none transition-colors ${
                      focusedInput === "message"
                        ? "border-[#ff6b35]"
                        : "border-[#222735] hover:border-[#334155]"
                    }`}
                  />
                </div>

                {status === "error" && errorMessage && (
                  <div
                    id="contact-form-error"
                    role="alert"
                    aria-live="assertive"
                    className="text-xs font-mono text-rose-400 flex items-center gap-1.5"
                  >
                    <span>&times;</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#ff6b35] text-[#0b0d11] font-mono text-xs font-bold tracking-wider uppercase hover:bg-[#ff8352] disabled:opacity-50 transition-colors focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none min-h-[44px]"
                >
                  {status === "submitting" ? (
                    <span>PREPARING MESSAGE...</span>
                  ) : (
                    <>
                      <span>TRANSMIT MESSAGE</span>
                      <Send size={14} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
