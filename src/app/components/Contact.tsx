"use client";

import { useState } from "react";
import { Github, Linkedin, MessageCircle } from "lucide-react";

export default function Contact() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleFocus = (name: string) => {
    setFocusedInput(name);
    // Remove focus class after animation duration (150ms) to allow re-triggering if needed later
    setTimeout(() => {
      if (document.activeElement?.getAttribute("name") !== name) {
        setFocusedInput(null);
      }
    }, 150);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    // Handle submission logic here
  };

  const inputStyles = {
    backgroundColor: "#0a1628",
    color: "#e8f4ff",
    fontFamily: "var(--font-space-mono)",
    fontSize: "13px",
    borderRadius: "8px",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
  };

  const getDynamicStyles = (name: string) => {
    const isFocused = focusedInput === name;
    return {
      ...inputStyles,
      border: isFocused ? "1px solid #00d4ff" : "1px solid #00d4ff22",
      boxShadow: isFocused ? "0 0 12px #00d4ff22" : "none",
      animation: isFocused ? "flicker 0.15s ease-in-out" : "none",
    };
  };

  const socials = [
    { 
      icon: <Github size={20} />, 
      title: "GitHub", 
      href: "https://github.com/Nitsh-kumar" 
    },
    { 
      icon: <Linkedin size={20} />, 
      title: "LinkedIn", 
      href: "https://www.linkedin.com/in/nitish2314/" 
    },
    { 
      icon: <MessageCircle size={20} />, 
      title: "WhatsApp", 
      href: "https://wa.me/+918006569463" 
    },
  ];

  return (
    <section 
      id="contact" 
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#05080f", // Darker background to contrast with form elements if desired, or #070b14 matching previous
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <div className="text-center mb-16">
          <p 
            className="text-[#00d4ff] tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            GET IN TOUCH
          </p>
          <h2 
            className="text-white font-bold"
            style={{ fontFamily: "var(--font-syne)", fontSize: "44px" }}
          >
            Let's Collaborate.
          </h2>
        </div>

        {/* Note: The user requested "use div with onClick handlers" instead of form tag */}
        <div className="w-full flex flex-col gap-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              style={getDynamicStyles("name")}
              onFocus={() => handleFocus("name")}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              style={getDynamicStyles("email")}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              style={{ ...getDynamicStyles("message"), resize: "vertical" }}
              onFocus={() => handleFocus("message")}
              onBlur={handleBlur}
            />
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full transition-all duration-300"
            style={{
              backgroundColor: "#00d4ff",
              color: "#05080f",
              fontFamily: "var(--font-syne)",
              fontSize: "15px",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "14px",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#00aacc";
              e.currentTarget.style.boxShadow = "0 0 24px #00d4ff66";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#00d4ff";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Send Message &rarr;
          </button>
        </div>

        <div className="flex gap-4 mt-12 justify-center">
          {socials.map((social) => (
            <a
              key={social.title}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.title}
              className="flex items-center justify-center transition-all duration-300"
              style={{
                width: "44px",
                height: "44px",
                border: "1px solid #00d4ff22",
                borderRadius: "10px",
                backgroundColor: "transparent",
                color: "#e8f4ff",
                cursor: "pointer",
                textDecoration: "none"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00d4ff";
                e.currentTarget.style.boxShadow = "0 0 15px #00d4ff33";
                e.currentTarget.style.color = "#00d4ff";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#00d4ff22";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.color = "#e8f4ff";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
