import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

export default function Home() {
  const Divider = () => (
    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff22] to-transparent" />
  );

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Projects />
      <Divider />
      <Skills />
      <Divider />
      <Contact />
    </main>
  );
}
