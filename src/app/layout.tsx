import type { Metadata, Viewport } from "next";
import { Syne, Space_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0b0d11",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gptcraft.in"),
  title: "Nitish Kumar | Software Engineer & Generative AI Developer",
  description:
    "Software Engineer at Sopra Steria and Generative AI Developer building enterprise LLM systems, custom Model Context Protocol (MCP) servers, and hybrid RAG pipelines.",
  keywords: [
    "Nitish Kumar",
    "Generative AI Developer",
    "Sopra Steria",
    "Software Engineer",
    "Model Context Protocol",
    "MCP Servers",
    "LangChain",
    "FastAPI",
    "Next.js",
    "Python AI",
    "GPTCraft",
  ],
  authors: [{ name: "Nitish Kumar", url: "https://github.com/Nitsh-kumar" }],
  creator: "Nitish Kumar",
  icons: {
    icon: "/logo-white-transparent.png",
    apple: "/logo-white-transparent.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/Nitsh-kumar",
    title: "Nitish Kumar | Software Engineer & Generative AI Developer",
    description:
      "Software Engineer at Sopra Steria building production-grade LLM systems, Model Context Protocol (MCP) servers, and intelligent agent workflows.",
    siteName: "Nitish Kumar Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Nitish Kumar - N Monogram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitish Kumar | Software Engineer & Generative AI Developer",
    description:
      "Software Engineer at Sopra Steria building production-grade LLM systems, MCP servers, and intelligent agents.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${spaceMono.variable} antialiased bg-[#0b0d11] text-[#f1f3f7] selection:bg-[#ff6b35]/25 selection:text-white`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-[#ff6b35] focus:text-[#0b0d11] focus:font-mono focus:text-xs focus:font-bold focus:outline-none shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
