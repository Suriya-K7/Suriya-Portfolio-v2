import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, ArrowRight, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Inline SVG icons ── */
const LinkedinIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const GithubIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/* ── Accessible form field ── */
const Field = ({ name, label, type = "text", placeholder }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={name} className="sr-only">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        rows={4}
        className="contact-input resize-none"
        aria-label={label}
      />
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="contact-input"
        aria-label={label}
      />
    )}
  </div>
);

/* ══════════════════════════════════════
   CONTACT SECTION (shared on all pages)
══════════════════════════════════════ */
const ContactSection = () => {
  const rootRef = useRef(null);
  const formRef = useRef();
  const SERVICE = import.meta.env.VITE_SERVICE;
  const TEMPLETE = import.meta.env.VITE_TEMPLETE;
  const PUBLIC = import.meta.env.VITE_PUBLIC;

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const validate = Yup.object({
    from_name: Yup.string().min(3).max(50).required("Name is required"),
    from_email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    from_subject: Yup.string().min(6).max(80).required("Subject is required"),
    message: Yup.string().min(10).max(500).required("Message is required"),
  });

  const sendEmail = () => {
    emailjs.sendForm(SERVICE, TEMPLETE, formRef.current, PUBLIC).then(
      () => toast.success("Message sent! I'll get back to you soon."),
      () => toast.error("Server error — please try again later."),
    );
  };

  const year = new Date().getFullYear();

  return (
    <section
      ref={rootRef}
      id="contact"
      className="mx-auto my-16 w-full max-w-6xl px-5 sm:px-8 lg:px-10"
      aria-labelledby="contact-heading"
    >
      {/* ── Main two-panel block ── */}
      <div
        className="relative w-full overflow-hidden rounded-3xl p-1.5 shadow-sm border border-foreground/8"
        style={{ background: "hsl(var(--background))" }}
      >
        <div
          className="relative w-full overflow-hidden rounded-[1.4rem] p-6 sm:p-8 md:p-10"
          style={{ background: "var(--accent-panel-bg)" }}
        >
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6">
            {/* ── Left: heading + CTAs ── */}
            <div className="flex flex-col gap-5">
              <p className="label-eyebrow text-white/70">Say Hello</p>
              <h2
                id="contact-heading"
                className="text-3xl sm:text-[2.5rem] lg:text-[3rem] font-semibold leading-[1.05] tracking-tight text-white"
              >
                Get In Touch
              </h2>
              <p className="max-w-[30ch] text-base sm:text-lg leading-[1.4] tracking-tight text-white/70">
                I'm open to new projects, creative ideas, and collaboration
                opportunities. Let's build something great together.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:suriya.fsd@gmail.com"
                  className="
                    inline-flex h-11 items-center gap-2 rounded-xl
                    bg-white px-5 text-sm font-medium text-black
                    transition-all duration-200 hover:opacity-85
                    focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
                  "
                  aria-label="Email Suriya"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Contact
                </a>
                <Link
                  to="/projects"
                  className="
                    group inline-flex h-11 items-center gap-2 rounded-xl
                    border border-white/20 bg-white/10 px-5 text-sm font-medium text-white
                    transition-all duration-200 hover:bg-white/20
                    focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
                  "
                >
                  See projects
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            {/* ── Right: inset white card ── */}
            <div className="flex flex-col items-center justify-center gap-6 rounded-[1.1rem] border border-foreground/8 bg-background p-6 sm:p-8">
              {/* Social icon row */}
              <div className="flex items-center gap-3 opacity-80">
                {[
                  {
                    href: "mailto:suriya.fsd@gmail.com",
                    Icon: Mail,
                    label: "Email",
                  },
                  { href: "tel:+917639718893", Icon: Phone, label: "Phone" },
                  {
                    href: "https://linkedin.com/in/suriya-kesavamurthy-50616825a",
                    Icon: LinkedinIcon,
                    label: "LinkedIn",
                  },
                  {
                    href: "https://github.com/suriya-k7",
                    Icon: GithubIcon,
                    label: "GitHub",
                  },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={label}
                    className="
                      inline-flex h-11 w-11 items-center justify-center rounded-xl
                      border border-border bg-background text-foreground/60
                      transition-colors hover:border-foreground/20 hover:text-foreground
                      focus-visible:outline-2 focus-visible:outline-foreground/40 focus-visible:outline-offset-2
                    "
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
              {/* Credit + copyright */}
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-[13px] tracking-tight text-foreground/60">
                  {year} ©
                </p>
                <p className="text-[12px] tracking-tight text-foreground/40">
                  By Suriya Kesavamurthy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contact form (below the two-panel) ── */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="label-eyebrow mb-2">Drop a message</p>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          Fill out the form and I'll get back to you as soon as possible.
        </p>

        <Formik
          initialValues={{
            from_name: "",
            from_email: "",
            from_subject: "",
            message: "",
          }}
          validationSchema={validate}
          onSubmit={(_, { resetForm }) => {
            sendEmail();
            resetForm();
          }}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <Form ref={formRef} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="from_name" className="sr-only">
                    Your Name
                  </label>
                  <input
                    id="from_name"
                    name="from_name"
                    type="text"
                    placeholder="Your Name"
                    className="contact-input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.from_name}
                    aria-invalid={touched.from_name && !!errors.from_name}
                    aria-describedby={
                      errors.from_name ? "name-error" : undefined
                    }
                  />
                  {touched.from_name && errors.from_name && (
                    <p id="name-error" className="text-[11px] text-destructive">
                      {errors.from_name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="from_email" className="sr-only">
                    Your Email
                  </label>
                  <input
                    id="from_email"
                    name="from_email"
                    type="email"
                    placeholder="Your Email"
                    className="contact-input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.from_email}
                    aria-invalid={touched.from_email && !!errors.from_email}
                    aria-describedby={
                      errors.from_email ? "email-error" : undefined
                    }
                  />
                  {touched.from_email && errors.from_email && (
                    <p
                      id="email-error"
                      className="text-[11px] text-destructive"
                    >
                      {errors.from_email}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="from_subject" className="sr-only">
                  Subject
                </label>
                <input
                  id="from_subject"
                  name="from_subject"
                  type="text"
                  placeholder="Subject"
                  className="contact-input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.from_subject}
                  aria-invalid={touched.from_subject && !!errors.from_subject}
                />
                {touched.from_subject && errors.from_subject && (
                  <p className="text-[11px] text-destructive">
                    {errors.from_subject}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message…"
                  rows={4}
                  className="contact-input resize-none"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  aria-invalid={touched.message && !!errors.message}
                />
                {touched.message && errors.message && (
                  <p className="text-[11px] text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="
                  group inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2
                  rounded-xl bg-foreground px-8 text-sm font-medium text-background
                  transition-all duration-200 hover:opacity-85
                  focus-visible:outline-2 focus-visible:outline-foreground/50 focus-visible:outline-offset-2
                "
              >
                Send Message
                <Send
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ContactSection;
