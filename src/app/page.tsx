import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import ArchitectureDiagram from "./components/ArchitectureDiagram";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";

function Divider() {
  return (
    <div className="h-[1px] w-full bg-[#222735]" />
  );
}

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#0b0d11] text-[#f1f3f7] selection:bg-[#ff6b35]/25 selection:text-white focus:outline-none"
    >
      <Navbar />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Experience />
      <Divider />
      <Projects />
      <Divider />
      <ArchitectureDiagram />
      <Divider />
      <Skills />
      <Divider />
      <Contact />
      <Footer />
      <AIAssistant />
    </main>
  );
}
