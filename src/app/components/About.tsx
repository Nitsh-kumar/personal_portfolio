"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-12 to 12 degrees max)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="bg-[#070b14] overflow-hidden"
      style={{ padding: "120px 0" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Image Placeholder */}
          <div 
            className="flex justify-center transition-all duration-800 ease-out"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out"
            }}
          >
            <div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative flex items-center justify-center transition-transform duration-200 ease-out overflow-hidden"
              style={{
                width: "300px",
                height: "300px",
                backgroundColor: "#0a1628",
                border: "1px solid rgba(0, 212, 255, 0.27)", // #00d4ff44
                borderRadius: "12px",
                transformStyle: "preserve-3d"
              }}
            >
              <Image 
                src="/Nit profile.jfif" 
                alt="Nitish Profile" 
                fill 
                className="object-cover" 
                style={{ transform: "translateZ(10px)" }}
              />
            </div>
          </div>

          {/* RIGHT: Content */}
          <div 
            className="flex flex-col gap-6 transition-all duration-800 ease-out"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease-out 150ms, transform 0.8s ease-out 150ms"
            }}
          >
            <div>
              <p 
                className="font-['Space_Mono'] text-[11px] text-[#00d4ff] uppercase font-bold"
                style={{ letterSpacing: "4px" }}
              >
                ABOUT ME
              </p>
              <h2 className="font-['Syne'] text-[42px] text-[#e8f4ff] font-bold mt-2 leading-tight">
                AI Engineer & Builder
              </h2>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              I'm an AI Engineer specializing in building robust LLM systems and advanced RAG pipelines. 
              My passion lies in bridging the gap between cutting-edge AI research and practical, 
              scalable applications that solve real-world problems.
            </p>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {[
                { title: "3+", subtitle: "Years" },
                { title: "15+", subtitle: "Projects" },
                { title: "5", subtitle: "AI Models" },
                { title: "2", subtitle: "Publications" }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-[0_0_20px_#00d4ff22]"
                  style={{
                    backgroundColor: "#0a1628",
                    borderTop: "2px solid #00d4ff",
                    borderRadius: "8px",
                    padding: "16px"
                  }}
                >
                  <p className="font-['Syne'] text-2xl font-bold text-[#e8f4ff] mb-1">
                    {stat.title}
                  </p>
                  <p className="text-[#00d4ff] text-xs font-['Space_Mono'] uppercase">
                    {stat.subtitle}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
