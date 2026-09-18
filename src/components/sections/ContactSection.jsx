import React, { useRef, useLayoutEffect } from "react";
import { Mail, ArrowUpRight, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Inline SVG icons ── */
const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const FileIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);

/* ── Contact cards data ── */
const CONTACT_CARDS = [
  {
    label: "EMAIL",
    value: "suriya.fsd@gmail.com",
    href: "mailto:suriya.fsd@gmail.com",
    Icon: Mail,
  },
  {
    label: "GITHUB",
    value: "github.com/suriya-k7",
    href: "https://github.com/suriya-k7",
    Icon: GithubIcon,
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/suriya-kesavamurthy",
    href: "https://linkedin.com/in/suriya-kesavamurthy-50616825a",
    Icon: LinkedinIcon,
  },
  {
    label: "RESUME",
    value: "resume.pdf",
    href: "https://drive.google.com/file/d/1RbkzozwdsiAFiN6AWIyfhKuINtBAFA53/view?usp=sharing",
    Icon: FileIcon,
  },
];

const ContactSection = () => {
  const rootRef = useRef(null);
  const formRef = useRef();
  const SERVICE = import.meta.env.VITE_SERVICE;
  const TEMPLETE = import.meta.env.VITE_TEMPLETE;
  const PUBLIC = import.meta.env.VITE_PUBLIC;

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-card-item",
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const validate = Yup.object({
    from_name: Yup.string().min(3).max(50).required("Name is required"),
    from_email: Yup.string().email("Invalid email").required("Email is required"),
    from_subject: Yup.string().min(6).max(80).required("Subject is required"),
    message: Yup.string().min(10).max(500).required("Message is required"),
  });

  const sendEmail = () => {
    emailjs.sendForm(SERVICE, TEMPLETE, formRef.current, PUBLIC).then(
      () => toast.success("Message sent! I'll get back to you soon."),
      () => toast.error("Server error — please try again later."),
    );
  };

  return (
    <section ref={rootRef} id="contact" className="section-container py-20 sm:py-28">
      {/* Section header */}
      <div className="section-header">
        <span><span className="section-number">§</span> 07 · CONNECT</span>
        <span className="section-path">./connect</span>
      </div>

      <h2 className="heading-mono text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground mb-10 leading-[1.15]">
        Let's build something.
      </h2>

      {/* ── 2×2 Contact cards grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {CONTACT_CARDS.map(({ label, value, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="contact-card contact-card-item"
          >
            <div className="contact-card__icon">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground mb-0.5">
                {label}
              </p>
              <p className="text-sm font-mono font-medium text-foreground truncate">
                {value}
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 shrink-0 group-hover:text-foreground transition-colors" aria-hidden="true" />
          </a>
        ))}
      </div>

      {/* ── Contact form ── */}
      <div className="terminal-card">
        <p className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground mb-1">
          DROP A MESSAGE
        </p>
        <p className="text-xs font-mono text-muted-foreground/60 mb-6">
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
                  <label htmlFor="from_name" className="sr-only">Your Name</label>
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
                  />
                  {touched.from_name && errors.from_name && (
                    <p className="text-[11px] text-destructive font-mono">{errors.from_name}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="from_email" className="sr-only">Your Email</label>
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
                  />
                  {touched.from_email && errors.from_email && (
                    <p className="text-[11px] text-destructive font-mono">{errors.from_email}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="from_subject" className="sr-only">Subject</label>
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
                  <p className="text-[11px] text-destructive font-mono">{errors.from_subject}</p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="sr-only">Message</label>
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
                  <p className="text-[11px] text-destructive font-mono">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="
                  group inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2
                  rounded-xl bg-foreground px-8 text-sm font-mono font-medium text-background
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
