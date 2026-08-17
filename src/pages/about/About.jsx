import React, { useRef, useLayoutEffect } from "react";
import Info from "@/components/Info";
import Stats from "@/components/Stats";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Skills from "@/components/Skills";
import { resume } from "@/data";
import ResumeItem from "@/components/ResumeItem";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Feature icon card ─── */
const FeatureCard = ({ icon, title, desc }) => (
  <div className="feature-card flex items-start gap-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 hover:border-primary/30 hover:bg-card/70 transition-all duration-300 group">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary text-xl group-hover:bg-primary/20 transition-colors duration-300">
      {icon}
    </div>
    <div>
      <p className="text-sm font-bold text-foreground mb-1">{title}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  </div>
);

/* ─── Section label with line ─── */
const SectionLabel = ({ text }) => (
  <p className="label-eyebrow mb-4">{text}</p>
);

/* ─── Large section heading ─── */
const SectionHeading = ({ children }) => (
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-8 sm:mb-12">
    {children}
  </h2>
);

/* ─── Sparkle divider ─── */
const Divider = () => (
  <div className="relative flex items-center justify-center my-20 sm:my-28">
    <div className="absolute inset-x-0 top-1/2 -translate-y-px h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    <span className="relative z-10 bg-background px-4 text-primary text-sm">❖</span>
  </div>
);

/* ─── GSAP reveal hook ─── */
function useReveal(containerRef) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = (selector, from, extra = {}) =>
        gsap.fromTo(
          selector,
          from,
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: selector, start: "top 85%", once: true },
            ...extra,
          },
        );

      trigger(".about-label", { opacity: 0, x: -20 });
      trigger(".about-heading", { opacity: 0, y: 24 }, { delay: 0.05 });
      trigger(".about-profile-card", { opacity: 0, y: 28, scale: 0.97 }, { duration: 0.8 });
      trigger(".feature-card", { opacity: 0, y: 24 }, { stagger: 0.1, duration: 0.6 });

      gsap.fromTo(
        ".info-row",
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.5, ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".info-list", start: "top 85%", once: true },
        },
      );

      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 24, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)",
          stagger: 0.1,
          scrollTrigger: { trigger: ".stats-col", start: "top 85%", once: true },
        },
      );

      gsap.fromTo(
        ".journey-exp .journey-item",
        { opacity: 0, x: -28 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.09,
          scrollTrigger: { trigger: ".journey-grid", start: "top 82%", once: true },
        },
      );
      gsap.fromTo(
        ".journey-edu .journey-item",
        { opacity: 0, x: 28 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.09, delay: 0.12,
          scrollTrigger: { trigger: ".journey-grid", start: "top 82%", once: true },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [containerRef]);
}

/* ═══════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════ */
const About = () => {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const features = [
    {
      icon: "</>",
      title: "Clean implementation",
      desc: "Readable UI flows, structured API design, and maintainable feature delivery.",
    },
    {
      icon: "⚙️",
      title: "Backend confidence",
      desc: "Node.js, MongoDB, REST APIs, JWT auth, and production-minded backend patterns.",
    },
    {
      icon: "🚀",
      title: "Delivery ready",
      desc: "Git, CI/CD, deployment awareness, Agile workflows, and practical debugging habits.",
    },
    {
      icon: "🎨",
      title: "UI/UX focused",
      desc: "TailwindCSS, ShadCN, MUI, responsive design, and accessible component patterns.",
    },
  ];

  return (
    <section ref={rootRef} id="about" className="section-pad">

      {/* ════════ ABOUT ME ════════ */}
      <section className="section-container">
        <SectionLabel text="About" />
        <SectionHeading>
          Full-stack engineer{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-300">
            with product focus
          </span>
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">

          {/* ── Profile snapshot card ── */}
          <div className="about-profile-card rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
              Profile Snapshot
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-5 leading-tight">
              Building clean web products{" "}
              <span className="text-muted-foreground font-semibold">from UI to backend.</span>
            </h3>
            <div className="prose-body space-y-3 mb-8">
              <p>
                I'm Suriya Kesavamurthy, a full-stack developer with 2.7 years of experience
                in MERN, Next.js, TypeScript, and modern frontend tooling. I build readable
                user interfaces, reliable backends, and delivery-ready features with a strong
                focus on clean implementation.
              </p>
              <p>
                Currently a Frontend Engineer at Stratforge, shaping my profile around
                full-stack development, scalable systems, and senior-level software engineering.
              </p>
            </div>

            {/* Personal info list */}
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-3">
              Personal Info
              <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            </h4>
            <ul className="info-list rounded-xl border border-border/40 overflow-hidden divide-y divide-border/30 mb-6">
              <Info />
            </ul>

            <div className="flex flex-wrap items-center gap-4">
              <div className="stats-col flex gap-3">
                <Stats />
              </div>
            </div>

            <a
              href="https://drive.google.com/file/d/1RbkzozwdsiAFiN6AWIyfhKuINtBAFA53/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6"
            >
              <Button
                size="lg"
                className="group gap-2 rounded-full px-8 cursor-pointer
                  shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30
                  transition-all duration-300"
              >
                Download CV
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </Button>
            </a>
          </div>

          {/* ── Feature cards ── */}
          <div className="grid grid-cols-1 gap-3">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ════════ SKILLS ════════ */}
      <section id="skills" className="section-container">
        <SectionLabel text="Skills" />
        <SectionHeading>Technical skills</SectionHeading>
        <div className="skills-grid w-full">
          <Skills />
        </div>
      </section>

      <Divider />

      {/* ════════ JOURNEY ════════ */}
      <section id="journey" className="section-container">
        <SectionLabel text="My Timeline" />
        <SectionHeading>
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-300">
            Journey
          </span>
        </SectionHeading>
        <p className="prose-body mb-10 max-w-xl">
          A chronological view of my professional career and academic background.
        </p>

        <div className="journey-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Experience */}
          <div className="journey-exp">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
              Experience
              <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            </h3>
            {resume
              .filter((v) => v.category === "experience")
              .map((val) => (
                <ResumeItem key={val.id} {...val} />
              ))}
          </div>

          {/* Education */}
          <div className="journey-edu">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
              Education
              <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            </h3>
            {resume
              .filter((v) => v.category === "education")
              .map((val) => (
                <ResumeItem key={val.id} {...val} />
              ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
