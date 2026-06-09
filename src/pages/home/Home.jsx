import React, { useEffect, useRef, Suspense, lazy } from "react";
import Profile from "@/assets/Pic.png";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypewriter } from "react-simple-typewriter";
import gsap from "gsap";

const HeroScene = lazy(() => import("@/components/HeroScene"));

const Home = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const roleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const imgRef = useRef(null);

  const [text] = useTypewriter({
    words: ["Full Stack Developer", "Professional Coder", "UI Designer"],
    loop: true,
    typeSpeed: 90,
    deleteSpeed: 40,
    delaySpeed: 1500,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states for clean page-load transition (no flash)
      gsap.set([titleRef.current, roleRef.current, descRef.current, btnRef.current], {
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
      });
      gsap.set(imgRef.current, {
        opacity: 0,
        scale: 0.85,
        filter: "blur(12px)",
      });

      // Animate content elements
      gsap.to([titleRef.current, roleRef.current, descRef.current, btnRef.current], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.12,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.3,
      });

      // Animate image container
      gsap.to(imgRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.6,
        ease: "power3.out",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center py-24 lg:py-0 overflow-hidden bg-[#050505] text-white"
      id="home"
    >
      {/* Three.js 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}>
        <HeroScene />
      </Suspense>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Profile Image Column */}
        <div className="lg:col-span-4 flex justify-center order-1 lg:order-1">
          <div
            ref={imgRef}
            className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:h-auto aspect-square max-w-[380px] rounded-3xl overflow-hidden group border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_0_50px_rgba(99,102,241,0.15)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(99,102,241,0.3)] hover:border-primary/50"
          >
            {/* Ambient Background Glow inside the card */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            
            <img
              src={Profile}
              alt="Udhayasoorian"
              className="w-full h-full object-cover object-center scale-95 group-hover:scale-100 transition-transform duration-700 ease-out"
              loading="eager"
            />
          </div>
        </div>

        {/* Text Content Column */}
        <div className="lg:col-span-8 space-y-6 text-left order-2 lg:order-2 flex flex-col justify-center">
          <div ref={roleRef} className="flex items-center gap-2 text-primary font-mono text-xs md:text-sm uppercase tracking-[0.25em]">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>{text}</span>
          </div>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-white font-sans"
          >
            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">Udhayasoorian</span>
          </h1>

          <p
            ref={descRef}
            className="text-white/70 max-w-xl text-base md:text-lg leading-relaxed text-justify font-sans"
          >
            MERN Stack Developer with 2.7 years of hands-on experience in
            designing and developing scalable, high-performance web
            applications. Proficient in React.js, Node.js, Next.js, and MongoDB,
            with strong expertise in TypeScript, Tailwind CSS, and ShadCN UI.
            Adept at creating clean, responsive user interfaces and optimizing
            application performance. Skilled in building RESTful APIs,
            implementing CI/CD pipelines, and collaborating in Agile,
            cross-functional team environments. Committed to writing
            maintainable code and delivering efficient software solutions.
          </p>

          <div ref={btnRef} className="pt-4">
            <a href="#about" className="inline-block">
              <Button
                size="lg"
                className="group rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans px-8 py-6 text-base relative overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(99,102,241,0.45)] cursor-pointer"
              >
                More About Me
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative vertical gradient borders or badges */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-50 hover:opacity-100 transition-opacity duration-300 animate-bounce">
        <span className="text-xs tracking-widest uppercase font-mono text-white/40">Scroll Down</span>
        <div className="w-1 h-8 rounded-full bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default Home;
